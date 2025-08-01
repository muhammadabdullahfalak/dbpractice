import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/books", require("./routes/bookRoutes").default);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
