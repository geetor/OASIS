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
          <th>Type</th>
          <th>Read Time</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row" @click="toEntityDetail(row.id, row.status)">
            <div class="media align-items-center">
              <div class="media-body">
                <span class="name mb-0 text-sm">{{row.title}}</span>
              </div>
            </div>
          </th>
          <td>
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
          <td class="budget">
            {{row.time}}
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'recent-table',
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
      const _this = this
      this.$axios.get('http://47.100.55.51:3180/user/getHistory', {
        params: {
          userId: localStorage.getItem('userId')
        }
      }).then(function (response) {
        const entityInfos = response.data.data.reverse()
        entityInfos.forEach(function (entityInfo) {
          let tableRow = {}
          tableRow.id = entityInfo.entityId
          tableRow.title = entityInfo.entityName

          let d = new Date(entityInfo.time)
          tableRow.time = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

          let entityType = entityInfo.entityType
          switch (entityType) {
            case 0:
              tableRow.status = 'author'
              tableRow.statusType = 'success'
              break
            case 1:
              tableRow.status = 'affiliation'
              tableRow.statusType = 'info'
              break
            case 2:
              tableRow.status = 'conference'
              tableRow.statusType = 'warning'
              break
            case 3:
              tableRow.status = 'keyword'
              tableRow.statusType = 'danger'
              break
            default:
              break
          }

          _this.tableData.push(tableRow)
        })
        _this.tableData = _this.unique(_this.tableData).reverse()
        _this.tableData.sort(_this.compare())
      })
    },
    methods: {
      toEntityDetail (id, type) {
        type = type === 'affiliation' ? 'afflication' : type
        if (type !== 'conference') {
          this.$router.push('/' + type + '/' + id)
        } else {
          let publicationTitle = ''
          switch (id) {
            case 0:
              publicationTitle = 'ASE'
              break
            case 1:
              publicationTitle = 'ICSE'
              break
            default:
              break
          }
          this.$router.push('/' + type + '/' + publicationTitle)
        }
      },
      unique (arr) {
        return Object.values(arr.reduce((unique, o) => {
          if (!unique[o.id] || +o.time > +unique[o.id].time) unique[o.id] = o
          return unique
        }, {}))
      },
      compare () {
        return function (obj1, obj2) {
          let d1 = new Date(obj1.time)
          let d2 = new Date(obj2.time)
          let time1 = d1.getTime()
          let time2 = d2.getTime()

          return time2 - time1
        }
      }
    }
  }
</script>
<style>
</style>
