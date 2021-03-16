import Vue from 'vue'
import Router from 'vue-router'
import AppHeader from './layout/AppHeader'
import AppFooter from './layout/AppFooter'
import Components from './views/Components.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Profile from './views/Profile.vue'
import About from './views/about.vue'
import searchPaper from './views/Search.vue'
import afflication from './views/AfflicationDetail.vue'
import author from './views/AuthorDetail.vue'
import conference from './views/CoferenceDetail.vue'
import keyword from './views/keywordDetail.vue'
import searchObj from './views/SearchObj.vue'
import interest from './views/interest.vue'
import UploadCSV from './views/UploadCSV.vue'
import Collect from './views/Collect.vue'
import AuthorCollect from './views/collects/AuthorCollect.vue'
import AffiliationCollect from './views/collects/AffiliationCollect.vue'
import PublicationCollect from './views/collects/PublicationCollect.vue'
import KeywordsCollect from './views/collects/KeywordsCollect.vue'
import Recent from './views/Recent.vue'
import echartsAuthor from './views/echartsAuthor.vue'
import rankSystem1 from './views/rankSystem.vue'
import rankSystem2 from './views/rankSystem2.vue'
import rankSystem3 from './views/rankSystem3.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/searchObj',
      name: 'searchObj',
      components: {
        header: AppHeader,
        default: searchObj,
        footer: AppFooter
      }
    },
    {
      path: '/component',
      name: 'components',
      components: {
        header: AppHeader,
        default: Components,
        footer: AppFooter
      }
    },
    {
      path: '/',
      redirect: '/searchObj'
    },
    {
      path: '/login',
      name: 'login',
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: '/interest',
      name: 'interest',
      components: {
        header: AppHeader,
        default: interest,
        footer: AppFooter
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        header: AppHeader,
        default: Profile,
        footer: AppFooter
      }
    },
    {
      path: '/about',
      name: 'about',
      components: {
        header: AppHeader,
        default: About,
        footer: AppFooter
      }
    },
    {
      path: '/searchPaper',
      name: 'searchPaper',
      components: {
        header: AppHeader,
        default: searchPaper,
        footer: AppFooter
      }
    },

    {
      path: '/afflication/:id',
      name: 'afflication',
      components: {
        header: AppHeader,
        default: afflication,
        footer: AppFooter
      }
    },
    {
      path: '/author/:id',
      name: 'author',
      components: {
        header: AppHeader,
        default: author,
        footer: AppFooter
      }
    },
    {
      path: '/conference/:id',
      name: 'conference',
      components: {
        header: AppHeader,
        default: conference,
        footer: AppFooter
      }
    },
    {
      path: '/keyword/:id',
      name: 'keyword',
      components: {
        header: AppHeader,
        default: keyword,
        footer: AppFooter
      }
    },
    {
      path: '/uploadCSV',
      name: 'uploadCSV',
      components: {
        header: AppHeader,
        default: UploadCSV,
        footer: AppFooter
      }
    },
    {
      path: '/collect',
      name: 'collect',
      components: {
        header: AppHeader,
        default: Collect,
        footer: AppFooter
      }
    },
    {
      path: '/authorCollect',
      name: 'authorCollect',
      components: {
        header: AppHeader,
        default: AuthorCollect,
        footer: AppFooter
      }
    },
    {
      path: '/affiliationCollect',
      name: 'affiliationCollect',
      components: {
        header: AppHeader,
        default: AffiliationCollect,
        footer: AppFooter
      }
    },
    {
      path: '/publicationCollect',
      name: 'publicationCollect',
      components: {
        header: AppHeader,
        default: PublicationCollect,
        footer: AppFooter
      }
    },
    {
      path: '/keywordsCollect',
      name: 'keywordsCollect',
      components: {
        header: AppHeader,
        default: KeywordsCollect,
        footer: AppFooter
      }
    },
    {
      path: '/recent',
      name: 'recent',
      components: {
        header: AppHeader,
        default: Recent,
        footer: AppFooter
      }
    },
    {
      path: '/echartsAuthor/:id',
      name: 'echartsAuthor',
      components: {
        header:AppHeader,
        default: echartsAuthor,
        footer:AppFooter
      }
    },
    {
      path: '/rankSystem1',
      name: 'rankSystem1',
      components: {
        header: AppHeader,
        default: rankSystem1,
        footer: AppFooter
      }
    },
    {
      path: '/rankSystem2',
      name: 'rankSystem2',
      components: {
        header: AppHeader,
        default: rankSystem2,
        footer: AppFooter
      }
    },
    {
      path: '/rankSystem3',
      name: 'rankSystem3',
      components: {
        header: AppHeader,
        default: rankSystem3,
        footer: AppFooter
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  }
})
