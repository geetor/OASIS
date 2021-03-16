<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <oasis-card type="secondary" shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-5"
                      class="border-0">
            <template>
              <div class="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <form role="form">
                <base-input alternative
                            class="mb-3"
                            placeholder="UserName"
                            v-model="userName"
                            addon-left-icon="ni ni-hat-3">
                </base-input>
                <base-input alternative
                            type="password"
                            placeholder="Password"
                            v-model="password"
                            addon-left-icon="ni ni-lock-circle-open">
                </base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="login()">Sign In</base-button>
                </div>
              </form>
            </template>
          </oasis-card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    name: 'login',
    data () {
      return {
        userName: '',
        password: '',
        timeStamp: 0
      }
    },
    created: function () {
      this.init()
    },
    methods: {
      init () {
        if (localStorage.getItem('userId') != null) {
          this.$router.push('/')
        }
      },
      login: function () {
        this.timeStamp = new Date().getTime()
        const _this = this
        if (this.userName === '') {
          this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input Error',
            message: 'UserName should not be empty!',
            showClose: false
          })
          return false
        }
        if (this.password === '') {
          this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input Error',
            message: 'Password is required!',
            showClose: false
          })
          return false
        }
        this.$axios.post('http://47.100.55.51:3180/user/login', {
          userName: _this.userName,
          password: _this.password,
          time: _this.timeStamp
        }).then(function (response) {
          const statusCode = response.data.status.code
          if (statusCode === '0000') {
            localStorage.setItem('userId', response.data.data)
            localStorage.setItem('userName', _this.userName)
            _this.$notify({
              position: 'bottom-right',
              type: 'success',
              title: 'Welcome, ' + _this.userName + ' !'
            })
            _this.$router.push('/')
          } else {
            const wrongMsg = response.data.status.msg
            _this.$notify({
              position: 'bottom-right',
              type: 'warning',
              title: wrongMsg
            })
          }
        }).catch(function (error) {
          _this.$notify({
            position: 'bottom-right',
            type: 'danger',
            title: 'Fail to login!'
          })
        })
      }
    }
  }
</script>
<style>
</style>
