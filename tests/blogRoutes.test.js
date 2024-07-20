const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Blog = require('../models/blogModel');

// Initialize Express app
app.use(express.json());
app.use('/', require('../routes/blogRoutes'));

require('dotenv').config();

// Connect to MongoDB
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear test database before each test
beforeEach(async () => {
  await Blog.deleteMany({});
});

// Close MongoDB connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Blog Routes', () => {
  it('should create a new blog', async () => {
    const response = await request(app)
      .post('/blogs')
      .send({
        imguri: 'https://via.placeholder.com/150',
        createdby: 'Test User',
        title: 'Test Blog',
        description: 'This is a test blog.',
        likes: 0,
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.blog).toHaveProperty('title', 'Test Blog');
  });

  it('should get all blogs', async () => {
    await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Test Blog',
      description: 'This is a test blog.',
      likes: 0,
    });

    const response = await request(app).get('/blogs');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.blogs).toBeInstanceOf(Array);
  });

  it('should get blog by id', async () => {
    const blog = await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Test Blog',
      description: 'This is a test blog.',
      likes: 0,
    });

    const response = await request(app).get(`/blogs/${blog._id}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.blog).toHaveProperty('title', 'Test Blog');
  });

  it('should update likes of blog by id', async () => {
    const blog = await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Test Blog',
      description: 'This is a test blog.',
      likes: 0,
    });

    const response = await request(app).post(`/blogs/${blog._id}/like`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.blog.likes).toBe(1);
  });

  it('should delete likes of blog by id', async () => {
    const blog = await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Test Blog',
      description: 'This is a test blog.',
      likes: 1,
    });

    const response = await request(app).delete(`/blogs/${blog._id}/like`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.blog.likes).toBe(0);
  });

  it('should get blogs by index', async () => {
    await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Test Blog 1',
      description: 'This is the first test blog.',
      likes: 0,
    });

    await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Test Blog 2',
      description: 'This is the second test blog.',
      likes: 0,
    });

    const response = await request(app).get('/blogs/by-index?startIndex=0&endIndex=2');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.blogs).toHaveLength(2);
  });

  it('should get first three popular blogs', async () => {
    await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Popular Blog 1',
      description: 'This is a popular blog.',
      likes: 10,
    });

    await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Popular Blog 2',
      description: 'This is another popular blog.',
      likes: 20,
    });

    await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Popular Blog 3',
      description: 'This is yet another popular blog.',
      likes: 30,
    });

    await Blog.create({
      imguri: 'https://via.placeholder.com/150',
      createdby: 'Test User',
      title: 'Less Popular Blog',
      description: 'This blog is less popular.',
      likes: 5,
    });

    const response = await request(app).get('/blogs/popular/first-three');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.blogs).toHaveLength(3);
  });
});
