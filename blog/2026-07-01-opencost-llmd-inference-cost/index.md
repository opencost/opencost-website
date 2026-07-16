---
slug: opencost-llmd-inference-cost
title: "Clueless About The Cost of AI Model Usage? OpenCost + llm-d = First of a Kind Kubernetes Inference Cost Tracking"
authors: [simanadler, ameijer]
tags: [AI, GPU, inference, llm-d, cost management, Kubernetes, FinOps]
---

Your GPU bill is rising. Your models are serving billions of tokens. And yet one question remains unanswered: what does each token actually cost?

<!--truncate-->

This is not a hypothetical problem. Platform teams today operate in a fog regarding AI inference costs — they see infrastructure spend, they track token throughput, but the connection between those numbers is invisible. Without per-model and per-token costs derived from actual resource consumption, every decision becomes a gamble.

- Is self-hosting cheaper than using a SaaS API? You're guessing.
- Which model is actually cost-efficient at your traffic levels? The data doesn't exist.
- Which team's agent workload is consuming your AI budget? Nobody knows.

The result is a large monthly bill with no story behind it, and executives asking hard questions about AI ROI that you cannot answer with numbers.

> **Cost ≠ Price:** SaaS providers may price below cost to gain market share, or well above cost on premium models. When comparing self-hosting costs to SaaS it's important to keep this in mind. Enterprise's cost for SaaS inference is the provider's price.

