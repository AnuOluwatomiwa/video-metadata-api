import express from "express";
import dotenv from "dotenv";
import videoRoutes from "./routes/videoRoutes.ts"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
