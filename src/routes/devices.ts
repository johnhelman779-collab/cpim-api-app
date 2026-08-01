import { Router } from "express";
import { fetchDevice, fetchDevices, reportException } from "../services/clients";
import { getRuntime, pollDevice, writeTag } from "../services/simulator";

const router = Router();

router.get("/devices", async (_req, res) => {
  try {
    const devices = await fetchDevices();
    const enriched = devices.map((device) => {
      const runtime = getRuntime(device);
      return {
        ...device,
        connection: runtime.connection,
        lastPolledAt: runtime.lastPolledAt,
        values: runtime.values,
      };
    });
    res.json({ devices: enriched });
  } catch (err) {
    res.status(502).json({
      error: "Failed to load devices from content service",
      detail: err instanceof Error ? err.message : String(err),
    });
  }
});

router.get("/devices/:id/status", async (req, res) => {
  try {
    const device = await fetchDevice(req.params.id);
    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    const runtime = pollDevice(device);

    // Raise exception when simulated fault / alarm conditions appear
    if (device.id === "dev-plc-pack" && runtime.values.FaultCode === 12) {
      await reportException({
        deviceId: device.id,
        deviceName: device.name,
        code: "PLC_FAULT",
        message: "Simulated FaultCode=12 on packaging PLC",
        severity: "error",
      });
    }
    if (device.id === "dev-hmi-a" && runtime.values.AlarmActive === true) {
      await reportException({
        deviceId: device.id,
        deviceName: device.name,
        code: "HMI_ALARM",
        message: "Simulated AlarmActive on HMI Panel A",
        severity: "warning",
      });
    }
    if (device.id === "dev-robot-1" && runtime.values.ProgramState === "ERROR") {
      await reportException({
        deviceId: device.id,
        deviceName: device.name,
        code: "ROBOT_ERROR",
        message: "Simulated robot ProgramState=ERROR",
        severity: "critical",
      });
    }

    res.json({
      deviceId: device.id,
      name: device.name,
      protocol: device.protocol,
      endpoint: device.endpoint,
      ...runtime,
    });
  } catch (err) {
    res.status(502).json({
      error: "Failed to poll device",
      detail: err instanceof Error ? err.message : String(err),
    });
  }
});

router.post("/devices/:id/write", async (req, res) => {
  try {
    const device = await fetchDevice(req.params.id);
    if (!device) {
      res.status(404).json({ error: "Device not found" });
      return;
    }

    const { tag, value } = req.body ?? {};
    if (typeof tag !== "string") {
      res.status(400).json({ error: "tag is required" });
      return;
    }

    const result = writeTag(device, tag, value);
    if (!result.ok) {
      await reportException({
        deviceId: device.id,
        deviceName: device.name,
        code: "WRITE_REJECTED",
        message: result.error,
        severity: "warning",
      });
      res.status(400).json({ error: result.error });
      return;
    }

    res.json({
      deviceId: device.id,
      tag,
      value,
      runtime: result.runtime,
    });
  } catch (err) {
    res.status(502).json({
      error: "Failed to write device tag",
      detail: err instanceof Error ? err.message : String(err),
    });
  }
});

export default router;
