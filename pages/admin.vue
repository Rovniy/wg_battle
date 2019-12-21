<template>
  <el-container class="func_container">
    <el-main class="func_main">
      <el-button v-for="task in tasks" :key="task.id" @click="setTask(task.id)" :disabled="isTaskComplete(task.id)">
        Task {{ task.id }}
      </el-button>
    </el-main>
    <el-footer class="func_footer">
      <el-checkbox v-model="checkBox" />
      <el-button @click="clearTasks" :disabled="!checkBox" size="mini" type="danger" class="clear">
        Clear tasks
      </el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      checkBox: false,
      complete: [],
      tasks: []
    }
  },
  beforeMount () {
    this.$socket.on('COMPLETED_TASKS', (data) => {
      console.log('COMPLETED_TASKS', data)
      this.complete = data
    })
    this.$socket.on('TASKS_LIST', (data) => {
      console.log('TASKS_LIST', data)
      this.tasks = data
    })
  },
  mounted () {
    if (localStorage.getItem('name') !== process.env.ADMIN_NAME) { this.$router.push('/') }

    setTimeout(() => {
      this.$socket.emit('task', { type: 'LOGIN', name: localStorage.getItem('name') })
      this.$socket.emit('task', { type: 'GET_COMPLETED' })
    }, 1000)
  },
  methods: {
    setTask (id) {
      this.$socket.emit('task', { type: 'SET_TASK', id })
      this.complete.push({ id })
    },
    isTaskComplete (id) {
      let isHas = false
      this.complete.forEach((item) => {
        if (item.id === id) { isHas = true }
      })

      return isHas
    },
    clearTasks () {
      this.$socket.emit('task', { type: 'CLEAR_TASKS', password: 'xploit2012' })
      this.checkBox = false
    }
  }
}
</script>

<style lang="sass" scoped>
.func_container
  height: 100%

.func_main
  padding: 40px

.func_footer
  display: flex
  justify-content: flex-end
  align-items: center

  .clear
    margin: 0 0 0 20px
</style>
