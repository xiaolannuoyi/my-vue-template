<template>
  <div>
    <h1>2-1</h1>
    <el-button @click="gonext">去2-2</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    gonext() {
      this.$router.push("/userpower2/2-2");
    }
  }
};
</script>

<style>
</style>
