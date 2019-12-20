<template>
  <el-container>
    <el-button @click="setTask(1)" :class="{'asd': isTaskComplete(1)}" :disabled="isTaskComplete(1)">
      Задание 1
    </el-button>
    <el-button @click="setTask(2)" :class="{'asd': isTaskComplete(2)}" :disabled="isTaskComplete(2)">
      Задание 2
    </el-button>
    <el-button @click="setTask(3)" :class="{'asd': isTaskComplete(3)}" :disabled="isTaskComplete(3)">
      Задание 3
    </el-button>
    <el-button @click="setTask(4)" :class="{'asd': isTaskComplete(4)}" :disabled="isTaskComplete(4)">
      Задание 4
    </el-button>
    <el-button @click="clearTasks" size="small">
      Clear tasks
    </el-button>
  </el-container>
</template>

<script>
import socket from '@/plugins/socket.io.js'

export default {
  data () {
    return {
      complete: []
    }
  },
  computed: {},
  beforeMount () {
    socket.on('completed-tasks', (task) => {
      console.log(123)
      console.log('completed-tasks', task)
      this.complete = task
    })
  },
  mounted () {
    setTimeout(() => {
      socket.emit('task', { type: 'get-completed' })
    }, 2000)
  },
  methods: {
    setTask (id) {
      socket.emit('task', { type: 'msg', msg: id })
      this.complete.push(id)
    },
    isTaskComplete (id) {
      return this.complete.includes(id)
    },
    clearTasks () {
      socket.emit('task', { type: 'clear', password: 'xploit2012' })
    }
  },
  head: {
    title: 'Nuxt.js with Socket.io'
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html {
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
  }
  html, input {
    font-family:
      "HelveticaNeue-Light",
      "Helvetica Neue Light",
      "Helvetica Neue",
      Helvetica,
      Arial,
      "Lucida Grande",
      sans-serif;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
    word-wrap: break-word;
  }
  /* Pages */
  .pages {
    height: 100%;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .page {
    height: 100%;
    position: absolute;
    width: 100%;
  }
  /* Font */
  .messages {
    font-size: 150%;
  }
  .inputMessage {
    font-size: 100%;
  }
  .log {
    color: gray;
    font-size: 70%;
    margin: 5px;
    text-align: center;
  }
  /* Messages */
  .chatArea {
    height: 100%;
    padding-bottom: 60px;
  }
  .messages {
    height: 100%;
    margin: 0;
    overflow-y: scroll;
    padding: 10px 20px 10px 20px;
  }
  /* Input */
  .inputMessage {
    border: 10px solid #3B8070;
    bottom: 0;
    height: 60px;
    left: 0;
    outline: none;
    padding-left: 10px;
    position: absolute;
    right: 0;
    width: 100%;
  }
</style>
