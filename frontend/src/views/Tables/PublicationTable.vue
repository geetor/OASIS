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
          <th>Title</th>
          <th>H-Index</th>
          <th>Reference</th>
          <th>Article Num</th>
          <th>Cancel</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row" @click="toPublicationDetail(row.title)">
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
              {{row.attribute}}
            </div>
          </td>
          <td class="text-right" @click="delThePublication(row.title)">
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
    name: 'publication-table',
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
        entityType: 2
      }).then(function (response) {
        let staredPublicationIds = response.data.data
        staredPublicationIds.forEach(function (staredPublicationId) {
          _this.addPublicationInfo(staredPublicationId)
        })
      })
    },
    methods: {
      addPublicationInfo (publicationId) {
        const _this = this
        let publicationTitle = ''
        switch (publicationId) {
          case 0:
            publicationTitle = 'ase'
            break
          case 1:
            publicationTitle = 'icse'
            break
          default:
            break
        }
        this.$axios.get('http://47.100.55.51:3180/entity/publicationPortrait', {
          params: {
            publicationTitle: publicationTitle
          }
        }).then(function (response) {
          const statusCode = response.data.status.code
          if (statusCode === '0000') {
            let publicationEntity = response.data.data

            let tableRow = {}
            tableRow.title = publicationEntity.publicationTitle
            tableRow.hindex = publicationEntity.hindex
            tableRow.reference = publicationEntity.reference
            tableRow.attribute = publicationEntity.articleNum

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
      toPublicationDetail (publicationTitle) {
        const aseRegex = /A.*?S.*?E/gm
        const icseRegex = /I.*?C.*?S.*?E/gm
        if (aseRegex.test(publicationTitle)) {
          this.$router.push('/conference/ASE')
        } else if (icseRegex.test(publicationTitle)) {
          this.$router.push('/conference/ICSE')
        }
      },
      delThePublication (publicationTitle) {
        let publicationId = 0
        const aseRegex = /A.*?S.*?E/gm
        const icseRegex = /I.*?C.*?S.*?E/gm
        if (aseRegex.test(publicationTitle)) {
          publicationId = 0
        } else if (icseRegex.test(publicationTitle)) {
          publicationId = 1
        }

        const _this = this
        const entityInfo = {
          userId: localStorage.getItem('userId'),
          entityType: 2,
          entityId: publicationId
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
