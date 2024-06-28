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

The standard OpenCost API query for costs and resources allocated to Kubernetes workloads based on on-demand list pricing. You may specify the `window` date range, the Kubernetes primitive(s) to `aggregate` on, the `step` for the duration of returned sets, the `resolution` for the duration to use for Prometheus queries, and `includeIdle` for whether to include the `__idle__` usage for the cluster.

### `/allocation`
QUERY PARAMETERS
<table>
  <tr>
    <th id="window">window<a class="hash-link" href="#a_window" title="window">​</a></th>
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
    <th id="aggregate">aggregate<a class="hash-link" href="#a_aggregate" title="aggregate">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Field by which to aggregate the results. Accepts: <code>cluster</code>, <code>node</code>, <code>namespace</code>, <code>controllerKind</code>, <code>controller</code>, <code>service</code>, <code>pod</code>, <code>container</code>, <code>label:LABEL_NAME</code>, and <code>annotation:name</code>. Also accepts comma-separated lists for multi-aggregation, like <code>aggregate=namespace,label:app</code>.
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
    <th id="step">step<a class="hash-link" href="#a_step" title="step">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Duration of a single allocation set. If unspecified, this defaults to the `window`, so that you receive exactly one set for the entire window. If specified, it works chronologically backward, querying in durations of step until the full window is covered. Default is <code>window</code>.
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
    <th id="resolution">resolution<a class="hash-link" href="#a_resolution" title="resolution">​</a></th>
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
  <tr>
    <th id="includeidle">includeIdle<a class="hash-link" href="#a_includeidle" title="includeIdle">​</a></th>
    <th align="left">boolean</th>
  </tr>
  <tr>
    <td/>
    <td>
      Whether to return the calculated <code>__idle__</code> field for the query. Default is <code>false</code>.
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>includeIdle=true</code></li>
      </ul>
    </td>
  </tr>
</table>

## Assets API

The Assets API retrieves backing cost data broken down by individual assets in your cluster. It is not yet exposed in the UI.

### `/assets`
QUERY PARAMETERS
<table>
  <tr>
    <th id="window">window<a class="hash-link" href="#as_window" title="window">​</a></th>
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
</table>

## Cloud Costs API

The Cloud Costs API retrieves cloud cost data from cloud providers by reading cost and usage reports. You will need additional [configuration](../configuration/) for supporting the billing integration with your cloud provider.

### `/cloudCost`
QUERY PARAMETERS
<table>
  <tr>
    <th id="window">window<a class="hash-link" href="#c_window" title="window">​</a></th>
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
        <li><code>window=2023-10-18T10:30:00Z,2023-10-19T10:30:00Z</code> - <a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC3339</a> date/time range</li>
        <li><code>window=1674073869,1674193869</code> - <a href="https://www.unixtimestamp.com/">Unix timestamp</a> range</li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="aggregate">aggregate<a class="hash-link" href="#c_aggregate" title="aggregate">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Field by which to aggregate the results.
      Accepts: <code>invoiceEntityID</code>, <code>accountID</code>, <code>provider</code>, <code>providerID</code>, <code>category</code>, and <code>service</code>.
      Also accepts comma-separated lists for multi-aggregation, like <code>aggregate=provider,service</code>.
      If no value is provided, the entire list of items is returned.
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>aggregate=accountID</code> - Aggregates by the Account.</li>
        <li><code>aggregate=category</code> - Aggregates by the individual controllers within the cluster.</li>
        <li><code>aggregate=invoiceEntityID</code> - Aggregates by the Invoice Entity.</li>
        <li><code>aggregate=provider</code> - Aggregates by the Provider.</li>
        <li><code>aggregate=providerID</code> - Aggregates by the Provider ID.</li>
        <li><code>aggregate=service</code> - Aggregates by the Service.</li>
      </ul>
    </td>
  </tr>


  <tr>
    <th id="accumulate">accumulate<a class="hash-link" href="#c_accumulate" title="accumulate">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Step size of the accumulation.
      Accepts: <code>all</code>, <code>hour</code>, <code>day</code>, <code>week</code>, <code>month</code>, and <code>quarter</code>.
      <br/><br/>
      Default: <code>day</code>
      <br/><br/>
      Examples:<br/>
      <ul>
        <li></li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="filter">filter<a class="hash-link" href="#c_filter" title="filter">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      <a href="https://docs.kubecost.com/apis/apis-overview/filters-api">V2 filter parameter</a>.
    </td>
  </tr>

</table>

## External Costs API

### `customCost/timeseries`

Samples of costs of third-party services. Essentially equivalent to calling `/total` over a range of time steps. For example, querying for the past 7 days will give you a `/total` response for each of those days, individually. All available aggregations and filters are the same as with `/total`

