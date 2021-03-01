// router object for all /api/posts handlers/middleware/endpoints

const express = require('express');
const posts = require('../data/db');

// creates a new standalone express router
const router = express.Router();

router.get('/api/posts', (req, res) => {
  posts.find()
    .then((posts) => res.status(200).json(posts))
    .catch(err => {
      console.log(err);
      res.status(500).json({ 
        error: "The posts information could not be retrieved." 
      })
    })
})

// router.get("/api/posts", (req, res) =>{
//     try {
//         const posts = db.find();
//         res.status(200).json(posts)
//     } catch(error) {
//         res
//             .status(500)
//             .json({ error: "The user's information could not be retrieved" });
//     }
// });

router.get('/api/posts/:id', (req, res) => {
  posts.findById(req.params.id)
    .then((post) => {
      if (post.length === 0) {
        res.status(404).json({ 
          message: "The post with the specified ID does not exist." 
        })
      } else {
        res.status(200).json(post)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
          error: "The post information could not be retrieved."
        })
    })
})

router.get('/api/posts/:id/comments', (req, res) => {
  posts.findById(req.params.id)
    .then((post) => {
      if (post.length === 0) {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      } else if (post) {
        return posts.findPostComments(req.params.id)
      }
    })
    .then((comments) => {
      res.json(comments)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "The comments information could not be retrieved."
      })
    })
})

router.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ 
      errorMessage: "Please provide title and contents for the post."
    })
  }

  posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ 
        error: "There was an error while saving the post to the database" 
      })
    })
})

router.post('/api/posts/:id/comments', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({
      errorMessage: "Please provide text for the comment."
    })
  }

  posts.insertComment({...req.body, post_id: req.params.id})
    .then(comment => {
      res.status(201).json(comment)
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the comment to the database"
      })
    })
})

router.put('/api/posts/:id', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    })
  }

  posts.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post information could not be modified."
      })
    })
})

router.delete('/api/posts/:id', (req, res) => {
  posts.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "Enemy nuke incoming, it's over"
        })
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The post could not be removed"
      })
    })
})
