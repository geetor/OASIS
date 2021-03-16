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
            <div class="container-fluid">
                <div class="col">
                  <keywords-table title="Star Keywords"></keywords-table>
                </div>
            </div>

          </div>
        </oasis-card>
      </div>
    </section>
  </div>
</template>
<script>
  import KeywordsTable from '../Tables/KeywordsTable'

  export default {
    name: 'keywordsStarList',
    data () {
      return {}
    },
    components: {
      KeywordsTable
    },
    methods: {
    }
  }
</script>
<style>
</style>
