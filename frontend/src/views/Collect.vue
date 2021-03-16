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
              <h3>
                <span class="font-weight-light">Collections of </span>
                {{userName}}
              </h3>
            </div>
            <div class="mt-5 mb-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <div class="body">
                    <router-view></router-view>
                    <div @click="toAffiliation">
                      <div id="collect-container">
                        <img src="../assets/img/collect/affiliation.png" alt=""/>
                      </div>
                      <div class="des">
                        <h4>Affiliation</h4>
                        <p>Collection</p>
                      </div>
                    </div>
                    <div @click="toKeywords">
                      <div id="collect-container">
                        <img src="../assets/img/collect/keywords.png" alt=""/>
                      </div>
                      <div class="des">
                        <h4>Keyword</h4>
                        <p>Collection</p>
                      </div>
                    </div>
                    <div @click="toPublication">
                      <div id="collect-container">
                        <img src="../assets/img/collect/publication.png" alt=""/>
                      </div>
                      <div class="des">
                        <h4>Publication</h4>
                        <p>Collection</p>
                      </div>
                    </div>
                    <div @click="toAuthor">
                      <div id="collect-container">
                        <img src="../assets/img/collect/author.png" alt=""/>
                      </div>
                      <div class="des">
                        <h4>Author</h4>
                        <p>Collection</p>
                      </div>
                    </div>
                  </div>
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
        userName: 'OASIS',
        userId: '',
      }
    },
    mounted () {
      this.userName = localStorage.getItem('userName')
    },
    methods: {
      toAffiliation () {
        this.$router.push({ path: '/affiliationCollect' })
      },
      toKeywords () {
        this.$router.push({ path: '/keywordsCollect' })
      },
      toPublication () {
        this.$router.push({ path: '/publicationCollect' })
      },
      toAuthor () {
        this.$router.push({ path: '/authorCollect' })
      }
    }
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
  }

  .body {
    width: 100%;
    height: 100%;
    /* background-color: skyblue; */
    /* border: 1px solid rgba(0, 0, 0, 2); */
    margin: 10px auto;
    perspective: 300px;
  }

  .body > div {
    width: 40%;
    height: 260px;
    /* background-color: pink; */
    /* box-shadow: 2px 2px rgba(0, 0, 0, .2) ; */
    border: 1px solid rgba(0, 0, 0, .1);
    float: left;
    /* text-align: center; */
    margin: 15px 10px 0px 40px;
    transition: all 0.3s;
  }

  #collect-container {
    height: 150px;
    width: 90%;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    text-align: center;
  }

  #collect-container img {
    width: 59%;
  }

  h {
    margin-top: 75px;
  }

  .des {
    text-align: left;
    text-indent: 1.5em;
  }

  .body > div:hover {
    cursor: pointer;
    transform: translateZ(10px);
  }
</style>
