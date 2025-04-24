# groundcover RUM Integration Example

This repository demonstrates integrating groundcover's Real User Monitoring (RUM) SDK into a React and Vite application.


## Resources

- [Documentation](https://docs.groundcover.com/getting-started/connect-rum)

## Quick Start

1. [Find your groundcover DSN and API Key](https://docs.groundcover.com/architecture/incloud-managed/ingestion-endpoints#prerequisites)

2. Install the SDK
```bash
npm install @groundcover/browser
```

3. Initialize in your app entry point
```typescript
import groundcover from "@groundcover/browser";

groundcover.init({
  cluster: "dev",
  environment: "dev",
  appId: "app-id",
  dsn: "<your-dsn>",
  apiKey: "<your api key>",
});
```

## Capture Exceptions

The sample app shows how to capture exceptions:

```typescript
const handleCheckout = async () => {
  try {
    aFunctionThatThrowsAnError();
  } catch (error) {
    groundcover.captureException(error);
  }
};
```

## Send Custom Events

The sample app shows how to send custom events:

```typescript
groundcover.sendCustomEvent({
  event: "checkout",
  attributes: { totalItems: cartTotal }
});
```

## Configuration Options

| Option | Description |
|--------|-------------|
| `cluster` | Cluster name (e.g., "dev", "prod") |
| `environment` | Application environment |
| `appId` | Application identifier |
| `dsn` | Data Source Name endpoint URL |
| `apiKey` | groundcover API key |

### Advanced Configuration

```typescript
export interface SDKOptions {
  batchSize: number;
  batchTimeout: number;
  eventSampleRate: number;
  sessionSampleRate: number;
  environment: string;
  debug: boolean;
  tracePropagationUrls: string[];
  beforeSend: (event: Event) => boolean;
  excludedUrls: [];
}
```
