const express = require('express');
const router = express.Router();
const BlogContent = require('../models/blogContent');
const BlogComments = require('../models/blogComments');

// Controller functions
const blogController = {
    // Get homepage - Display all blog posts
    async getHomePage(req, res) {
      try {
        const blogPosts = await BlogContent.findAll();
        // Render the index view with all blog posts
        res.render('index', { blogPosts });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    },
  
    // Create a new blog post
    async createPost(req, res) {
      try {
        const { blogTitle, blogAuthor, blogContent } = req.body;
        const newPost = await BlogContent.create({
          title: blogTitle,
          author: blogAuthor,
          content: blogContent,
        });
        // Redirect to the homepage after successful post creation
        res.redirect('/');
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    },
  
    // Get a specific blog post and its comments
    async getBlogPost(req, res) {
      try {
        const postId = req.params.postId;
        const blogPost = await BlogContent.findByPk(postId, {
          include: [BlogComments],
        });
        // Render the blog post view with comments
        res.render('blogPost', { blogPost });
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    },
  
    // Add a comment to a specific blog post
    async addComment(req, res) {
        try {
          const postId = req.params.postId;
          const { commentedBy, comment } = req.body;
          const blogPost = await BlogContent.findByPk(postId);
      
          if (!blogPost) {
            return res.status(404).send('Blog post not found');
          }
      
          const newComment = await BlogComments.create({
            blogContentId: postId,
            commentedBy,
            comment,
          });
      
          res.redirect(`/blog/${postId}`);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error adding comment'); // Update the error message accordingly
        }
      },
  
    // Delete a comment from a specific blog post
    async deleteComment(req, res) {
      try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        await BlogComments.destroy({
          where: {
            id: commentId,
          },
        });
        // Redirect to the blog post page after comment deletion
        res.redirect('/');
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
    },
};

module.exports = blogController; // Export the blogController object, not 'router'
