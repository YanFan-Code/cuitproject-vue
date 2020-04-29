<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app",
  components: {
  },
  mounted(){
    window.addEventListener('unload',this.saveState)
  },
  methods:{
    saveState(){
      sessionStorage.setItem('state',JSON.stringify(this.$store.state))
    }
  }
}
</script>

<style scoped>
</style>
