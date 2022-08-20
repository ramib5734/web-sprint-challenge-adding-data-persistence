// build your server here and require it from index.js
const express = require('express')

const projectsRouter = require('./../api/project/router')
const resourceRouter = require('./../api/resource/router')
const taskRouter = require('./../api/task/router')

const server = express()

server.use(express.json())
server.use('/api/projects', projectsRouter)
server.use('/api/resources', resourceRouter)
server.use('/api/tasks', taskRouter)

server.use('*', (req, res) => {
  res
    .status(404)
    .json({ message: `${req.method} ${req.baseUrl} cannot be found` })
})

module.exports = server