<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {}
}
</script>

<template>
  <div>
    这是子组件
    <div>
      <div><slot name="header">1</slot></div>
      <div><slot name="main">2</slot></div>
      <div><slot title="这是title" desc="这是desc">3</slot></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
