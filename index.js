const express = require("express");
const shortid = require("shortid");
const server = express();
server.use(express.json());

let users = [];
let currentId = 1;

server.get("/", (req, res) => {
  res.status(200).json({ message: "GET / is working " });
});

// GET /api/users
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// GET /api/users/:id
server.get("/api/users/:id", (req, res) => {
  let _id = +req.params.id;

  const user = users.find(({ id }) => id === _id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// POST /api/user
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: `Please provide name and bio for new user!` });
  } else {
    const userInfo = req.body;
    userInfo.id = currentId++;
    users.push(userInfo);
    res.status(201).json(userInfo);
  }
});

// DELETE
server.delete("/api/users/:id", (req, res) => {
  let _id = +req.params.id;
  const user = users.find(({ id }) => id === _id);
  if (!user) {
    res.status(404).json({
      message: `User not found`
    });
  } else {
    users = users.filter(i => i.id !== _id);
    res.status(200).json({
      message: `Deleted`,
      user
    });
  }
});

// PATCH

const PORT = 5000;
server.listen(PORT, () =>
  console.log(`\n** Server is listening on http://localhost:${PORT} **\n`)
);