QUERY PARAMETERS
<table>

  <tr>
    <th id="window">window<a class="hash-link" href="#a_window" title="window">​</a></th>
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
        <li><code>window=2024-05-18T10:30:00Z,2024-05-19T10:30:00Z</code> - <a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC3339</a> date/time range</li>
        <li><code>window=1674073869,1674193869</code> - <a href="https://www.unixtimestamp.com/">Unix timestamp</a> range</li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="aggregate">aggregate<a class="hash-link" href="#c_aggregate" title="aggregate">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Field by which to aggregate the results.
      Accepts: <code>invoiceEntityID</code>, <code>accountID</code>, <code>provider</code>, <code>providerID</code>, <code>category</code>, and <code>service</code>.
      Also accepts comma-separated lists for multi-aggregation, like <code>provider,service</code>.
      If no value is provided, the entire list of items is returned.
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>aggregate=accountID</code> - Aggregates by the Account.</li>
        <li><code>aggregate=category</code> - Aggregates by the individual controllers within the cluster.</li>
        <li><code>aggregate=invoiceEntityID</code> - Aggregates by the Invoice Entity.</li>
        <li><code>aggregate=provider</code> - Aggregates by the Provider.</li>
        <li><code>aggregate=providerID</code> - Aggregates by the Provider ID.</li>
        <li><code>aggregate=service</code> - Aggregates by the Service.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="accumulate">accumulate<a class="hash-link" href="#c_accumulate" title="accumulate">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Step size of the accumulation.
      Accepts: <code>all</code>, <code>hour</code>, <code>day</code>, <code>week</code>, <code>month</code>, and <code>quarter</code>.
      <br/><br/>
      Default: <code>day</code>
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>accumulate=hour</code></li>
        <li><code>accumulate=day</code></li>
        <li><code>accumulate=week</code></li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="filter">filter<a class="hash-link" href="#c_filter" title="filter">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      The available filters are the same as the available aggregations. Accepts: <a href="https://docs.kubecost.com/apis/apis-overview/filters-api">V2 filter parameters</a>.
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>filter=domain:"datadog"</code></li>
        <li><code>filter=resourceType:"infra_hosts"</code></li>
        <li><code>filter=zone:"us"</code></li>
      </ul>
      </td>
  </tr>

</table>

### `customCost/total`

Used to retrieve a summary of third-party costs over a window.

<table>

  <tr>
    <th id="window">window<a class="hash-link" href="#a_window" title="window">​</a></th>
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
        <li><code>window=2024-05-18T10:30:00Z,2024-05-19T10:30:00Z</code> - <a href="https://datatracker.ietf.org/doc/html/rfc3339">RFC3339</a> date/time range</li>
        <li><code>window=1674073869,1674193869</code> - <a href="https://www.unixtimestamp.com/">Unix timestamp</a> range</li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="aggregate">aggregate<a class="hash-link" href="#c_aggregate" title="aggregate">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Field by which to aggregate the results.
      Accepts: <code>invoiceEntityID</code>, <code>accountID</code>, <code>provider</code>, <code>providerID</code>, <code>category</code>, and <code>service</code>.
      Also accepts comma-separated lists for multi-aggregation, like <code>provider,service</code>.
      If no value is provided, the entire list of items is returned.
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>aggregate=accountID</code> - Aggregates by the Account.</li>
        <li><code>aggregate=category</code> - Aggregates by the individual controllers within the cluster.</li>
        <li><code>aggregate=invoiceEntityID</code> - Aggregates by the Invoice Entity.</li>
        <li><code>aggregate=provider</code> - Aggregates by the Provider.</li>
        <li><code>aggregate=providerID</code> - Aggregates by the Provider ID.</li>
        <li><code>aggregate=service</code> - Aggregates by the Service.</li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="accumulate">accumulate<a class="hash-link" href="#c_accumulate" title="accumulate">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      Step size of the accumulation.
      Accepts: <code>all</code>, <code>hour</code>, <code>day</code>, <code>week</code>, <code>month</code>, and <code>quarter</code>.
      <br/><br/>
      Default: <code>day</code>
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>accumulate=hour</code></li>
        <li><code>accumulate=day</code></li>
        <li><code>accumulate=week</code></li>
      </ul>
    </td>
  </tr>

  <tr>
    <th id="filter">filter<a class="hash-link" href="#c_filter" title="filter">​</a></th>
    <th align="left">string</th>
  </tr>
  <tr>
    <td/>
    <td>
      The available filters are the same as the available aggregations. Accepts: <a href="https://docs.kubecost.com/apis/apis-overview/filters-api">V2 filter parameters</a>.
      <br/><br/>
      Examples:<br/>
      <ul>
        <li><code>filter=domain:"datadog"</code></li>
        <li><code>filter=resourceType:"infra_hosts"</code></li>
        <li><code>filter=zone:"us"</code></li>
      </ul>
      </td>
  </tr>

</table>

## OpenAPI Swagger

The source for the OpenCost API is available as an OpenAPI [swagger.json](https://github.com/opencost/opencost/blob/develop/docs/swagger.json).
The OpenCost API is available under the [Apache 2.0 License](https://github.com/opencost/opencost/blob/develop/LICENSE).

## Theoretical error bounds

Tuning the resolution parameter allows the querier to make tradeoffs between accuracy and performance. For long-running pods (>1d) resolution can be tuned aggressively low (>10m) with relatively little effect on accuracy. However, even modestly low resolutions (5m) can result in significant accuracy degradation for short-running pods (\<1h).

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
