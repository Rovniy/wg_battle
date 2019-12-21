<template>
  <el-row class="header">
    <el-col :span="6" class="logo">
      <img src="wargaming_net.png" alt="wg_logo">
    </el-col>
    <el-col :span="12" class="title">
      <h1>{{ title }}</h1>
    </el-col>
    <el-col :span="6" class="status">
      <h3>
        <span class="timer">{{ timerCountdown }}</span>
      </h3>
      <h3>
        <span v-if="pong && pong !== 1" class="connected">(connected)</span>
        <span v-else-if="pong === 1" class="wait">(waiting for connection...)</span>
        <span v-else class="error">(error)</span>
      </h3>
    </el-col>
    <div />
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      title: process.env.ROOM,
      pong: 1,
      interval: null,
      time: 0,
      timer: null
    }
  },
  computed: {
    timerCountdown () {
      let minutes = parseInt(this.time / 60, 10)
      let seconds = parseInt(this.time % 60, 10)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds

      return `${minutes} : ${seconds}`
    }
  },
  beforeMount () {
    this.$socket.on('pong', () => {
      this.pong = true
      clearInterval(this.interval)
      this.startTimer()
    })
    this.$socket.on('INCOMING_TASK', () => {
      clearInterval(this.timer)
      this.time = 60 * 5
      this.startTimeout()
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
    },
    startTimeout () {
      this.timer = setInterval(() => {
        this.time--

        if (this.time <= 0) { clearInterval(this.timer) }
      }, 1000)
    }
  }
}
</script>

<style lang="sass" scoped>
$height: 60px
$padding: 20px

.header
  height: $height
  padding: 10px 20px

  .logo
    height: calc(#{$height} - #{$padding})

    img
      max-height: calc(#{$height} - #{$padding})
      cursor: pointer

  .title
    height: calc(#{$height} - #{$padding})
    display: flex
    justify-content: center
    align-items: center

    h1
      font-size: 24px
      color: #656565

  .status
    height: calc(#{$height} - #{$padding})
    display: flex
    justify-content: flex-end
    align-items: center

    h3
      display: block
      text-align: right
      margin: 0 0 0 10px
      font-size: 14px

      .timer
        color: darkred
      .connected
        color: green
      .wait
        color: orange
      .error
        color: red

    .exit
      margin: 0 0 0 10px
</style>
