const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
let completedTasks = []
let users = []

const addUser = (socket) => {
  let isUser = false
  users.forEach(user => {
    if (user.id === socket.id) isUser = true
  })

  if (!isUser) users.push({
    id: socket.id,
  })
}
io.on('connection', function (socket) {
  console.log('a user connected', socket.id)

  addUser(socket)

  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  socket.on('task', function (data) {
    switch (data.type) {
      case 'msg':
        console.log('msg', data.msg)
        completedTasks.push(data.msg)
        socket.broadcast.emit('task', data)
        break
      case 'clear':
        if (data.password === 'xploit2012') {
          console.log('clear')
          completedTasks = []
          socket.broadcast.emit('completed-tasks', [])
          socket.emit('completed-tasks', [])
        }
        break
      case 'get-completed':
        console.log('completed-tasks')
        socket.broadcast.emit('completed-tasks', completedTasks)
        break
      default:
        break
    }
  })
})

http.listen(3001, function () {
  console.log('listening on *:3001')
})
