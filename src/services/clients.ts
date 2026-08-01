import type { Device } from "../types";

const contentUrl = process.env.CONTENT_URL ?? "http://localhost:3003";
const exceptionsUrl = process.env.EXCEPTIONS_URL ?? "http://localhost:3004";

export async function fetchDevices(): Promise<Device[]> {
  const res = await fetch(`${contentUrl}/devices`);
  if (!res.ok) {
    throw new Error(`content service error: ${res.status}`);
  }
  const data = (await res.json()) as { devices: Device[] };
  return data.devices;
}

export async function fetchDevice(id: string): Promise<Device | null> {
  const res = await fetch(`${contentUrl}/devices/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`content service error: ${res.status}`);
  }
  const data = (await res.json()) as { device: Device };
  return data.device;
}

export async function reportException(input: {
  deviceId: string;
  deviceName?: string;
  code: string;
  message: string;
  severity: "info" | "warning" | "error" | "critical";
}): Promise<void> {
  await fetch(`${exceptionsUrl}/exceptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
}
