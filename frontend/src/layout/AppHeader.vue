<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/" @click.native="toHome">
        <img src="../assets/img/brand/rua.png" alt="logo">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img src="../assets/img/brand/rua-blue.png">
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">Search</span>
          </a>
          <div class="dropdown-menu-inner">
            <router-link to="/searchObj"
                         class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-spaceship"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">Search objects</h6>
                <p class="description d-none d-md-inline-block mb-0">Start to get the list of conferences, authors,
                  keywords and afflications which satisfy you.</p>
              </div>
            </router-link>
            <router-link to="/searchPaper"
                         class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                <i class="ni ni-ui-04"></i>
              </div>
              <div class="media-body ml-3">
                <h5 class="heading text-warning mb-md-1">Search papers</h5>
                <p class="description d-none d-md-inline-block mb-0">Get all the papers by paper name, author name,
                  afflication or time according to your input.</p>
              </div>
            </router-link>
          </div>
        </base-dropdown>
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">
                <span>Rank System</span>
            </span>
          </a>
          <router-link to="/rankSystem1" class="dropdown-item"><span>Afflication rank</span></router-link>
          <router-link to="/rankSystem2" class="dropdown-item"><span>Author rank</span></router-link>
          <router-link to="/rankSystem3" class="dropdown-item"><span>Keyword rank</span></router-link>
        </base-dropdown>
        <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
          <i class="ni ni ni-compass-04 d-lg-none"></i>
          <span class="nav-link-inner--text">
                <span @click="toAbout">About</span>
            </span>
        </a>
      </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto" v-if="isLogin">
        <li class="nav-item">
          <router-link class="nav-link nav-link-icon" to="/login"
                       rel="noopener" data-toggle="tooltip" title="Login">
            <i class="ni ni-key-25 text-pink"></i>
            <span class="nav-link-inner--text">Login</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link nav-link-icon" to="/register"
                       rel="noopener" data-toggle="tooltip" title="Register">
            <i class="ni ni-circle-08 text-pink"></i>
            <span class="nav-link-inner--text">Register</span>
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav align-items-center ml-lg-auto" v-else>
        <li class="oasis-btn btn-neutral btn-icon">
          <base-dropdown>
            <div class="media" slot="title">
              <div class="media-body">
                <span class="nav-link-inner--text">{{userName}}</span>
              </div>
            </div>
            <template>
              <div class=" dropdown-header noti-title">
                <h6 class="text-overflow m-0">Welcome!</h6>
              </div>
              <router-link to="/profile" class="dropdown-item">
                <i class="ni ni-single-02"></i>
                <span>Profile</span>
              </router-link>
              <router-link to="/collect" class="dropdown-item">
                <i class="ni ni-settings-gear-65"></i>
                <span>Collections</span>
              </router-link>
              <router-link to="/recent" class="dropdown-item">
                <i class="ni ni-calendar-grid-58"></i>
                <span>Recent View</span>
              </router-link>
              <router-link v-if="isManager" to="/uploadCSV" class="dropdown-item">
                <i class="ni ni-support-16"></i>
                <span>Upload CSV</span>
              </router-link>
              <div class="dropdown-divider"></div>
              <div @click="logOut" class="dropdown-item">
                <i class="ni ni-user-run"></i>
                <span>Logout</span>
              </div>
            </template>
          </base-dropdown>
        </li>
      </ul>
    </base-nav>
  </header>
</template>
<script>
  import BaseNav from '@/components/BaseNav'
  import BaseDropdown from '@/components/BaseDropdown'
  import CloseButton from '@/components/CloseButton'

  export default {
    inject: ['reload'],
    components: {
      BaseNav,
      CloseButton,
      BaseDropdown
    },
    data () {
      return {
        isLogin: true,
        isManager: false,
        userName: 'OASIS'
      }
    },
    mounted () {
      let userId = localStorage.getItem('userId')
      if (userId != null) {
        this.isLogin = false
      }
      this.userName = localStorage.getItem('userName')
      this.isManager = this.userName === 'admin'
    },
    watch: {
      '$route' (to, from) {
        let userId = localStorage.getItem('userId')
        if (userId != null) {
          this.isLogin = false
        }
        this.userName = localStorage.getItem('userName')
        this.isManager = this.userName === 'admin'
      }
    },
    methods: {
      toHome () {
        this.reload()
      },
      toAbout () {
        this.$router.push('/about')
      },
      logOut () {
        localStorage.removeItem('userId')
        localStorage.removeItem('userName')
        this.$router.go(0)
      }
    }
  }
</script>
<style>
  .navhov {
    color: rgba(255, 255, 255, 0.95);
  }

  .navhov:hover {
    color: rgba(255, 255, 255, 0.65);
  }
</style>
