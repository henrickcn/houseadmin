<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{systemName}}</span>
      </div>
      <div class="desc">V1.0</div>
    </div>
    <div class="login-main">
      <div class="login">
        <a-form @submit="onSubmit" :form="form">
          <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane tab="手机号登录" key="1">
              <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
              <a-form-item>
                <a-input v-decorator="[
          'username',
          { rules: [{ required: true, message: '手机号不能为空' }] },
        ]" size="large" placeholder="请输入手机号" >
                  <a-icon slot="prefix" type="mobile" />
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-row :gutter="8" style="margin: 0 -4px">
                  <a-col :span="16">
                    <a-input v-decorator="[
          'validcode',
          { rules: [{ required: true, message: '验证码不能为空' }] },
        ]" size="large" placeholder="验证码">
                      <a-icon slot="prefix" type="number" />
                    </a-input>
                  </a-col>
                  <a-col :span="8" style="padding-left: 4px">
                    <a-button @click="getValid" :disabled="getValidStatus" style="width: 100%" class="captcha-button" size="large">{{getValidStatusText}}</a-button>
                  </a-col>
                </a-row>
              </a-form-item>
              <a-form-item>
                <a-button :loading="logging" style="width: 100%;" size="large" htmlType="submit" type="primary">登录系统</a-button>
              </a-form-item>
              <a-form-item>
                <a-checkbox v-decorator="[
              'agreet',
              { valuePropName:'checked', rules: [{ required: true, message: '请同意隐私条款' }] },
            ]" size="large" placeholder="验证码">同意<a @click="() => (modalVisible = true)">隐私条款</a></a-checkbox>
                <a style="float: right">忘记密码，找回？</a>
              </a-form-item>
            </a-tab-pane>
            <a-tab-pane tab="小程序扫码" key="2">
              
            </a-tab-pane>
          </a-tabs>
          <div>
            第三方快捷登录
            <a-icon class="icon" type="wechat" />
            <a-icon class="icon" type="qq" />
            <a-icon class="icon" type="weibo" />
            <router-link style="float: right" to="/reg" >企业入驻</router-link>
          </div>
        </a-form>
      </div>
    </div>
    <a-modal
      v-model="modalVisible"
      title="服务隐私条款"
      okText="同意"
      width="750"
      centered
      @ok="agreetClick(1)"
      @cancel="agreetClick(0)"
    >
      <p>请您仔细阅读《火山小视频直播主播签约协议》（以下简称“本协议”），您（以下简称“您”或“主播”）将作为本协议的一方当事人与北京微播视界科技有限公司（以下简称“公司”）签订本协议。公司拥有或实际运营包括域名为“huoshan.com”、“huoshanzhibo.com”的网站及“火山直播”、“火山小视频”客户端（以下简称“平台”或“公司平台”）。公司有权对本协议约定的平台更新或者更名，更新或者更名后的平台同样适用本协议。在您成为“火山小视频”等公司平台签约主播并接受公司平台提供的相关服务之前，请您务必认真阅读并充分理解本协议。</p><p>本平台不鼓励未成年人使用相关服务，未成年人请委托监护人操作或在监护人明示同意下操作，否则不得使用“火山小视频” 等公司平台软件及相关服务。若您使用“火山小视频” 等公司平台软件及相关服务，则视为您已充分理解本协议并承诺作为本协议的一方当事人接受本协议的约束。 （本协议中统称“使用”）。若您使用“火山小视频”软件及相关服务，则视为您已充分理解本协议并承诺作为本协议的一方当事人接受协议的约束。</p><h3>一、总则</h3><p>1. 您根据公司注册要求及规则，在公司平台上申请成为平台主播，在公司平台从事网络直播活动，即使用公司平台提供的服务从事包括但不限于在线游戏解说、游戏技巧展示、唱歌跳舞或其他才艺展示、参加比赛及综艺节目等视频内容的直播活动（以下简称“网络直播”），您在公司平台进行网络直播期间均应视为协议期内。</p><p>2. 签署本协议前，您已充分了解公司之各项规则及要求，且有条件及有能力、资格履行本协议约定的主播职责及义务。本协议对您构成有效的、带有约束力的、可强制执行的法定义务，您对本协议下所有条款及定义等内容均已明确知悉，并无疑义。</p><p>3. 您承诺并声明在公司平台进行网络直播时符合所在地法律的相关规定，不得以履行本协议为名义，从事违反中国及所在地法律规定的行为。</p><p>4. 您与公司不构成任何法律层面的雇佣、劳动、劳务关系，公司无需向您承担任何社会保险金和福利。</p><h3>二、权利和义务</h3><p>1. 您应在平台实名注册，且提供的注册信息应当完整、真实、合法、有效。</p><p>2. 平台有权独立对您进行考察、评审，以决定是否确立或取消对主播的奖励或处罚。具体考察项目及标准由公司另行制定，无需额外征得您的同意。如公司希望与您就直播事项进行深入合作，可由双方进行友好协商另行签订合作协议。</p><p>3. 在协议期间您通过平台产生的艺术形象、表演形象、广告形象、平面形象以及相应存于公司服务器内的音视频内容，您永久且不可撤销地在全球范围内授权公司有权在界面设计、推广活动（包括但不限于频道设计、对外宣传片、宣传动图、产品介绍）等项目以及平台中免费使用。</p><p>4. 您的行为应符合平台用户服务协议及其他平台规范要求，包括但不限于：</p><p>(1) 您网络表演不得包含：<br></p><p>a) 色情、低俗、轻浮及裸露音频及视频；<br>b) 发表与政治相关言论、发表反党反社会反对祖国统一言论；<br>c) 表演方式恐怖、残忍、暴力血腥、低俗，危害表演者自身或他人身心健康内容的；<br>d) 任何暴力和/或自残行为内容；<br>e) 任何威胁生命健康、利用刀具等危险器械表演的危及自身或他人人身及/或财产权利的内容；<br>f) 怂恿、诱导他人参与可能会造成人身伤害或导致死亡的危险或违法活动的内容；<br>g) 利用人体缺陷或以展示人体变异等方式招徕用户的；<br>h) 以偷拍偷录等方式，侵害他人合法权益的；<br>i) 以虐待动物等方式进行表演的；<br>j) 使用未取得文化行政部门内容审查批准文号或备案编号的网络游戏产品，进行网络游戏技法展示或解说的；<br>k) 侵害未成年人合法权益或者损害未成年人身心健康的；<br>l) 您参加公司安排的主播任务时，不得从事与主播无关的事宜，不得在直播间肆意喧哗，辱骂观众,否则将视为违规，平台将追究您责任及经济赔偿；<br>m) 直播时注意仪容仪态及行为方式，不得直播危害自身或他人人身安全的内容；<br></p><p></p><p>(2) 您保证不在公司不知情的情况下私自使用主播头衔获得收益；</p><p>(3) 您不得在视频中植入除有利于公司或公司平台之外的任何广告或推广；</p><p>(4) 您有责任积极维护自身形象，营造良好的互动环境；</p><p>(5) 不得直播其他影响公司声誉及利益的言行或行动；</p><p>(6) 不得出现违反《互联网信息服务管理办法》、《计算机信息网络国际联网安全保护管理办法》、《互联网电子公告管理服务管理规定》、《维护互联网安全的决定》、《互联网新闻信息服务管理规定》等相关法律规定的言行，包括但不限于：反对宪法所确定的基本原则的；危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；损害国家荣誉和利益的；煽动民族仇恨、民族歧视、破坏民族团结的；破坏国家宗教政策，宣扬邪教和封建迷信的；散布谣言，扰乱社会秩序，破坏社会稳定的；散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；侮辱或者诽谤他人，侵害他人合法权益的；煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；以非法民间组织名义活动的；含有虚假、有害、胁迫、侵害他人隐私、骚扰、侵害、中伤、粗俗、猥亵、或其它道德上令人反感的内容；含有法律、法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其他内容的行为；</p><p>(7) 平台指定的其他主播行为规范要求。</p><p>5. 您如违反上述约定，公司有权依据平台《社区公约》及《火山直播行为规范》等规范对您行为进行管理。行为严重的，公司有权单方面终止本协议，且有权免于履行本协议下的义务。您的言论及表演行为与公司无关，如因您的行为造成不良后果的，您独立承担起造成的不良后果及责任。公司有权独立判断并视情况对您采取预先警示、拒绝发布、立即停止传输信息、限制账号部分或者全部直播功能直至永久关闭账号等措施。造成公司损失的，您除返还从公司处取得的全部费用外，还应赔偿公司一切损失，包括但不限于公证费、鉴定费、差旅费、律师费、诉讼费等合理费用。对您涉嫌违反法律法规、涉嫌违法犯罪的行为，公司将保存有关记录，并依法向有关主管部门报告、配合有关主管部门调查。</p><p>6. 在合作期间，您同意不可撤销地授权公司有权在全球范围内使用您肖像、表演中形象、姓名、昵称用于推广、宣传公司及公司关联公司的产品/服务。</p><p>7. 您通过公司直播平台录制产生或直播产生作品，包括但不限于图片、音频、视频作品著作权归您所有。您知悉、理解并同意您通过公司直播平台录制产生或直播产生作品，授权公司及其关联公司可在全球范围内、免费、非独家、可转授权地使用，使用范围包括但不限于在当前或其他网站、应用程序、产品或终端设备等，并授权公司及其关联公司对相应内容可进行修改、复制、改编、翻译、汇编或制作衍生产品。</p><p>8. 公司有权按照法律法规，部门规章（包括但不限于《互联网文化管理暂行规定》、《网络表演经营活动管理办法》），行业自律公约（包括但不限于《北京网络直播行业自律公约》）、经营政策（包括但不限于《社区公约》、《火山直播行为规范》），对您的艺术行为、演出行为、以及各种行为进行必要的管理。</p><p>9. 您应为自身树立正面形象（包括但不仅限于妆容、服饰与言行等），不得出现任何因吸毒、盗窃、嫖娼、赌博、卖淫、开展淫秽表演等违反公共秩序、法律法规以及其他影响您公众形象的行为；不得从事任何损害公司及其关联公司及平台产品和品牌形象的行为。</p><p>10. 公司有权依据业务需要和/或您履行协议的情况随时单方终止本协议。</p><p>11. 您在平台进行直播，有权根据平台规则，获得道具（礼物）分成（用户赠送的虚拟道具[礼物]）。您所获得的收益应当缴纳的税金由公司或公司委托或指定的第三方根据国家相关法律法规代扣代缴。</p><p>12. 如公司收到因无民事行为能力人、限制民事行为能力人用户在平台充值、消费、打赏，无民事行为能力人、限制民事行为能力人和/或其监护人要求公司进行退款的用户反馈和诉求，在接到公司通知后，除非公司以书面形式作出豁免，您应当无条件就您已获得收益部分向该无民事行为能力人、限制民事行为能力人和/或其监护人进行足额退还。对于应当退还的款项，您授权公司从您在平台获得的费用中进行抵扣。</p><h3>三、保密条款</h3><p>1. 您应严格遵守公司的保密制度，承诺无限期保守公司和平台的商业秘密。商业秘密是指由公司提供的、或者您在双方合作期间了解到的、或者公司对其他方承担保密义务的，与公司业务有关的，能为公司带来经济利益，具有实用性的、非公知的所有信息，包括但不限于：技术信息、经营信息、公司相关活动信息、收益信息、工作人员信息、通讯信息以及与公司运营或管理有关的信息和文件（含本协议及相关协议内容）。</p><p>2. 您应严格遵守本协议，未经公司书面授权或同意，对公司的商业秘密不得：</p><p>（1）以任何方式向第三方进行传播、泄露（包括暗示）；</p><p>（2） 为非本协议的目的而使用。</p><p>3. 因您违反约定使用或披露公司商业秘密使公司遭受任何名誉、声誉或经济上的直接或间接的损失，您应赔偿公司全部损失。</p><p>4. 以上保密条款并不因本协议的解除和终止而失效。</p><h3>四、协议的解除、终止</h3><p>1. 因本协议所依据的法律、行政法规、规章或政策发生变化，致使本协议无法继续履行或继续履行有风险的，公司有权单方面终止本协议而无需承担任何法律责任。</p><p>2. 公司有权以提前30日书面通知您的方式终止本协议，而无需就此承担违约责任。</p><p>3.&nbsp;本协议期限届满或双方就解除本协议协商一致的，可终止本协议。</p><p>4. 您有下列情形之一，公司可以立即解除本协议，不需要提前通知：</p><p>（1）您违反其在本协议项下所做的声明或承诺的；</p><p>（2）因您原因直接或间接给公司利益造成损害的；</p><p>（3）违反国家法律法规的；</p><p>（4）违反本协议规定的其它义务；</p><p>（5）以消极、不作为等不符合公司平台要求的方式履行本协议的（即使未构成违约），经公司通知后【3】日内仍未改正的；</p><p>（6）因异常情形的出现，公司认为您不适合进行本协议下服务事项，经公司通知后【3】日内异常情形仍未消除的；</p><p>（7）因公司业务调整，不再进行网络直播业务的。</p><p>5. 无论本协议因为任何原因终止的，对于您在公司平台账号中的全部数据或您因使用公司平台而存储在公司服务器中的数据等任何信息，公司可将该等信息保留或删除，包括服务终止前您尚未完成的任何数据。</p><p>6. 如本协议因为任何原因终止的，您应自行处理好关于数据等信息的备份等事项，由此造成公司损失的，您应负责赔偿。</p><h3>五、违约责任</h3><p>1. 除本协议另有规定外，如因您的任何不实陈述或保证，或因您违反本协议项下的义务，或因您对第三方的侵权行为或违约行为，导致公司面临任何索赔、诉讼或仲裁等要求，或导致公司遭受损失，您应当采取适当的措施（包括但不限于与该第三方协调解决纠纷），保证公司免受任何索赔、诉讼或仲裁等要求的任何影响和（或）公司所受的损失。在该等情形下，公司就其因此所受损失保留向您索赔的权利。特别地，公司有权视您违约情节的严重程度采取下列某一项或者某几项措施追究您的违约责任：</p><p>（1）暂时地冻结您的公司平台账号，直至您纠正违约行为时再恢复；</p><p>（2）永久性地封停/冻结您的公司平台账号；</p><p>（3）将您的公司平台账号永久性地删除；</p><p>（4）拒绝您再次注册公司平台账号；</p><p>（5）暂时中止您收益的结算和支付，直至您纠正违约行为时再进行结算和支付；</p><p>（7）要求您于收到公司书面通知之日起5个工作日内，赔偿全部损失；</p><p>（8）单方面解除本协议，终止双方基于本协议的所有合作事宜，不再支付尚未支付的收益费用，并有权追回所有已支付的款项。</p><p>2. 您如违反本协议的规定，公司有权单方面扣除您应得的部分或全部收益，情节严重的，公司有权单方面解除本协议，如因此对公司造成的损失，您应承担全部赔偿责任。</p><p>3. 如果您的违约行为遭到媒体曝光，导致公司遭受相应的公关危机的，公司还可以要求您发表书面声明，澄清事实并向用户和/或公司道歉。</p><h3>六、关于通知</h3><p>1. 公司可能会以网页公告、网页/弹窗提示、电子邮箱、手机短信、常规的信件传送、向您注册的公司平台账户的管理系统内发送站内信等方式中的一种或多种，向您送达关于本服务的各种规则、通知、提示等信息，该等信息一经公司采取前述任何一种方式公布或发送，即视为送达，对您产生约束力。若您不接受的，请您书面通知公司，否则视为您已经接受、同意。</p><p>2. 若由于您提供的电子邮箱、手机号码、通讯地址等信息错误，导致您未收到相关规则、通知、提示等信息的，您同意仍然视为您已经收到相关信息并受其约束，一切后果及责任由您自行承担。</p><p>3.若您有事项需要通知公司的，应当按照公司对外正式公布的联系方式书面通知公司。</p><h3>七、争议处理</h3><p>1. 本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</p><p>2. 若您和公司之间发生任何纠纷或争议，首先应友好协商解决；协商不成功的，双方均同意将纠纷或争议提交北京市海淀区人民法院解决。</p><p>3. 本协议签订地：中华人民共和国北京市海淀区。</p><h3>八、其他</h3><p>1. 本协议内容同时包括本协议、《“火山小视频”用户使用协议》、《“火山小视频”隐私政策》以及公司可能不断发布的关于本服务的其他相关协议、规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。上述内容与本协议存在冲突的，以本协议为准。公司有权在必要时单方修改本协议或上述内容，相关内容变更后，如果您继续使用本服务，即视为您已接受修改后的相关内容。如果您不接受修改后的相关内容，应当停止使用相关服务。</p><p>2. 本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</p><p>3. 本协议公司平台或相关产品、功能名称、协议名称变更的，不影响本合作的进行，以实际变更后的为准。</p><p>4. 本协议条款无论因何种原因部分无效，其余条款仍有效，对各方具有约束力。</p>
    </a-modal>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import {login, getRoutesConfig} from '@/services/user'
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

