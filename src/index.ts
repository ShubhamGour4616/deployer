import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

function generateSessionId() {
  const timestamp = Date.now().toString(36); 
  const randomPart = Math.random().toString(36).substr(2, 5);
  const sessionId = timestamp + randomPart; 
  return sessionId;
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express4!");
});

app.post("/", (req: Request, res: Response) => {
  const repoUrl = req.body.repoUrl;
  console.log(repoUrl);
  const sessionId = generateSessionId();
  res.send("RReceived repoUrl: " + repoUrl + ", session_id: " + sessionId);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
