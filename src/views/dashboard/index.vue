<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ JSON.stringify(name) }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { apiGetUser } from '@/api/user'

export default {
  name: 'Dashboard',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$store.dispatch('user.getUserInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
