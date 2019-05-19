<template>
  <div>
    <h1>1-2</h1>
    <el-button @click="gonext">去1-3</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    gonext() {
      this.$router.push("/userpower1/1-3");
    }
  }
};
</script>

<style>
</style>
