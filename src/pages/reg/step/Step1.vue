<template>
  <div>
    <a-form style="max-width: 500px; margin: 40px auto 0;">
      <a-form-item
        label="手机号"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
      >
        <a-input value="Alex" />
      </a-form-item>
      <a-form-item
        label="登录密码"
        :labelCol="{span: 7}"
        :wrapperCol="{span: 17}"
      >
        <a-input prefix="￥" type="password" value="5000" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 17, offset: 7}">
        <a-button type="primary" @click="nextStep">{{$t('nextStep')}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'Step1',
  i18n: require('./i18n'),
  methods: {
    nextStep () {
      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>

</style>
