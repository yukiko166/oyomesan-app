import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  const history = req.body.history;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5",
      input: history
    })
  });

  const data = await response.json();
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
