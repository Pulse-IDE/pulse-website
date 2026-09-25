interface WorkerRequest {
  entryUrl: string;
}

interface WorkerActivateResult {
  ok: boolean;
  error?: string;
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const entryUrl = event.data.entryUrl;
  if (!entryUrl) {
    const result: WorkerActivateResult = { ok: false, error: "missing entryUrl" };
    self.postMessage(result);
    return;
  }
  fetch(entryUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`fetch failed ${response.status}`);
      }
      return response.text();
    })
    .then((source) => {
      if (source.includes("process.env") || source.includes("require(")) {
        throw new Error("blocked extension pattern");
      }
      const result: WorkerActivateResult = { ok: true };
      self.postMessage(result);
    })
    .catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "validation failed";
      const result: WorkerActivateResult = { ok: false, error: message };
      self.postMessage(result);
    });
};

export {};
