// Vercel Serverless Function for Hono app
const path = require('path');
const fs = require('fs');

// Load the built worker
const workerPath = path.join(__dirname, '../dist/_worker.js');

module.exports = async (req, res) => {
  try {
    // Import the Hono app
    const app = require(workerPath).default;
    
    // Create a Request object from Vercel request
    const url = `https://${req.headers.host}${req.url}`;
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });
    
    // Call Hono app
    const response = await app.fetch(request, {});
    
    // Convert Response to Vercel response
    const body = await response.text();
    res.status(response.status);
    
    // Set headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    res.send(body);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};
