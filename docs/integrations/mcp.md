---
title: MCP Server
sidebar_position: 9
description: OpenCost MCP (Model Context Protocol) server provides AI agents with access to cost allocation and asset data through a standardized interface.
---

# MCP Server

The OpenCost MCP (Model Context Protocol) server provides AI agents with access to cost allocation and asset data through a standardized interface. The MCP server is **enabled by default** in all OpenCost deployments, runs on port 8081, and is **built into the Helm chart** for easy production deployment. Users have full control to disable it or configure custom ports and settings.

## Features

- **Enabled by Default**: MCP server starts automatically with OpenCost
- **Full User Control**: Easy to disable or configure port and settings
- **Allocation Queries**: Retrieve cost allocation data with filtering and aggregation
- **Asset Queries**: Access detailed asset information including nodes, disks, load balancers, and more
- **Cloud Cost Queries**: Query cloud cost data with provider, service, and region filtering
- **HTTP Transport**: Uses HTTP for reliable communication with MCP clients
- **Zero Configuration**: Works out of the box with default OpenCost deployment
- **Helm Integration**: Built into the official Helm chart for production deployments

## Quick Start

### Using Tilt (Development)

```bash
# Clone and start OpenCost with MCP server
git clone https://github.com/opencost/opencost.git
cd opencost
tilt up
```

Tilt configuration notes (cloud costs):

OpenCost's Tilt values (`tilt-values.yaml`) include extra environment variables to enable Cloud Cost ingestion in dev:

```yaml
# tilt-values.yaml (excerpt)
opencost:
  exporter:
    extraEnv:
      CLOUD_COST_ENABLED: "true"
      CLOUD_COST_CONFIG_PATH: "/var/cloud-integration/cloud-integration.json"
```

- Set `CLOUD_COST_ENABLED` to "true" to turn on cloud cost ingestion.
- Point `CLOUD_COST_CONFIG_PATH` to the mounted cloud integration file used by Tilt (e.g., `/var/cloud-integration/cloud-integration.json`).
- Adjust other values in `tilt-values.yaml` as needed during development.

### Using Helm (Production)

```bash
# Add the OpenCost Helm repository
helm repo add opencost https://opencost.github.io/opencost-helm-chart
helm repo update

# Deploy OpenCost with MCP server (enabled by default)
helm install opencost opencost/opencost

# Access MCP server via port forwarding (example)
kubectl port-forward svc/opencost 8081:8081
```

The MCP server is **enabled by default** in the Helm chart. For custom configuration:

```bash
# Deploy with MCP server disabled
helm install opencost opencost/opencost \
  --set opencost.mcp.enabled=false

# Deploy with custom MCP port
helm install opencost opencost/opencost \
  --set opencost.mcp.port=9091

# Deploy with debug logging
helm install opencost opencost/opencost \
  --set opencost.mcp.extraEnv.MCP_LOG_LEVEL=debug
```

### Configuration Summary

| Configuration | Command | Description |
|---------------|---------|-------------|
| **Default** | `helm install opencost opencost/opencost` | MCP enabled on port 8081 |
| **Disable** | `--set opencost.mcp.enabled=false` | Completely disable MCP server |
| **Custom Port** | `--set opencost.mcp.port=9091` | Use different port |
| **Debug Mode** | `--set opencost.mcp.extraEnv.MCP_LOG_LEVEL=debug` | Enable debug logging |

## MCP Client Configuration

Configure your MCP client (e.g., Cursor) to connect to the OpenCost MCP server:

### Default configuration (port 8081)

```json
{
  "mcpServers": {
    "opencost": {
      "type": "http",
      "url": "http://localhost:8081"
    }
  }
}
```

### Custom port configuration

```json
{
  "mcpServers": {
    "opencost": {
      "type": "http",
      "url": "http://localhost:9091"
    }
  }
}
```

### For Kubernetes deployments

```json
{
  "mcpServers": {
    "opencost": {
      "type": "http",
      "url": "http://opencost.opencost.svc.cluster.local:8081"
    }
  }
}
```

### For external access (with LoadBalancer/Ingress)

```json
{
  "mcpServers": {
    "opencost": {
      "type": "http",
      "url": "http://your-opencost-domain.com:8081"
    }
  }
}
```

## Available MCP Tools

The MCP server provides these tools for AI agents:

### `get_allocation_costs`

Retrieve cost allocation data with filtering and aggregation.

**Parameters:**
- `window` (required): Time window (e.g., "7d", "1h", "30m")
- `aggregate` (optional): Aggregation properties (e.g., "namespace", "pod", "node")
- `step` (optional): Resolution step size
- `accumulate` (optional): Whether to accumulate over time
- `share_idle` (optional): Whether to share idle costs
- `include_idle` (optional): Whether to include idle resources

### `get_asset_costs`

Retrieve asset cost data including nodes, disks, load balancers, and more.

**Parameters:**
- `window` (required): Time window (e.g., "7d", "1h", "30m")

### `get_cloud_costs`

Retrieve cloud cost data with provider, service, and region filtering.

**Parameters:**
- `window` (required): Time window (e.g., "7d", "1h", "30m")
- `aggregate` (optional): Aggregation properties (e.g., "provider", "service", "region")
- `accumulate` (optional): Time accumulation ("day", "week", "month")
- `provider` (optional): Filter by cloud provider (e.g., "aws", "gcp", "azure")
- `service` (optional): Filter by service (e.g., "ec2", "compute", "s3")
- `category` (optional): Filter by category (e.g., "compute", "storage", "network")
- `region` (optional): Filter by region (e.g., "us-west-1", "us-central1")
- `accountID` (optional): Filter by account ID

## Supported Asset Types

- **Node**: Compute instances with CPU, RAM, GPU details
- **Disk**: Storage volumes with usage and cost breakdown
- **LoadBalancer**: Load balancer instances with IP and private status
- **Network**: Network-related costs and usage
- **Cloud**: Cloud service costs with credit information
- **ClusterManagement**: Kubernetes cluster management costs

## Example Usage

Once configured, AI agents can query cost data like:

```javascript
// Get cost allocation for the last 7 days
const allocation = await mcpClient.callTool('get_allocation_costs', {
  window: '7d',
  aggregate: 'namespace,node'
});

// Get asset costs for the last 24 hours
const assets = await mcpClient.callTool('get_asset_costs', {
  window: '1d'
});

// Get cloud costs for AWS EC2 in us-west-1
const cloudCosts = await mcpClient.callTool('get_cloud_costs', {
  window: '7d',
  aggregate: 'service',
  provider: 'aws',
  service: 'ec2',
  accumulate: 'day',
  filter: 'regionID:"us-west-1"'
});
```