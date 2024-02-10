import express, { Request, Response } from "express";
import simpleGit from "simple-git";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

function generateSessionId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  const sessionId = timestamp + randomPart;
  return sessionId;
}

app.get("/", async (req: Request, res: Response) => {
  const repoUrl = "https://github.com/ShubhamGour4616/deployer.git";
  const id = generateSessionId();
  const clonePath = `repos/${id}`;
  try {
    await simpleGit().clone(repoUrl, clonePath, { "--branch": "master" });
    res.json({
      id: id,
      message: "Repository cloned successfully!",
    });
  } catch (error) {
    res.status(500).send(`Failed to clone repository: ${error}`);
  }
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
