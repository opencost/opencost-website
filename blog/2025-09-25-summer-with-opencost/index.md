---
slug: summer-with-opencost
title: "That Summer with OpenCost"
authors: [manassivakumar]
tags: [mentorship, integration tests, Linux Foundation, OpenCost]
---

I wouldn't have imagined spending an entire summer working on integration tests for OpenCost after watching a KubeCon video. By cosmic karma, I came across a mentorship under the Linux Foundation for writing Integration tests for OpenCosts Enterprise readiness. I spent my first few hours frantically reading OpenCost docs to deploy the demo in my local environment and draft my application.

<!--truncate-->

## Getting Started with OpenCost

In the brief moment before the mentorship started, I was looking up Prometheus queries and Go structs in OpenCost. This was my first time working on a big project in Go, so I was really nervous that I wouldn't be able to keep up. The idea behind my summer was to test every metric exported in the `/allocation` and `/assets` API, which were numbers synthesized by OpenCost on top of Prom metrics.

## Early Challenges and Breakthroughs

I was able to breeze through the first couple of tests, but I hit a roadblock when it came to time-aggregated results. OpenCost adopts a bottom-to-top approach, where the rules are applied on the lowest level, the containers, and the results are propagated up from Pods to Namespaces to Nodes. I missed this crucial observation until my mentors pointed it out.

## The Persistent Volume Cost Challenge

My second biggest obstacle came in the form of Persistent Volume Costs. Here, the combined use of Kubernetes UID, Container runtimes, and Pod Claims to Persistent Volume Bytes complicated my debugging process. I eventually managed to break down most of the challenges myself and made the tests pass. This was the only test that ate my mind, but also was the most satisfying to write. I offer a specific example of a test helper function below that helped me make sense of how OpenCost allocates its PVCs: 

```go
func buildPodPVCMap(window string, endTime int64, podMap map[PodKey]*PodData, persistentVolumeMap map[string]*PersistentVolume, persistentVolumeClaimMap map[PersistentVolumeClaimKey]*PersistentVolumeClaim, IngestUID bool, podUIDKeyMap map[PodKey][]PodKey, t *testing.T) map[PodKey][]*PersistentVolumeClaim {

	podPVCAllocation, err := queryPodPVCAllocation(window, endTime)  
	if err != nil {  
		t.Fatalf("Error Occurred while querying PromQL pod_pvc_allocation: %v", err)  
	}

	podPVCMap := make(map[PodKey][]*PersistentVolumeClaim)

	for _, podPVCAllocationItem := range podPVCAllocation.Data.Result {

		namespace := podPVCAllocationItem.Metric.Namespace  
		pod := podPVCAllocationItem.Metric.Pod  
		persistentVolumeName := podPVCAllocationItem.Metric.PersistentVolume  
		persistentVolumeClaimName := podPVCAllocationItem.Metric.PersistentVolumeClaim

		if namespace == "" || pod == "" || persistentVolumeName == "" || persistentVolumeClaimName == "" {  
			t.Logf("PV Test: pvc allocation query result missing field")  
			continue  
		}

		podKey := PodKey{  
			Namespace: namespace,  
			Pod:       pod,  
		}

		persistentVolumeClaimKey := PersistentVolumeClaimKey{  
			Namespace:                 namespace,  
			PersistentVolumeClaimName: persistentVolumeClaimName,  
		}

		if _, ok := persistentVolumeMap[persistentVolumeName]; !ok {  
			t.Logf("PV Test: pv missing for pvc allocation query result: %s", persistentVolumeName)  
		}

		pvc, ok := persistentVolumeClaimMap[persistentVolumeClaimKey]  
		if !ok {  
			t.Logf("PV Test: pvc missing for from PVC alloctions prom query: %s", persistentVolumeClaimKey)  
			continue  
		}

		pvc.Mounted = true

		if IngestUID {  
			for _, key := range podUIDKeyMap[podKey] {  
				podPVCMap[key] = append(podPVCMap[key], pvc)  
			}  
		} else {  
			podPVCMap[podKey] = append(podPVCMap[podKey], pvc)  
		}  
	}

	return podPVCMap  
}
```

Here is a function that builds a podPVC map. The PodPVC map represents all the Persistent VolumeClaims made by a pod. This is useful in particular, when we wish to calculate costs for a Pod incurred by each PV (through a PVC). The PV Claim includes Persistent Volume and Time Allocated information, with this we can calculate costs using the weighted average formula. Notice we apply the PVCs to all Pod UIDs, even if the pod runtimes are separated for a longer time.

## Impact and Future Plans

The most fulfilling part of this summer is that my tests are now run on the OpenCost pipeline. I'm thrilled to think that everyone who wants to make a new change will now have to pass my tests before merging code. My tests run in the context of the OpenCost Integration Testing Pipeline, here: 
<!-- .slide: data-background-color="white" -->
![pipeline](https://github.com/opencost/opencost/blob/develop/docs/testing/OC%20Test%20Arch.png?raw=true)

I want to keep contributing to OpenCost and work my way up to a maintainer. I'm grateful for being given this opportunity and for my mentors, [@ameijer](https://github.com/ameijer) and [@mbolt35](https://github.com/mbolt35).