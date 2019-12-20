<template>
  <div class="container">
    <h3>
      Status:
      <span v-if="pong && pong !== 1">OK</span>
      <span v-else-if="pong === 1">WAIT CONNECTION...</span>
      <span v-else>ERROR</span>
    </h3>
    <h1>{{ task }}</h1>
  </div>
</template>

<script>
import socket from '@/plugins/socket.io.js'

const startMsg = 'Привет. Здесь будут появляться задания'

export default {
  data () {
    return {
      task: startMsg,
      pong: 1,
      interval: null
    }
  },
  beforeMount () {
    socket.on('task', (data) => {
      this.task = data.msg
    })
    socket.on('completed-tasks', (data) => {
      if (data.length === 0) {
        this.task = startMsg
      }
    })
    socket.on('pong', () => {
      this.pong = true
      clearInterval(this.interval)
      this.startTimer()
    })
  },
  mounted () {
    this.startTimer()
  },
  methods: {
    startTimer () {
      this.interval = setInterval(() => {
        this.pong = false
      }, 40000)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100vw
  height: 100vh
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column

  h1
    max-width: 70%
    text-align: center

  h3
    display: block
    width: 100%
    max-width: 70%
    text-align: center
</style>
