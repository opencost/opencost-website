---
sidebar_position: 2
---
# API

The OpenCost API provides real-time and historical reporting of Kubernetes cloud costs based on on-demand list pricing as well as the cloud costs retrieved from cloud providers through their cost and usage reports.

:::note
Throughout our API documentation, we use `localhost:9003` as the default OpenCost API URL, but your OpenCost instance may be exposed by a service or ingress. To reach the OpenCost API at port 9003, run: `kubectl -n opencost port-forward deployment/opencost 9003`. You may also expose the OpenCost UI on port 9090 with the command `kubectl -n opencost port-forward deployment/opencost 9003 9090`.
:::

Examples using the API endpoints are provided in the [API Examples](api-examples) page.

## Allocation API

The standard OpenCost API query for costs and resources allocated to Kubernetes workloads based on on-demand list pricing. You may specify the `window` date range, the Kubernetes primitive(s) to `aggregate` on, the `step` for the duration of returned sets, and the `resolution` for the duration to use for Prometheus queries.

### `/allocation/compute`
QUERY PARAMETERS
<table>
<tr>
<th id="window">window<a class="hash-link" href="#window" title="window">​</a></th>
<th align="left">string</th>
</tr>
<tr>
<td valign="top"><b>required</b></td>
<td>
Duration of time over which to query. Accepts: words like <code>today</code>, <code>week</code>, <code>month</code>, <code>yesterday</code>, <code>lastweek</code>, <code>lastmonth</code>; durations like <code>30m</code>, <code>12h</code>, <code>7d</code>; <a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC3339</a> date pairs like <code>2021-01-02T15:04:05Z,2021-02-02T15:04:05Z</code>; <a href="https://www.unixtimestamp.com/">Unix timestamps</a> like <code>1578002645,1580681045</code>.
<br/><br/>
Examples:<br/>
<ul>
<li><code>window=today</code> - The current day</li>
<li><code>window=month</code> - The month-to-date</li>
<li><code>window=lastweek</code> - The previous week</li>
<li><code>window=30m</code> - The last 30 minutes</li>
<li><code>window=12h</code> - The last 12 hours</li>
<li><code>window=7d</code> - The previous 7 days</li>
<li><code>window=2023-01-18T10:30:00Z,2023-01-19T10:30:00Z</code> - <a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC3339</a> date/time range</li>
<li><code>window=1674073869,1674193869</code> - <a href="https://www.unixtimestamp.com/">Unix timestamp</a> range</li>
</ul>
</td>
</tr>
<tr>
<th id="aggregate">aggregate<a class="hash-link" href="#aggregate" title="aggregate">​</a></th>
<th align="left">string</th>
</tr>
<tr>
<td/>
<td>
Field by which to aggregate the results. Accepts: <code>cluster</code>, <code>node</code>, <code>namespace</code>, <code>controllerKind</code>, <code>controller</code>, <code>service</code>, <code>pod</code>, <code>container</code>, <code>label:name</code>, and <code>annotation:name</code>. Also accepts comma-separated lists for multi-aggregation, like <code>namespace,label:app</code>.
<br/><br/>
Examples:<br/>
<ul>
<li><code>aggregate=cluster</code> - Aggregates by the cluster.</li>
<li><code>aggregate=node</code> - Aggregates by the compute nodes in the cluster.</li>
<li><code>aggregate=namespace</code> - Aggregates by the namespaces in the cluster.</li>
<li><code>aggregate=controllerKind</code> - Aggregates by the kinds of controllers present in the cluster.</li>
<li><code>aggregate=controller</code> - Aggregates by the individual controllers within the cluster.</li>
<li><code>aggregate=service</code> - Aggregates by the services within the cluster.</li>
<li><code>aggregate=pod</code> - Aggregates by the individual pods within the cluster.</li>
<li><code>aggregate=container</code> - Aggregates by the containers present in the cluster.</li>
</ul>
</td>
</tr>
<tr>
<th id="step">step<a class="hash-link" href="#step" title="step">​</a></th>
<th align="left">string</th>
</tr>
<tr>
<td/>
<td>
Duration of a single allocation set. If unspecified, this defaults to the window, so that you receive exactly one set for the entire window. If specified, it works chronologically backward, querying in durations of step until the full window is covered. Default is <code>window</code>.
<br/><br/>
Examples:<br/>
<ul>
<li><code>step=30m</code> - 30 minute steps over the duration of the window.</li>
<li><code>step=2h</code> - 2 hour steps over the duration of the window</li>
<li><code>step=1d</code> - Daily steps over the duration of the window (ie. <code>lastweek</code> or <code>month</code></li>
</ul>
</td>
</tr>
<tr>
<th id="resolution">resolution<a class="hash-link" href="#resolution" title="resolution">​</a></th>
<th align="left">string</th>
</tr>
<tr>
<td/>
<td>
Duration to use as resolution in Prometheus queries. Smaller values (i.e. higher resolutions) will provide better accuracy, but worse performance (i.e. slower query time, higher memory use). Larger values (i.e. lower resolutions) will perform better, but at the expense of lower accuracy for short-running workloads. Default is <code>1m</code>.
<br/><br/>
Examples:<br/>
<ul>
<li><code>resolution=1m</code> - Highly accurate, slower query.</li>
<li><code>resolution=30m</code> - Less accurate, faster query. Not recommended for short-lived workloads.</li>
</ul>
</td>
</tr>
</table>

## Cloud Costs API

The Cloud Costs API retrieves cloud cost data from cloud providers by reading cost and usage reports. You will need additional [configuration](../configuration/) for supporting the billing integration with your cloud provider.

### `/cloudCost`

Endpoints

GET /cloudCost
Params:
window
aggregate
accumulate
filter
Return:

{
window: Window
sets: []CloudCostSet
}

GET /cloudCost/view/graph
Params:
window
aggregate
accumulate
filter
costMetric
Return:

[]{
start: Time
end: Time
items: []{
	name: string
	value: float
}
}



GET /cloudCost/view/totals
Params:
window
aggregate
accumulate
filter
costMetric
Return:

{
numResults: int // total number of results
combined: {
	name: stirng
	kubernetesPercent: float
	cost: float
}



GET /cloudCost/view/table
Params:
window
aggregate
accumulate
filter
costMetric
limit
offset
sortBy
sortByOrder
Return:

[]{
name: stirng
kubernetesPercent: float
cost: float
}



Param Descriptions

Param
Description
Default
Valid Values
window
Standard window
No default, field is required


aggregate
Comma separated list of values to aggregate on
"invoiceEntityID,
accountID,
proider,
providerID,
category”
"invoiceEntityID"
"accountID"
"proider"
"providerID"
"category"
“label:<LABEL_NAME>”
accumulate
accumulate step size
“day”
“”
“all”
“hour”
“day”
“week”
“month”
“quarter”
filter
V2 filter param


"invoiceEntityID"
"accountID"
"proider"
"providerID"
"category"
“label:<LABEL_NAME>”
costMetric
Cost metric which will be used as cost and kubernetes % in view api
“AmortizedCost”
“ListCost”
“NetCost”
“AmortizedNetCost”
“InvoicedCost”
“AmortizedCost”
limit
Number of results to be returned
0


offset
Number of results skipped before return (page * numPerPage)
0


sortBy
the value to be ordered
“cost”
“cost”
“name”
“kubernetesPercent”
sortByOrder
ordering of result by cost
“desc”
“desc”
“asc”






## OpenAPI Swagger

The source for the OpenCost API is available as an OpenAPI [swagger.json](https://github.com/opencost/opencost/blob/develop/docs/swagger.json).
The OpenCost API is available under the [Apache 2.0 License](https://github.com/opencost/opencost/blob/develop/LICENSE).

## Theoretical error bounds

Tuning the resolution parameter allows the querier to make tradeoffs between accuracy and performance. For long-running pods (>1d) resolution can be tuned aggressively low (>10m) with relatively little effect on accuracy. However, even modestly low resolutions (5m) can result in significant accuracy degradation for short-running pods (<1h).

Here, we provide theoretical error bounds for different resolution values given pods of differing running durations. The tuple represents lower- and upper-bounds for accuracy as a percentage of the actual value. For example:
- 1.00, 1.00 means that results should always be accurate to less than 0.5% error
- 0.83, 1.00 means that results should never be high by more than 0.5% error, but could be low by as much as 17% error
- -1.00, 10.00 means that the result could be as high as 1000% error (e.g. 30s pod being counted for 5m) or the pod could be missed altogether, i.e. -100% error.

| resolution | 30s pod | 5m pod | 1h pod | 1d pod | 7d pod |
|--:|:-:|:-:|:-:|:-:|:-:|
| 1m | -1.00, 2.00 |  0.80, 1.00 |  0.98, 1.00 | 1.00, 1.00 | 1.00, 1.00 |
| 2m | -1.00, 4.00 |  0.80, 1.20 |  0.97, 1.00 | 1.00, 1.00 | 1.00, 1.00 |
| 5m | -1.00, 10.00 | -1.00, 1.00 |  0.92, 1.00 | 1.00, 1.00 | 1.00, 1.00 |
| 10m | -1.00, 20.00 | -1.00, 2.00 |  0.83, 1.00 | 0.99, 1.00 | 1.00, 1.00 |
| 30m | -1.00, 60.00 | -1.00, 6.00 |  0.50, 1.00 | 0.98, 1.00 | 1.00, 1.00 |
| 60m | -1.00, 120.00 | -1.00, 12.00 | -1.00, 1.00 | 0.96, 1.00 | 0.99, 1.00 |
