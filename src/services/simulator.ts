import type { Device, DeviceRuntime, TagValue } from "../types";

const runtime = new Map<string, DeviceRuntime>();

function defaultValue(dataType: Device["tags"][number]["dataType"], tagName: string): TagValue {
  switch (dataType) {
    case "bool":
      return tagName.toLowerCase().includes("alarm") ? false : true;
    case "string":
      return "IDLE";
    case "number":
    default:
      return 0;
  }
}

function ensureRuntime(device: Device): DeviceRuntime {
  let state = runtime.get(device.id);
  if (!state) {
    const values: Record<string, TagValue> = {};
    for (const tag of device.tags) {
      values[tag.name] = defaultValue(tag.dataType, tag.name);
    }
    state = {
      connection: "online",
      lastPolledAt: new Date().toISOString(),
      values,
    };
    runtime.set(device.id, state);
  }
  return state;
}

/** Advance simulated tag values on each poll. */
export function pollDevice(device: Device): DeviceRuntime {
  const state = ensureRuntime(device);
  const now = Date.now();

  for (const tag of device.tags) {
    const current = state.values[tag.name];
    if (tag.dataType === "number") {
      const base = typeof current === "number" ? current : 0;
      if (tag.name === "Heartbeat") {
        state.values[tag.name] = base + 1;
      } else if (tag.name === "LineSpeed") {
        state.values[tag.name] = Number((40 + Math.sin(now / 5000) * 5).toFixed(1));
      } else if (tag.name === "Register_Temp") {
        state.values[tag.name] = Number((65 + Math.sin(now / 8000) * 3).toFixed(1));
      } else if (tag.name === "PlantPower") {
        state.values[tag.name] = Number((120 + Math.cos(now / 6000) * 15).toFixed(1));
      } else if (tag.name === "PoseX") {
        state.values[tag.name] = Number((Math.sin(now / 3000) * 250).toFixed(1));
      } else if (tag.name === "FaultCode") {
        // occasionally non-zero to exercise exception path
        state.values[tag.name] = Math.floor(now / 20000) % 7 === 0 ? 12 : 0;
      } else {
        state.values[tag.name] = Number((base + Math.random()).toFixed(2));
      }
    } else if (tag.dataType === "bool") {
      if (tag.name === "AlarmActive") {
        state.values[tag.name] = Math.floor(now / 15000) % 5 === 0;
      }
    } else if (tag.dataType === "string" && tag.name === "ProgramState") {
      const states = ["IDLE", "RUNNING", "HOLD", "ERROR"];
      state.values[tag.name] = states[Math.floor(now / 10000) % states.length];
    }
  }

  state.connection = "online";
  state.lastPolledAt = new Date().toISOString();
  return state;
}

export function writeTag(
  device: Device,
  tagName: string,
  value: TagValue
): { ok: true; runtime: DeviceRuntime } | { ok: false; error: string } {
  const tag = device.tags.find((t) => t.name === tagName);
  if (!tag) {
    return { ok: false, error: `Unknown tag '${tagName}' on device ${device.id}` };
  }

  if (tag.dataType === "bool" && typeof value !== "boolean") {
    return { ok: false, error: `Tag '${tagName}' expects boolean` };
  }
  if (tag.dataType === "number" && typeof value !== "number") {
    return { ok: false, error: `Tag '${tagName}' expects number` };
  }
  if (tag.dataType === "string" && typeof value !== "string") {
    return { ok: false, error: `Tag '${tagName}' expects string` };
  }

  const state = ensureRuntime(device);
  state.values[tagName] = value;
  state.lastPolledAt = new Date().toISOString();
  return { ok: true, runtime: state };
}

export function getRuntime(device: Device): DeviceRuntime {
  return pollDevice(device);
}
