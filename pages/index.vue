<template>
  <div class="container">
    <h1>{{ task.text }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      task: {
        text: process.env.INTRO_TEXT
      },
      pong: 1
    }
  },
  beforeMount () {
    this.$socket.on('INCOMING_TASK', (data) => {
      console.log('INCOMING_TASK', data)
      this.task = data
    })
    this.$socket.on('COMPLETED_TASKS', (data) => {
      console.log('COMPLETED_TASKS', data)
      if (data.length === 0) {
        this.task = {
          text: process.env.INTRO_TEXT
        }
      }
    })
    this.$socket.on('GET_LAST_TASK', (data) => {
      console.log('GET_LAST_TASK', data)
      this.task = data
    })
  },
  mounted () {
    setTimeout(() => {
      this.$socket.emit('task', { type: 'GET_LAST_TASK' })
    }, 1000)
  }
}
</script>

<style lang="sass" scoped>
  .container
    width: 100vw
    height: calc(100vh - 60px)
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column

    h1
      max-width: 70%
      text-align: center
</style>
