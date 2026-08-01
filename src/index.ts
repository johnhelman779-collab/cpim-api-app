import cors from "cors";
import express from "express";
import deviceRoutes from "./routes/devices";

const app = express();
const port = Number(process.env.PORT ?? 3002);

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ service: "cpim-api-app", status: "ok" });
});

app.use(deviceRoutes);

app.listen(port, () => {
  console.log(`cpim-api-app listening on http://localhost:${port}`);
});
