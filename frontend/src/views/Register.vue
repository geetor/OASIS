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
                <small>Sign up with credentials</small>
              </div>
              <form role="form">
                <base-input alternative
                            class="mb-3"
                            placeholder="Name"
                            v-model="userName"
                            @blur="checkUserName(userName)"
                            addon-left-icon="ni ni-hat-3">
                </base-input>
                <base-input alternative
                            class="mb-3"
                            v-model="email"
                            placeholder="Email"
                            @blur="checkEmail(email)"
                            addon-left-icon="ni ni-email-83">
                </base-input>
                <base-input alternative
                            type="password"
                            v-model="password"
                            placeholder="Password"
                            @blur="checkPassword(password)"
                            addon-left-icon="ni ni-lock-circle-open">
                </base-input>
                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="register()">Create account</base-button>
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
    name: 'register',
    data () {
      return {
        userName: '',
        email: '',
        password: ''
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        if (localStorage.getItem('userId') != null) {
          this.$router.push('/')
        }
      },
      checkUserName (userName) {
        const min = 5, max = 12
        let len = userName.length
        if (len === 0) {
          this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input Error',
            message: 'UserName should not be empty!',
            showClose: false
          })
          return false
        } else if (len < min || max < len) {
          this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input Error',
            message: 'Length to be between ' + min + ' to ' + max + '.',
            showClose: false
          })
          return false
        } else {
          return true
        }
      },
      checkEmail (email) {
        let mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (email.match(mailFormat)) {
          return true
        } else {
          this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input Error',
            message: 'Entered an invalid email!',
            showClose: false
          })
          return false
        }
      },
      checkPassword (password) {
        const min = 8, max = 20
        if (password == null || password === '') {
          this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input Error',
            message: 'Password is required!',
            showClose: false
          })
          return false
        } else if (password.length < min || max < password.length) {
          this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input Error',
            message: 'Length to be between ' + min + ' to ' + max + '.',
            showClose: false
          })
          return false
        } else {
          return true
        }
      },
      register: function () {
        if (this.checkUserName(this.userName) && this.checkEmail(this.email) && this.checkPassword(this.password)) {
          const _this = this
          this.$axios.post('http://47.100.55.51:3180/user/register', {
            userName: this.userName,
            password: this.password,
            email: this.email,
            profession: ''
          }).then(function (response) {
            const statusCode = response.data.status.code
            if (statusCode === '0000') {
              _this.$notify({
                position: 'bottom-right',
                type: 'success',
                title: 'Succeed to register!'
              })
              _this.$router.push({ name: 'login' })
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
              title: 'Fail to register!'
            })
          })
        }
      }
    }
  }
</script>
<style>
</style>
