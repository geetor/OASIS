<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <oasis-card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img v-lazy="'img/theme/team-4-800x800.jpg'" class="rounded-circle">
                  </a>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>WELCOME, ADMIN!</h3>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9 uparea">
                  <form id="uploadCSV" class="oasis-btn btn-primary" enctype="multipart/form-data" method="post"
                        @submit.prevent="uploadModelFile">
                    <input type="file" name="csvFile" accept=".csv">
                    <input type="submit" class="oasis-btn btn-primary">
                  </form>
                </div>
              </div>
            </div>
          </div>
        </oasis-card>
      </div>
    </section>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'uploadCSV',
    data () {
      return {}
    },
    methods: {
      uploadModelFile: function () {
        const _this = this
        if ($('#uploadCSV input').val() === '') {
          _this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Select the file to upload!'
          })
          return
        }
        let options = {
          clearForm: true,
          url: 'http://47.100.55.51:3180/upload/csvFile',
          success: function (res) {
            const statusCode = res.status.code
            if (statusCode === '0000') {
              _this.$notify({
                position: 'bottom-right',
                type: 'success',
                title: res.status.msg
              })
            } else {
              _this.$notify({
                position: 'bottom-right',
                type: 'warning',
                title: res.status.msg
              })
            }
          },
          error: function (err) {
            _this.$notify({
              position: 'bottom-right',
              type: 'danger',
              title: 'Fail to upload!'
            })
          }
        }
        $('#uploadCSV').ajaxSubmit(options)
        return false
      }
    }
  }
</script>
<style>
  .uparea {
    width: 300px;
    height: 100px;
  }

  .uploadbtn {
    margin: 30px auto;
    height: 60px;
  }

  .sub {
    margin-left: 10px;
  }
</style>
