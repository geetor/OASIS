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
          <th>Keyword</th>
          <th>Activation</th>
          <th>Reference</th>
          <th>Article Num</th>
          <th>Cancel</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row" @click="toKeywordDetail(row.id)">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td class="budget">
            {{row.budget}}
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
          <td class="text-right" @click="delTheKeyword(row.id)">
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
    name: 'keywords-table',
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
        entityType: 3
      }).then(function (response) {
        let staredKeywordIds = response.data.data
        staredKeywordIds.forEach(function (staredKeywordId) {
          _this.addKeywordInfo(staredKeywordId)
        })
      })
    },
    methods: {
      addKeywordInfo (keywordId) {
        const _this = this
        this.$axios.get('http://47.100.55.51:3180/entity/keywordPortrait', {
          params: {
            keywordId: keywordId
          }
        }).then(function (response) {
          const statusCode = response.data.status.code
          if (statusCode === '0000') {
            const keywordEntity = response.data.data
            console.log(keywordEntity)

            let tableRow = {}
            tableRow.id = keywordId
            tableRow.title = keywordEntity.keyword
            tableRow.budget = keywordEntity.activation
            tableRow.reference = keywordEntity.reference
            tableRow.articleNum = keywordEntity.articleNum

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
      toKeywordDetail (keywordId) {
        this.$router.push('/keyword/' + keywordId)
      },
      delTheKeyword (keywordId) {
        const _this = this
        const entityInfo = {
          userId: localStorage.getItem('userId'),
          entityType: 3,
          entityId: keywordId
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
