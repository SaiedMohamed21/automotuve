import * as signalR from "@microsoft/signalr";
import { API_ORIGIN, getAuthToken } from "./api";

type SyncCallback = (category: string) => void;

let connection: signalR.HubConnection | null = null;
let syncCallback: SyncCallback | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function setupSignalRSync(onDataChanged: SyncCallback) {
  syncCallback = onDataChanged;

  const token = getAuthToken();
  if (!token) {
    stopSignalRSync();
    return;
  }

  if (connection && connection.state !== signalR.HubConnectionState.Disconnected) {
    return;
  }

  const hubUrl = `${API_ORIGIN}/hubs/sync`;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      accessTokenFactory: () => getAuthToken() || "",
      skipNegotiation: false,
      transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.LongPolling,
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .configureLogging(signalR.LogLevel.Warning)
    .build();

  connection.on("DataChanged", (category: string) => {
    // Coalesce / debounce rapid notifications to avoid duplicate API requests
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      if (syncCallback) {
        syncCallback(category || "All");
      }
    }, 300);
  });

  connection.start().catch((err) => {
    console.warn("[SignalR] Connection start failed:", err);
  });

  connection.onreconnected(() => {
    console.info("[SignalR] Reconnected — triggering catchup data sync");
    if (syncCallback) {
      syncCallback("All");
    }
  });
}

export function stopSignalRSync() {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = null;
  }
  if (connection) {
    connection.stop().catch(() => {});
    connection = null;
  }
}
