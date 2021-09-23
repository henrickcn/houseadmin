<template>
  <div class="table">
    <advance-table
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
  import staff from '@/services/base/staff/lists'

  export default {
    name: 'Table',
    components: {AdvanceTable},
    filters: {
      statusStr(val) {
        switch (parseInt(val)) {
          case 0: return '正常'
          case 1: return '待审核'
          case 2: return '禁用'
        }
      }
    },
    data() {
      return {
        selectedRowKeys:[],
        loading: false,
        page: 1,
        pageSize: 20,
        total: 0,
        columns: [
          {
            title: '真实姓名',
            dataIndex: 'real_name',
            searchAble: true,
            width: 90
          },
          {
            title: '手机号',
            dataIndex: 'phone',
            searchAble: true,
            width: 140
          },
          {
            title: '邮箱',
            dataIndex: 'email',
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
                {title: '全部状态', value: 'all'},
                {title: '正常', value: 0},
                {title: '待审核', value: 1},
                {title: '禁用', value: 2}
              ]
            },
            width: 100
          },
          {
            title: '创建时间',
            dataIndex: 'create_time',
            dataType: 'date',
            searchAble: false,
            sorter: true,
            sortDirections:['ascend', 'descend']
          },
          {
            title: '最后登录时间',
            dataIndex: 'update_time',
            dataType: 'date',
            searchAble: false,
            sorter: true
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
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        const {page, pageSize, conditions} = this
        staff.getList({page, pageSize, ...conditions}).then(result => {
          this.loading = false
          if(result.data.errcode) {
            this.$message.error(result.data.errmsg)
            return ;
          }
          const {list, page, page_size, total} = result.data.data
          this.dataSource = list
          this.page = page
          this.total = total
          this.pageSize = page_size
        })
      },
      onSearch(conditions, searchOptions) {
        console.log(searchOptions)
        this.page = 1
        this.conditions = conditions
        this.getList()
      },
      onSizeChange(current, size) {
        this.page = 1
        this.pageSize = size
        this.getList()
      },
      onRefresh(conditions) {
        this.conditions = conditions
        this.getList()
      },
      onReset(conditions) {
        this.conditions = conditions
        this.getList()
      },
      onPageChange(page, pageSize) {
        this.page = page
        this.pageSize = pageSize
        this.getList()
      },
      onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
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