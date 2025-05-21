---
sidebar_position: 1
---
# Diagnostics API

The OpenCost Diagnostics Service provides a flexible framework for registering, managing, and executing diagnostic checks within the OpenCost system. The service facilitates concurrent execution of diagnostics with configurable timeouts and standardized result collection.

## Key Components

### DiagnosticService

An interface that defines the contract for registering and executing diagnostics:

```go
type DiagnosticService interface {
    Register(name, description, category string, runner DiagnosticRunner) error
    Unregister(name, category string) bool
    Run(ctx context.Context) []*DiagnosticResult
    RunCategory(ctx context.Context, category string) []*DiagnosticResult
    RunDiagnostic(ctx context.Context, category, name string) *DiagnosticResult
    Diagnostics() []Diagnostic
    Total() int
}
```

The default implementation of this interface is the `OpencostDiagnosticService` struct, which provides a thread-safe non-distributed implementation of the service. 

### DiagnosticRunner

A function type that implements the actual diagnostic logic:

```go
type DiagnosticRunner func(context.Context) (map[string]any, error)
```

### DiagnosticResult

Represents the outcome of executing a diagnostic:

```go
type DiagnosticResult struct {
    ID          string         `json:"id"`
    Name        string         `json:"name"`
    Description string         `json:"description"`
    Category    string         `json:"category"`
    Timestamp   time.Time      `json:"timestamp"`
    Error       string         `json:"error,omitempty"`
    Details     map[string]any `json:"details,omitempty"`
}
```

## Creating a Diagnostic

To create a new diagnostic, implement the `DiagnosticRunner` function:

```go
func myDiagnostic(ctx context.Context) (map[string]any, error) {
    // Implement diagnostic logic here
    
    // For successful diagnostics, return details and nil error
    // Note that this map can contain any specific details your diagnostic
    // needs to return. 
    return map[string]any{
        "status": "healthy",
        "metric": 100,
        "additionalInfo": "Everything looks good",
    }, nil
    
    // For failed diagnostics, return error
    // return nil, errors.New("diagnostic failed because...")
}
```

## Using the Diagnostics Service

### Creating a Service Instance

```go
diagService := diagnostics.NewDiagnosticService()
```

### Registering Diagnostics

```go
// Register a simple diagnostic
err := diagService.Register(
    "connection-check",                   // name
    "Checks connection to external APIs", // description
    "connectivity",                       // category
    func(ctx context.Context) (map[string]any, error) {
        // Diagnostic implementation
        return map[string]any{"connected": true, "latency_ms": 42}, nil
    },
)
if err != nil {
    // Handle registration error
}
```

### Running Diagnostics

```go
// Run all diagnostics
ctx := context.Background()
allResults := diagService.Run(ctx)

// Run all diagnostics in a specific category
networkResults := diagService.RunCategory(ctx, "network")

// Run a specific diagnostic
result := diagService.RunDiagnostic(ctx, "connectivity", "connection-check")
```

### Processing Results

```go
// Example of processing diagnostic results
for _, result := range allResults {
    if result.Error != "" {
        fmt.Printf("Diagnostic %s failed: %s\n", result.Name, result.Error)
        continue
    }
    
    fmt.Printf("Diagnostic %s succeeded with details: %v\n", result.Name, result.Details)
}
```

## Advanced Topics

### Using Context for Cancellation

The service uses contexts with timeouts to ensure diagnostics don't run indefinitely:

```go
// Create context with timeout
ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
defer cancel()

// Run diagnostics with timeout context
results := diagService.Run(ctx)
```

### Best Practices

1. **Keep diagnostics focused**: Create a diagnostic per task or check
2. **Make diagnostics fast**: Avoid long-running tasks or queries in diagnostics
3. **Good failure messages**: Return meaningful error messages from diagnostic failures
4. **Include detailed information**: Provide useful details in successful results (via the `map[string]any` return type)
5. **Use categories effectively**: Organize diagnostics into logical categories to allow for easier management and execution
6. **Use meaningful names**: Make diagnostic names and descriptions clear and concise
7. **Be context-aware**: Follow go standards and conventions when implementing `context.Context` in your diagnostics

## Example Usage

```go
package main

import (
    "context"
    "fmt"
    "time"
    
    "github.com/opencost/opencost/core/pkg/diagnostics"
)

func main() {
    const (
        DiagnosticCategorySystem = "system"
    )

    // Create service
    diagService := diagnostics.NewDiagnosticService()
    
    // Register diagnostics
    diagService.Register(
        "config-check",
        "Validates system configuration",
        DiagnosticCategorySystem,
        func(ctx context.Context) (map[string]any, error) {
            // run actual diagnostics of configuration checks and report back the
            // results... 
            return map[string]any{
                "configValid": true,
                "lastUpdated": time.Now().Add(-24 * time.Hour),
            }, nil
        },
    )
    
    // Run ALL diagnostics with 10 second timeout -- Important to note that 
    // each diagnostic is limited to a 5 second execution time
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    
    results := diagService.Run(ctx)
    
    // Process results
    for _, r := range results {
        if r.Error != "" {
            fmt.Printf("❌ %s: %s\n", r.Name, r.Error)
        } else {
            fmt.Printf("✅ %s: %v\n", r.Name, r.Details)
        }
    }
}
```