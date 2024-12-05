import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import comfyRoutes from "./routes/comfy.js";
import helmet from "helmet"; // Bảo mật
import compression from "compression"; // Nén phản hồi HTTP
import rateLimit from "express-rate-limit"; // Giới hạn tốc độ yêu cầu

const app = express();
dotenv.config();

// Middleware bảo mật
app.use(helmet());

// Middleware nén phản hồi HTTP
app.use(compression());

// Giới hạn tốc độ yêu cầu từ client
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // tối đa 100 yêu cầu trong 15 phút
});
app.use(limiter);

// Cấu hình body-parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

// Các routes và controller
app.use("/comfy", comfyRoutes);

// Kích hoạt Clustering để sử dụng tất cả lõi CPU
if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const PORT = process.env.PORT || 80;
  const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "localhost";

  app.listen(PORT, () =>
    console.log(`Server running on: http://${SERVER_ADDRESS}:${PORT}`),
  );
}
