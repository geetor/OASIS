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
      <div class="container-fluid mt--300" v-if="!editing">
        <div class="row justify-content-center">
          <div class="col-xl-8 order-xl-1">
            <oasis-card shadow>
              <div slot="header" class="border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My account</h3>
                  </div>
                  <div class="col-4 text-right">
                    <button class="oasis-btn btn-sm btn-primary" @click="editProfile">Edit profile</button>
                  </div>
                </div>
              </div>
              <template>
                <form>
                  <!-- Recommendation -->
                  <div v-if="isStarAuthor">
                    <h6 class="heading-small text-muted mb-4">Recommendation</h6>
                    <div class="pl-lg-4">
                      <div class="row">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-2">
                          <base-input input-classes="form-control-alternative"
                                      v-model="recAuthors[0].authorName"
                                      @click="authorDetail(recAuthors[0].authorId)"
                          />
                        </div>
                        <div class="col-lg-2">
                          <base-input input-classes="form-control-alternative"
                                      v-model="recAuthors[1].authorName"
                                      @click="authorDetail(recAuthors[1].authorId)"
                          />
                        </div>
                        <div class="col-lg-2">
                          <base-input input-classes="form-control-alternative"
                                      v-model="recAuthors[2].authorName"
                                      @click="authorDetail(recAuthors[2].authorId)"
                          />
                        </div>
                        <div class="col-lg-2">
                          <base-input input-classes="form-control-alternative"
                                      v-model="recAuthors[3].authorName"
                                      @click="authorDetail(recAuthors[3].authorId)"
                          />
                        </div>
                        <div class="col-lg-2">
                          <base-input input-classes="form-control-alternative"
                                      v-model="recAuthors[4].authorName"
                                      @click="authorDetail(recAuthors[4].authorId)"
                          />
                        </div>
                      </div>
                    </div>
                    <hr class="my-4"/>
                  </div>
                  <h6 class="heading-small text-muted mb-4">User Information</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-lg-6">
                        <base-input label="Username"
                                    placeholder="Username"
                                    readonly="true"
                                    input-classes="form-control-alternative"
                                    v-model="userData.userName"
                        />
                      </div>
                      <div class="col-lg-6">
                        <base-input label="Email"
                                    placeholder="jesse@example.com"
                                    readonly="true"
                                    input-classes="form-control-alternative"
                                    v-model="userData.email"
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-6">
                        <base-input label="Profession"
                                    placeholder="Teacher or Student"
                                    readonly="true"
                                    input-classes="form-control-alternative"
                                    v-model="userData.profession"
                        />
                      </div>
                      <div class="col-lg-6">
                        <base-input label="Organization"
                                    placeholder="Organization"
                                    readonly="true"
                                    input-classes="form-control-alternative"
                                    v-model="userData.organization"
                        />
                      </div>
                    </div>
                  </div>
                  <hr class="my-4"/>
                  <!-- Phone -->
                  <h6 class="heading-small text-muted mb-4">Contact Information</h6>
                  <div class="pl-lg-4">
                    <div class="row">
                      <div class="col-md-12">
                        <base-input label="Phone"
                                    placeholder="Phone"
                                    readonly="true"
                                    input-classes="form-control-alternative"
                                    v-model="userData.phone"
                        />
                      </div>
                    </div>
                  </div>
                  <hr class="my-4"/>
                  <!-- Motto -->
                  <h6 class="heading-small text-muted mb-4">About Me</h6>
                  <div class="pl-lg-4">
                    <div class="form-group">
                      <base-input label="Motto">
                      <textarea rows="4" class="form-control form-control-alternative"
                                placeholder="A few words about you ..." readonly>{{userData.motto}}</textarea>
                      </base-input>
                    </div>
                  </div>
                </form>
              </template>
            </oasis-card>
          </div>
        </div>
      </div>

      <div class="container">
        <oasis-card shadow v-if="editing" class="card-profile mt--300" no-body>
          <div class="px-4">
            <!-- <div class="row justify-content-center">
            </div> -->
            <div class="text-center mt-5">
              <div style="margin: 20px;"></div>
              <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
                <el-form-item label="Email">
                  <el-input v-model="userData.email"></el-input>
                </el-form-item>
                <el-form-item label="Profession">
                  <el-input v-model="userData.profession"></el-input>
                </el-form-item>
                <el-form-item label="Organization">
                  <el-input v-model="userData.organization"></el-input>
                </el-form-item>
                <el-form-item label="Phone">
                  <el-input v-model="userData.phone"></el-input>
                </el-form-item>
                <el-form-item label="Motto">
                  <el-input v-model="userData.motto"></el-input>
                </el-form-item>
              </el-form>
              <!-- <h3>{{userData.userName}}
                  <span class="font-weight-light">, {{userData.profession}}</span>
              </h3>
              <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>phone： </div>
              <div class="h6 mt-4"><i class="ni business_briefcase-24 mr-2"></i>email: {{userData.email}}</div>
              <div><i class="ni education_hat mr-2"></i>{{userData.organization}}</div> -->
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <base-button type="info" @click="updateProfile">Confirm</base-button>
                  <template>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
                  <base-button type="success" @click="noEditing">Back</base-button>
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
  export default {
    name: 'collect',
    data () {
      return {
        userData: {},
        recAuthors: [],
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        editing: false,
        isStarAuthor: false
      }
    },
    mounted () {
      const _this = this
      this.$axios.get('http://47.100.55.51:3180/user/getProfile', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(function (response) {
        _this.userData = response.data.data
        for (var o in _this.userData) {
          if (_this.userData[o] == null || _this.userData[o] == '') {
            _this.userData[o] = 'Please complete it as soon as possible!'
          }
        }
      }).catch(function (error) {
        _this.$notify({
          position: 'bottom-right',
          type: 'danger',
          title: error
        })
      })

      this.$axios.get('http://47.100.55.51:3180/user/getInterestByHistory', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(function (response) {
        console.log(response)
        const statusCode = response.data.status.code
        if (statusCode === '0000') {
          const authorEntity = response.data.data
          _this.recAuthors = _this.recAuthors.concat(authorEntity)
          _this.isStarAuthor = true
        }
      }).catch(function (error) {
        _this.$notify({
          position: 'bottom-right',
          type: 'danger',
          title: 'Fail to get Recommended Authors!'
        })
      })
    },
    methods: {
      editProfile: function () {
        this.editing = true
      },
      updateProfile: function () {
        const _this = this
        _this.userData['userId'] = localStorage.getItem('userId')

        //表单验证
        if (_this.userData.email.trim() == '') {
          _this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Email is not allowed to be null!'
          })
          return
        } else if (_this.userData.email.indexOf('@') == -1) {
          _this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input a valid email format!'
          })
          return
        }
        if (_this.userData.phone.trim() == '') {
          _this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input a valid phone format!'
          })
          return
        }
        if (isNaN(_this.userData.phone)) {
          _this.$notify({
            position: 'bottom-right',
            type: 'warning',
            title: 'Input a valid phone format!'
          })
          return
        }
        this.$axios.post('http://47.100.55.51:3180/user/editProfile', _this.userData).then(function (response) {
          const statusCode = response.data.status.code
          if (statusCode === '0000') {
            _this.$notify({
              position: 'bottom-right',
              type: 'success',
              title: 'Succeed to edit profile!'
            })
            _this.userData = response.data.data
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
            title: error
          })
        })
        this.editing = false
      },
      noEditing () {
        this.editing = false
      },
      authorDetail (authorId) {
        this.$router.push('/author/' + authorId)
      }
    }
  }
</script>
<style>
</style>
