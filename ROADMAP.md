# cpim-api-app roadmap

CPIM device communication layer. Part of the workspace [3-year roadmap](../ROADMAP.md) (CPIM-first).

## This repo’s track

| Period | Focus | Status |
|--------|--------|--------|
| **Y1Q3** | Tag history / simple time-series on poll | `planned` |
| **Y2Q1** | `ProtocolAdapter` SPI; Modbus-TCP adapter behind feature flag | `planned` |
| **Y2Q2** | OPC-UA read; MQTT subscribe; health + reconnect | `planned` |
| **Y2Q3** | Poll job/queue; dead-letter writes → exceptions | `planned` |
| **Y2Q4** | Audit log of tag writes | `planned` |
| **Y3Q2** | Horizontal poll/write workers | `planned` |
| **Y3Q3** | EtherNet/IP or robot TCP adapter v1; digital twin read-model | `planned` |
| **Y3Q4** | Offline edge buffer | `planned` |

## Depends on

- `cpim-app-content` for device definitions
- `cpim-app-contentgeneration` for fault reporting

## Notes

Simulator remains the default path until adapters are enabled. Update status when milestones ship.
