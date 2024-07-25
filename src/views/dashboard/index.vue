<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
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
      apiGetUser()
        .then((res) => {
          this.userInfo = res.data
          this.$store.commit('user/setHeadPort', { staffPhoto: res.data.staffPhoto, username: res.data.username })
        })
        .catch(() => {
          console.log('失败1')
        })
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