export default {
  name: 'Login',
  components: {CommonLayout},
  data () {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this),
      modalVisible: false,
      getValidStatus:false,
      getValidStatusText: "获取验证码"
    }
  },
  computed: {
    systemName () {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          const name = this.form.getFieldValue('username')
          const password = this.form.getFieldValue('validcode')
          const agreet = this.form.getFieldValue('agreet')
          if (!agreet) {
            this.$message.error("请同意隐私条款")
            return false
          }
          this.logging = true
          login(name, password, agreet).then(this.afterLogin)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      console.log(loginRes)
      if (loginRes.errcode === 0) {
        const {user, permissions, roles, message} = loginRes.data
        this.setUser(user)
        this.setPermissions(permissions)
        this.setRoles(roles)
        setAuthorization({token: loginRes.data.token, expireAt: new Date(loginRes.data.expire_time)})
        // 获取路由配置
        getRoutesConfig().then(result => {
          const routesConfig = result.data.data
          loadRoutes(routesConfig)
          this.$router.push('/workplace')
          this.$message.success(message, 3)
        })
      } else {
        this.error = loginRes.errmsg
      }
    },
    agreetClick (status) {
      this.modalVisible = false
      this.form.setFieldsValue({agreet:status==1?true:false})
    },
    getValid () {
      this.getValidStatus = !this.getValidStatus;
      if (this.getValidStatus) {
        let s = 60
        this.getValidStatusText = s + "秒"
        let time = setInterval(() => {
          if (s==1) {
            this.getValidStatusText = "获取验证码"
            clearInterval(time)
            this.getValidStatus = false
            return false
          }
          s--
          this.getValidStatusText = s + "秒"
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login-main{
      background: rgba(255, 255, 255, .5);
      padding:10px 0 30px 0;
      box-shadow: rgba(209, 208, 208, 0.5) 0 0 20px;
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>