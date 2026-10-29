# Observation 003

- ID: `bd3d5fc1a7ff7f77`
- Name: `conversation_planner`
- Type: `SPAN`
- Parent: `d6e050672c6ffd81`
- Start: `2026-09-09T02:57:37.420Z`

## Complete Observation

```text
{
  "id": "bd3d5fc1a7ff7f77",
  "traceId": "f60eec31450f6fcb6c6ee9620a90548a",
  "startTime": "2026-09-09T02:57:37.420Z",
  "projectId": "cmskfnk6e0006t907376scxuu",
  "parentObservationId": "d6e050672c6ffd81",
  "type": "SPAN",
  "environment": "default",
  "endTime": "2026-09-09T02:57:40.616Z",
  "name": "conversation_planner",
  "level": "DEFAULT",
  "statusMessage": null,
  "version": null,
  "createdAt": "2026-09-09T02:57:40.795Z",
  "updatedAt": "2026-09-09T02:57:40.829Z",
  "input": {
    "qa_type": "REPORT_QA",
    "query": "对比2024年呢"
  },
  "output": null,
  "metadata": {
    "chat_id": "df162f45-e1d8-4b02-bd70-ab0a9d51ad5e",
    "task_id": "73e40fb3-5d9a-401d-9852-a7aff08c2d06",
    "turn_id": "73e40fb3-5d9a-401d-9852-a7aff08c2d06",
    "turn_number": 2,
    "logical_task_id": "73e40fb3-5d9a-401d-9852-a7aff08c2d06",
    "qa_type": "REPORT_QA",
    "qa_mode_name": "深度分析",
    "is_resume": false,
    "stage": "conversation_planner",
    "history_turn_count": 1,
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
  "model": null,
  "modelParameters": null,
  "completionStartTime": null,
  "promptId": null,
  "promptName": null,
  "promptVersion": null,
  "latency": 3.196,
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
