<template>
  <div class="table">
    <advance-table
      :columns="columns"
      :scroll="{ x: 300, y: 570 }"
      :data-source="dataSource"
      title="账户管理"
      :loading="loading"
      rowKey="id"
      @search="onSearch"
      @refresh="onRefresh"
      :format-conditions="true"
      @reset="onReset"
      :pagination="{
        current: page,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        showLessItems: true,
        showQuickJumper: true,
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，总计 ${total} 条`,
        onChange: onPageChange,
        onShowSizeChange: onSizeChange,
      }"
    >
      <template slot="statusTitle">
        状态<a-icon style="margin: 0 4px" type="info-circle" />
      </template>
      <template slot="send" slot-scope="{text}">
        {{text ? '是' : '否'}}
      </template>
      <template slot="status" slot-scope="{text}">
        {{text | statusStr}}
      </template>
      <template slot="opt">
        <a-button type="primary" icon="highlight" size="small">
          编辑
        </a-button>
      </template>
    </advance-table>
  </div>
</template>

<script>
  import AdvanceTable from '@/components/table/advance/AdvanceTable'
  import {dataSource as ds} from '@/services'

  export default {
    name: 'Table',
    components: {AdvanceTable},
    filters: {
      statusStr(val) {
        switch (val) {
          case 1: return '已下单'
          case 2: return '已付款'
          case 3: return '已审核'
          case 4: return '已发货'
        }
      }
    },
    data() {
      return {
        loading: false,
        page: 1,
        pageSize: 10,
        total: 0,
        columns: [
          {
            title: '真实姓名',
            dataIndex: 'name',
            searchAble: true
          },
          {
            title: '手机号',
            dataIndex: 'orderId',
            searchAble: true
          },
          {
            searchAble: true,
            dataIndex: 'status',
            dataType: 'select',
            slots: {title: 'statusTitle'},
            scopedSlots: {customRender: 'status'},
            search: {
              selectOptions: [
                {title: '正常', value: 0},
                {title: '待激活', value: 1},
                {title: '禁止使用', value: 2}
              ]
            }
          },
          {
            title: '发货',
            searchAble: true,
            dataIndex: 'send',
            dataType: 'boolean',
            scopedSlots: {customRender: 'send'},
            search: {
              switchOptions: {
                checkedText: '开',
                uncheckedText: '关'
              }
            }
          },
          {
            title: '创建时间',
            dataIndex: 'auditTime',
            dataType: 'date',
            searchAble: true
          },
          {
            title: '最后登录时间',
            dataIndex: 'updateTime',
            dataType: 'date',
            searchAble: true
          },
          {
            title: '操作',
            scopedSlots: {customRender: 'opt'},
            width: 90
          }
        ],
        dataSource: [],
        conditions: {}
      }
    },
    created() {
      this.getGoodList()
      //this.getColumns()
    },
    methods: {
      getGoodList() {
        this.loading = true
        const {page, pageSize, conditions} = this
        ds.goodsList({page, pageSize, ...conditions}).then(result => {
          const {list, page, pageSize, total} = result.data.data
          this.dataSource = list
          this.page = page
          this.total = total
          this.pageSize = pageSize
          this.loading = false
        })
      },
      getColumns() {
        ds.goodsColumns().then(res => {
          this.columns = res.data
        })
      },
      onSearch(conditions, searchOptions) {
        console.log(searchOptions)
        this.page = 1
        this.conditions = conditions
        this.getGoodList()
      },
      onSizeChange(current, size) {
        this.page = 1
        this.pageSize = size
        this.getGoodList()
      },
      onRefresh(conditions) {
        this.conditions = conditions
        this.getGoodList()
      },
      onReset(conditions) {
        this.conditions = conditions
        this.getGoodList()
      },
      onPageChange(page, pageSize) {
        this.page = page
        this.pageSize = pageSize
        this.getGoodList()
      }
    }
  }
</script>

<style scoped lang="less">
.table{
  background-color: @base-bg-color;
  padding: 24px;
}
</style>