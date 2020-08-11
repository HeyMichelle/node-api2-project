// Separate the endpoints that begin with /api/posts into a separate Express Router.

const express = require('express');

const postsRouter = require('./routers/posts-router');
// const cors = require('cors');
// server.use(cors());

const server = express();
const PORT = 2020;

server.use(express.json());
server.use(welcomeRouter);
server.use(postsRouter);

server.get('/', (req, res) => {
	res.status(200).json({ message: 'success, server running' })
  })
  

server.listen(PORT, () => {
  console.log(`\n*** Server running on http://localhost:${PORT} ***\n`);
});