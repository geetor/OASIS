<template>
  <div class="oasis-card shadow">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">
            {{title}}
          </h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  tbody-classes="list"
                  :data="tableData">
        <template slot="columns">
          <th>Name</th>
          <th>H-Index</th>
          <th>Reference</th>
          <th>Article Num</th>
          <th>Department</th>
          <th>Cancel</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row" @click="toAuthorDetail(row.id)">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.hindex}}
          </td>
          <td>
            <div class="d-flex align-items-center">
              {{row.reference}}
            </div>
          </td>
          <td>
            <div class="d-flex align-items-center">
              {{row.articleNum}}
            </div>
          </td>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
          <td class="text-right" @click="delTheAuthor(row.id)">
            <div class="d-flex align-items-center">
              <base-button type="danger" size="sm">Cancel</base-button>
            </div>
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    name: 'author-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data () {
      return {
        tableData: []
      }
    },
    mounted () {
      let _this = this
      this.$axios.post('http://47.100.55.51:3180/user/getSavedEntityByType', {
        userId: localStorage.getItem('userId'),
        entityType: 0
      }).then(function (response) {
        let staredAuthorIds = response.data.data
        staredAuthorIds.forEach(function (staredAuthorId) {
          _this.addAuthorInfo(staredAuthorId)
        })
      })
    },
    methods: {
      addAuthorInfo (authorId) {
        const _this = this
        this.$axios.get('http://47.100.55.51:3180/entity/authorPortrait', {
          params: {
            authorId: authorId
          }
        }).then(function (response) {
          const statusCode = response.data.status.code
          if (statusCode === '0000') {
            const authorEntity = response.data.data

            let tableRow = {}
            tableRow.id = authorId
            tableRow.title = authorEntity.name
            tableRow.hindex = authorEntity.hindex

            tableRow.statusType = 'info'
            tableRow.status = authorEntity.affiliations.join('; ')
            tableRow.reference = authorEntity.reference
            const publicationNums = authorEntity.publicationNum
            let articleNum = 0
            for (const key in publicationNums) {
              articleNum += publicationNums[key]
            }
            tableRow.articleNum = articleNum

            _this.tableData.push(tableRow)
          } else {
            const wrongMsg = response.data.status.msg
            _this.$notify({
              position: 'bottom-right',
              type: 'danger',
              title: wrongMsg
            })
          }
        })
      },
      toAuthorDetail (authorId) {
        this.$router.push('/author/' + authorId)
      },
      delTheAuthor (authorId) {
        const _this = this
        const entityInfo = {
          userId: localStorage.getItem('userId'),
          entityType: 0,
          entityId: authorId
        }
        this.$axios.post('http://47.100.55.51:3180/user/delSavedEntityByType', entityInfo).then(function (response) {
          const statusCode = response.data.status.code
          if (statusCode === '0000') {
            _this.$notify({
              position: 'bottom-right',
              type: 'success',
              title: 'Succeed to Cancel!'
            })
            _this.reload()
          } else {
            const wrongMsg = response.data.status.msg
            _this.$notify({
              position: 'bottom-right',
              type: 'danger',
              title: wrongMsg
            })
          }
        }).catch(function (error) {
          _this.$notify({
            position: 'bottom-right',
            type: 'danger',
            title: 'Fail to cancel!'
          })
        })
      }
    }
  }
</script>
<style>
</style>
