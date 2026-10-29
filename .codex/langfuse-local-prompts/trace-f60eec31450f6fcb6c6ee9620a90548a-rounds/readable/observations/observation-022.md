# Observation 022

- ID: `358069a07310af44`
- Name: `schema_recall`
- Type: `EMBEDDING`
- Parent: `d6e050672c6ffd81`
- Start: `2026-09-09T02:57:45.306Z`

## Complete Observation

```text
{
  "id": "358069a07310af44",
  "traceId": "f60eec31450f6fcb6c6ee9620a90548a",
  "startTime": "2026-09-09T02:57:45.306Z",
  "projectId": "cmskfnk6e0006t907376scxuu",
  "parentObservationId": "d6e050672c6ffd81",
  "type": "EMBEDDING",
  "environment": "default",
  "endTime": "2026-09-09T02:57:45.561Z",
  "name": "schema_recall",
  "level": "DEFAULT",
  "statusMessage": null,
  "version": null,
  "createdAt": "2026-09-09T02:57:45.825Z",
  "updatedAt": "2026-09-09T02:57:45.904Z",
  "input": {
    "text_count": 1
  },
  "output": {
    "dimensions": 1024,
    "count": 1
  },
  "metadata": {
    "chat_id": "df162f45-e1d8-4b02-bd70-ab0a9d51ad5e",
    "task_id": "73e40fb3-5d9a-401d-9852-a7aff08c2d06",
    "turn_id": "73e40fb3-5d9a-401d-9852-a7aff08c2d06",
    "turn_number": 2,
    "logical_task_id": "73e40fb3-5d9a-401d-9852-a7aff08c2d06",
    "qa_type": "REPORT_QA",
    "qa_mode_name": "深度分析",
    "is_resume": false,
    "stage": "schema_recall",
    "operation": "query_embedding",
    "resourceAttributes": {
      "telemetry.sdk.language": "python",
      "telemetry.sdk.name": "opentelemetry",
      "telemetry.sdk.version": "1.38.0",
      "service.name": "unknown_service"
    },
    "scope": {
      "name": "langfuse-sdk",
      "version": "3.10.1",
      "attributes": {
        "public_key": "pk-lf-47389d60-929f-4fbe-a7d9-fa9af487d411"
      }
    }
  },
  "model": "text-embedding-v4",
  "modelParameters": {},
  "completionStartTime": null,
  "promptId": null,
  "promptName": null,
  "promptVersion": null,
  "latency": 0.255,
  "timeToFirstToken": null,
  "usageDetails": {},
  "costDetails": {},
  "usagePricingTierId": null,
  "usagePricingTierName": null,
  "modelId": null,
  "inputPrice": null,
  "outputPrice": null,
  "totalPrice": null,
  "calculatedInputCost": null,
  "calculatedOutputCost": null,
  "calculatedTotalCost": 0,
  "unit": "TOKENS",
  "promptTokens": 0,
  "completionTokens": 0,
  "totalTokens": 0,
  "usage": {
    "unit": "TOKENS",
    "input": 0,
    "output": 0,
    "total": 0
  }
}
```
