// Vercel Serverless Function wrapper for Hono app
const { handle } = require('@hono/node-server/vercel')
const app = require('../dist/_worker.js').default

module.exports = handle(app)
