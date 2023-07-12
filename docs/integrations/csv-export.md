---
sidebar_position: 4
---

# CSV Export

As announced in the [recent Azure blog post](http://aka.ms/aks/OpenCost-AKS), Microsoft has made several contributions to augment OpenCost and enable support with AKS. Part of this new OpenCost functionality is the ability to export cost allocation data in CSV format to a local file, Azure Blob Storage, AWS S3, or Google Cloud Storage. This feature allows you to archive and analyze your data outside of OpenCost.

An example of export file can be found [here](/export-sample.csv).

# Export Process

Every day at 00:10 UTC, the data for the previous day is exported to the specified location. The first export includes all available data, while subsequent launches only export data for dates not present in the existing export file. The exported data is aggregated at the day level.

Please note that to avoid exporting incomplete data, OpenCost requires data to accumulate for a full day (between 00:00 and 23:59 UTC). If you have just installed OpenCost, you may need to wait for between 24 and 48 hours before the data is available for export.


# Configuration

To enable CSV export, you need to set the `EXPORT_CSV_FILE` environment variable to the path of the file. The file can be a local file or a storage object in one of the clouds. If the file doesn't exist, it will automatically be created. If the file already exists, the data will be appended to it.
Here are some usage examples:

| Provider             | Value                                                                        |
|----------------------|------------------------------------------------------------------------------|
| Local File           | `/path/to/file.csv`                                                          |
| Azure Blob Storage   | `https://azblobaccount.blob.core.windows.net/containername/path/to/file.csv` |
| AWS S3               | `s3://bucketname/path/to/file.csv `                                          |
| Google Cloud Storage | `gs://bucket-name/path/to/file.csv`                                          |


In addition, configuring a persistent volume or cloud storage is required.

To export data to cloud storage, you need to add download and upload permissions to the OpenCost pod. OpenCost uses default credentials from cloud provider SDK's. Each cloud provider has a different way of authenticating the pod.

For example, it can be done using environment variables such as `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID` for Azure Blob Storage, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` for AWS S3, `GOOGLE_APPLICATION_CREDENTIALS` for Google Cloud Storage. Alternatively, it can be achieved using a service account. Check your provider's documentation for more details.

## Export Data to a Persistent Volume

Follow the steps below to export data to a persistent volume:

1. Create a persistent volume claim for storing the data.
2. Attach the persistent volume claim to the OpenCost deployment and set `EXPORT_CSV_FILE` environment variable to the path of the file in the persistent volume.

As a result of these steps, the OpenCost deployment should look like this:

```yaml
---
# Create a persistent volume claim for storing the data
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: opencost-export
  namespace: opencost
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi # amount of required storage is based on amount of containers running on the cluster, adjust if required
---
# Update the OpenCost deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opencost
  namespace: opencost
  # ...
spec:
  # ...
  template:
    # ...
    spec:
      # ...
      securityContext:
        fsGroup: 1001 # OpenCost is running as a non-root user, this gives container permission to write to the pvc
      containers:
        # ...
        - name: opencost
          env:
            # ...
            - name: EXPORT_CSV_FILE
              value: "/mnt/export/data.csv"
          volumeMounts:
            - mountPath: /mnt/export
              name: opencost-export
              readOnly: false
      volumes:
        - name: opencost-export
          persistentVolumeClaim:
            claimName: opencost-export
```

## Export data to Azure Blob Storage

Follow the steps below to export data to Azure Blob Storage:
1. Create a storage account and a container in the Azure portal.
2. Create a service principal with `Storage Blob Data Contributor` role for the storage account.
3. Create a secret with the service principal's `appId`, `password`, and `tenant` values.
4. Set the `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID` environment variables of OpenCost deployment to the values of the service principal secret.
5. Set the `EXPORT_CSV_FILE` environment variable of OpenCost deployment to the path of the file in the Azure Blob Storage. Ensure the path contains `*.blob.core.windows.net` and the container name.

As a result of these steps, the OpenCost deployment should look like this:
```yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: opencost-service-principal
type: Opaque
# These are non-encoded values
# Use "data" instead of "stringData" if you want to write base64 encoded secrets
stringData:
  AZURE_CLIENT_ID: CHANGE_ME
  AZURE_TENANT_ID: CHANGE_ME
  AZURE_CLIENT_SECRET: CHANGE_ME
---
# Update the opencost deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opencost
spec:
  # ...
  template:
    spec:
      # ...
      containers:
        - name: opencost
          # ...
          envFrom:
            - secretRef:
                name: opencost-service-principal
          env:
            - name: EXPORT_CSV_FILE
              value: "https://accountstorage.blob.core.windows.net/opencost/path/to/file.csv"
```

Alternatively, access to the storage can be configured using workload identity.
Check [this page](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview) for more details.

## Export Labels.

- `EXPORT_CSV_LABELS_LIST` accept a comma-separated list of desired labels. For example `EXPORT_CSV_LABELS_LIST=app,team`. For each label a new column will be created in the CSV file.
- `EXPORT_CSV_LABELS_ALL` accepts a boolean. If set to `true`, all available labels will be exported in a JSON format to `Labels` column.

## Disable Export Job

To stop export, unset the `EXPORT_CSV_FILE` environment variable.
