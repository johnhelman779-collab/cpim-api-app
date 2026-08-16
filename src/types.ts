export interface DeviceTag {
  name: string;
  dataType: "bool" | "number" | "string";
  description: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  protocol: string;
  endpoint: string;
  tags: DeviceTag[];
  status: string;
}

export type TagValue = boolean | number | string;

export interface DeviceRuntime {
  connection: "online" | "degraded" | "offline";
  lastPolledAt: string;
  values: Record<string, TagValue>;
}