We are integrating [OpenCost](https://opencost.io), a CNCF incubating project, with [llm-d](https://llm-d.ai), a CNCF sandbox project for distributed LLM inference on Kubernetes, to close this gap. This post explains how the integration works, what metrics it produces, and how platform teams can use them to make real decisions.

## GPUs are just CPUs with a bigger price tag and a worse visibility story

OpenCost's existing Kubernetes cost allocation logic already knew how to handle CPU, RAM, and general GPU costs. What was missing was the inference layer: the ability to connect infrastructure costs to the token stream flowing through vLLM, and to expose that cost in terms that are meaningful for AI platform decisions.

Kubernetes resource allocation has always had an efficiency problem. Teams size CPU and memory requests based on estimates, workloads over-provision, and idle capacity accumulates silently. The difference with GPUs is that the cost of getting this wrong is an order of magnitude higher — and the measurement tooling hasn't kept up, so it is not possible to measure efficiency nor return on investment.

A GPU serving a loaded LLM is expensive. A GPU sitting idle with a model loaded but no requests arriving is equally expensive, because model weights occupy VRAM whether or not inference is happening. A low-traffic model can spend 95% of its lifetime in this "warm but idle" state, burning through your budget while contributing zero productive tokens.

## Two costs, two questions

The core insight behind the integration is that there are two fundamentally different questions a platform team needs to answer, and they require different cost metrics.

**Allocation-based cost per model** counts everything attributed to running that model: the GPU memory reserved for its weights at all times, the compute consumed during active inference, and its share of shared infrastructure components like the gateway and KV cache storage. This is the cost of having the model available. It reconciles to your infrastructure bill and answers: "what is this model costing us?"

**Usage-based cost per model** counts only the GPU and other infrastructure consumed during active inference — the tokens actually generated, minus savings from KV cache hits. This answers: "what did this model's actual work cost?" The gap between the two figures is the cost of keeping the model warm and ready, which is a deliberate business decision about latency tolerance, not a technical inefficiency.

Both metrics produce a corresponding cost per million tokens figure, but they answer different questions and should never be confused.

Usage-based cost per million tokens is stable regardless of how busy the model is. It reflects the intrinsic compute cost of inference and is the right number for comparing different models or hardware configurations against each other, or against external API pricing for the inference work itself.

Allocation-based cost per million tokens varies with utilization. A model serving light traffic will show a higher allocation-based cost per token because the fixed hosting cost — GPU reservation, model loading, infrastructure components — is spread across fewer tokens. This is the number that matters for build-vs-buy decisions.

The relationship between the two directly expresses GPU utilization without needing a separate metric:

```
Utilization = usage-based cost per million tokens / allocation-based cost per million tokens

Example:
  Usage-based:       $1.00 / million tokens  (compute only)
  Allocation-based:  $4.00 / million tokens  (full hosting cost)
  Utilization:       25%
```

## The build-vs-buy trap

The single most common cost modeling mistake in AI infrastructure is using usage-based cost to justify self-hosting.

If your model's usage-based cost is $1.00 per million tokens and the SaaS API charges $2.00, it looks like self-hosting wins. But usage-based cost captures only active compute — it ignores the GPU reservation, the idle time, the infrastructure overhead. The actual self-hosting cost at 25% utilization is $4.00 per million tokens, not $1.00.

The correct comparison is always **allocation-based cost vs. external API price**:

```
Self-hosted model at 25% utilization:
  Usage-based cost per million tokens:      $1.00  (compute only — misleading)
  Allocation-based cost per million tokens: $4.00  (real cost — use this)
  External API price per million tokens:    $2.00

Conclusion: external API is cheaper at current utilization.
Self-hosting becomes competitive above ~50% utilization.
```

This framing also gives you an optimization target: if you can increase utilization — through smarter routing, model sharing, or traffic consolidation — the allocation-based cost per token falls until self-hosting wins.

## What the integration actually measures

The integration pulls from metrics already present in an llm-d deployment: token throughput from vLLM (`vllm:prompt_tokens_total`, `vllm:generation_tokens_total`), GPU costs from OpenCost's existing allocation engine, and processing time metrics that enable differentiated input vs. output token pricing.

The result is a new set of inference cost metrics published to Prometheus and available via OpenCost's REST API and MCP server:

| Metric | What it measures |
|---|---|
| `llm_total_hourly_cost` | Hourly cost per model |
| `llm_cost_per_million_tokens` | Blended cost per 1M tokens. Includes labels breaking out input and output costs per 1M tokens |

All metrics carry labels for `model_name`, `model_version`, `namespace`, `cost_basis` (usage vs. allocation), `workload_type` (currently always "inference").

Input and output token costs (including reasoning tokens) are separated because they reflect different compute workloads. Input tokens trigger the prefill phase; output tokens drive the decode phase. In disaggregated serving deployments — where prefill and decode run on separate hardware — this distinction is load-bearing for accurate cost attribution. KV cache hits directly impact the cost of processing input tokens, which is of course taken into account in the per token metrics.

## Beyond the GPU: the full cost of a running model

A model deployed on llm-d doesn't run in isolation. A complete cost picture must include the llm-d infrastructure components that surround it:

- **Inference Scheduler (EPP):** The gateway-level routing component scoped per InferencePool. CPU-only, but a real operational cost in high-throughput deployments.
- **llm-d gateway proxy:** Sets up the gateway and may include a proxy pod, also scoped per InferencePool.
- **KV cache storage:** In tiered-cache deployments this can reach 18TB of persistent storage. The integration treats this as an allocation cost, because KV cache capacity is sized at deployment time, not in proportion to requests.
- **Workload Variant Autoscaler:** A cluster-wide component that watches all InferencePools unless namespace-scoped. Its cost is distributed across models using OpenCost's SharedLabels mechanism.

The SharedLabels approach keeps llm-d and OpenCost decoupled: llm-d components are labeled at deploy time, and OpenCost's shared cost distribution logic handles attribution without requiring OpenCost to understand llm-d's internal architecture. These shared costs are distributed across models in allocation based costs, but excluded in usage based costs.

## What good looks like: reading the cost matrix

The four combinations of allocation and usage-based costs each tell a distinct story:

| Allocation cost | Usage cost per million tokens | Diagnosis |
|---|---|---|
| High | Low | Costly to keep available, but efficient at inference — utilization is the problem. Consider model sharing or traffic consolidation. |
| High | High | Expensive to host and expensive to run. Evaluate whether this model is the right choice for the workload. |
| Low | Low | Well-sized deployment. The model fits its traffic profile. |
| Low | High | Cheap to host but the inference itself is costly. Look at model size, quantization, or hardware fit. |

A finance team running chargeback can query costs by namespace and team label, generating showback reports for billing periods. A FinOps team can surface underutilized models and quantify the savings from right-sizing or decommissioning. A smart router — which llm-d is developing — can consume the REST APIs to factor per-token cost into routing decisions alongside latency and throughput metrics.

## Where things stand

A POC was implemented and tested on a cluster with 109 GPUs and 30 deployed AI models, and the generated metrics validated.

AI Inference costs metrics and APIs have been added to OpenCost, including measurement of KV cache hits. And a guide for deploying OpenCost as part of llm-d has been created.

On the OpenCost side work continues on wasted GPU costs (improving on OpenCost's current GPU idle detection for LLM-specific patterns), integration with the OpenCost UI, workload and team attribution, and optimization savings.

On the llm-d side, capturing workload and tenant metrics and deployment with OpenCost are work in progress.

Both projects are open source and contributions are welcome.

## More Updates Soon

Stay tuned for more updates as integration progresses!
