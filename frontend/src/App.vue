<template>
  <div id="app">
    <router-view name="header"></router-view>

    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view v-if="isRouterAlive"></router-view>
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
  import { FadeTransition } from 'vue2-transitions'

  export default {
    components: {
      FadeTransition
    },
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>
