const express = require("express");
const shortid = require("shortid");
const server = express();
server.use(express.json());

let users = [];

server.get("/", (req, res) => {
  res.status(200).json({ message: "GET / is working " });
});

// GET /api/users
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET /api/users/:id

// POST /api/user
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: `Please provide name and bio for new user!` });
  } else {
    const userInfo = req.body;
    userInfo.id = shortid.generate();
    users.push(userInfo);
    res.status(201).json(userInfo);
  }
});

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n** Server is listening on http://localhost:${PORT} **\n`)
);
