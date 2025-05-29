---
sidebar_position: 2
---
# Storage API 

The OpenCost Storage APIs provide a basic file-system like interface to store and retrieve binary data with the use of paths and file names. It allows a developer the ability to implement this storage interface into any code, and inherit most well-know cloud bucket support. 

```go
// StorageInfo is a data object containing basic information about the path in storage.
type StorageInfo struct {
    Name    string    // base name of the file
    Size    int64     // length in bytes for regular files
    ModTime time.Time // modification time
}

// Storage provides an API for storing binary data
type Storage interface {
    // StorageType returns a string identifier for the type of storage used 
    // by the implementation.
    StorageType() StorageType

    // FullPath returns the storage working path combined with the path provided
    FullPath(path string) string

    // Stat returns the StorageStats for the specific path.
    Stat(path string) (*StorageInfo, error)

    // Read uses the relative path of the storage combined with the provided path to
    // read the contents.
    Read(path string) ([]byte, error)

    // Write uses the relative path of the storage combined with the provided path
    // to write a new file or overwrite an existing file.
    Write(path string, data []byte) error

    // Remove uses the relative path of the storage combined with the provided path to
    // remove a file from storage permanently.
    Remove(path string) error

    // Exists uses the relative path of the storage combined with the provided path to
    // determine if the file exists.
    Exists(path string) (bool, error)

    // List uses the relative path of the storage combined with the provided path to return
    // storage information for the files.
    List(path string) ([]*StorageInfo, error)

    // ListDirectories uses the relative path of the storage combined with the provided path
    // to return storage information for only directories contained along the path. This
    // functions as List, but returns storage information for only directories.
    ListDirectories(path string) ([]*StorageInfo, error)
}
```

The supported storage types at this time are: 
* S3 (or any minio compatible storage)
* Azure Blob Storage
* Google Cloud Storage
* Local File System
* Memory File System (for testing purposes)

OpenCost supports the configuration of the cloud specific storage types through the use of a configuration format implemented by Thanos: [https://thanos.io/tip/thanos/storage.md](https://thanos.io/tip/thanos/storage.md). 

The `Local File System` and `Memory File System` implementations are both available without an external yaml configuration via the `NewFileStorage(baseDir string)` and `NewMemoryStorage()` functions respectively. 