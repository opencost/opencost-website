---
sidebar_position: 9
---

# CSV Export

Opencost supports data export in a CSV format to a local file, Azure Blob Storage, AWS S3, and Google Cloud Storage.

The data is aggregated at a day level and exported every day after 00:10 UTC.
The first export includes all available data, while subsequent launches only export data for dates not present in the existing export file.

An example of export file can be found [here](/export-sample.csv).


## Configuration


To enable export, set the `COST_EXPORT_FILE` environment variable to the path of the file. The file can be a local file or a storage object in one of the clouds. Here are some usage examples:

| Provider             | Value                                                                        |
|----------------------|------------------------------------------------------------------------------|
| Azure Blob Storage   | `https://azblobaccount.blob.core.windows.net/containername/path/to/file.csv` |
| AWS S3               | `s3://bucketname/path/to/file.csv `                                          |
| Google Cloud Storage | `gs://bucket-name/path/to/file.csv`                                          |
| Local File           | `/path/to/file.csv `                                                         |



### Export data to a persistent volume.

There is an example of a change required for the opencost deployment to export data to a persistent volume.

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
# Update the opencost deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opencost
  # ...
spec:
  # ...
  template:
    # ...
    spec:
      # ...
      securityContext:
        fsGroup: 1001 # opencost is running as a non-root user, this gives container permission to write to the pvc
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

### Export data to a cloud storage

To export data to cloud storage, you need to add download and upload permissions to the Opencost pod. Opencost uses default credentials from cloud provider SDK's. Each cloud provider has a different way of authenticating the pod.

For example, it can be done using environment variables such as `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID` for Azure Blob Storage, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` for AWS S3, `GOOGLE_APPLICATION_CREDENTIALS` for Google Cloud Storage. Alternatively, it can be achieved using a service account. Check your provider's documentation for more details.

There is an example of a change required for the opencost deployment to export data to an Azure Blob Storage.

```yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: opencost-sp
type: Opaque
data:
  appId: CHANGEME
  password: CHANGEME
  tenant: CHANGEME
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
          env:
            - name: EXPORT_CSV_FILE
              value: "https://accountstorage.blob.core.windows.net/opencost/path/to/file.csv"
            - name: AZURE_CLIENT_ID
              valueFrom:
                secretKeyRef:
                  name: opencost-sp
                  key: appId
            - name: AZURE_TENANT_ID
              valueFrom:
                secretKeyRef:
                  name: opencost-sp
                  key: tenant
            - name: AZURE_CLIENT_SECRET
              valueFrom:
                secretKeyRef:
                  name: opencost-sp
                  key: password
```

Note. Export requires data for a full day (between 00:00 and 23:59 UTC). This is required to avoid writing incomplete data.
If you just installed opencost you may need to wait between 24 and 48 hours before the data is available.
