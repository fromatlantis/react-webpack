import React from 'react'
import moment from 'moment'
const info = [
    {
        label: '企业名称',
        field: 'name',
    },
    {
        label: '企业logo',
        field: 'logo',
        formatter: logo => {
            return <img src={logo} alt="" style={{ width: 120 }} />
        },
    },
    {
        label: '企业税号',
        field: 'creditCode',
    },
    {
        label: '开户银行',
        field: 'depositBank',
    },
    {
        label: '银行账户',
        field: 'bankAccount',
    },
    {
        label: '成立时间',
        field: 'estiblishTime',
        formatter: estiblishTime => {
            return moment(parseInt(estiblishTime)).format('YYYY-MM-DD')
        },
    },
    {
        label: '法定代表人',
        field: 'legalPersonName',
    },
    {
        label: '注册资金',
        field: 'regCapital',
    },
    {
        label: '联系电话',
        field: 'phoneNumber',
    },
    {
        label: '企业邮箱',
        field: 'email',
    },
    {
        label: '企业地址',
        field: 'regLocation',
    },
    {
        label: '企业类型',
        field: 'category',
    },
]
const business = [
    {
        label: '法定代表人',
        field: 'legalPersonName',
    },
    {
        label: '成立日期',
        field: 'estiblishTime',
        formatter: estiblishTime => {
            return moment(parseInt(estiblishTime)).format('YYYY-MM-DD')
        },
    },
    {
        label: '营业状态',
        field: 'regStatus',
    },
    {
        label: '注册资本',
        field: 'regCapital',
    },
    {
        label: '实缴资本',
        field: 'actualCapital',
    },
    {
        label: '企业类型',
        field: 'companyOrgType',
    },
    {
        label: '参保人数',
        field: 'socialStaffNum',
    },
    {
        label: '所属行业',
        field: 'industry',
    },
    {
        label: '统一社会信用代码',
        field: 'creditCode',
    },
    // {
    //     label: '进出口企业代码',
    //     field: 'name',
    //     component: <Input />,
    // },
    {
        label: '工商注册号',
        field: 'regNumber',
    },
    {
        label: '组织机构代码',
        field: 'orgNumber',
    },
    {
        label: '英文名',
        field: 'property3',
    },
    {
        label: '曾用名',
        field: 'historyNames',
    },
    {
        label: '企业地址',
        field: 'regLocation',
    },
    // {
    //     label: '省份简称',
    //     field: 'base',
    //     component: <Input />,
    // },
    {
        label: '经营开始时间',
        field: 'fromTime',
        formatter: fromTime => {
            return moment(parseInt(fromTime)).format('YYYY-MM-DD')
        },
    },
    {
        label: '经营结束时间',
        field: 'toTime',
        formatter: toTime => {
            return moment(parseInt(toTime)).format('YYYY-MM-DD')
        },
    },
    {
        label: '核准日期',
        field: 'approvedTime',
        formatter: approvedTime => {
            return moment(parseInt(approvedTime)).format('YYYY-MM-DD')
        },
    },
    {
        label: '登记机关',
        field: 'regInstitute',
    },
    {
        label: '经营范围',
        field: 'businessScope',
    },
]
const finance = [
    {
        label: '出资方',
        field: 'investorName',
    },
    {
        label: '金额',
        field: 'money',
    },
    {
        label: '时间',
        field: 'date',
        formatter: date => {
            return moment(parseInt(date)).format('YYYY-MM-DD')
        },
    },
    {
        label: '轮次',
        field: 'round',
    },
]
const members = [
    {
        label: '形象照片',
        field: 'icon',
        formatter: icon => {
            return <img src={icon} alt="" style={{ width: 120 }} />
        },
    },
    {
        label: '姓名',
        field: 'name',
    },
    {
        label: '职务',
        field: 'title',
    },
    {
        label: '介绍',
        field: 'description',
    },
    {
        label: '学历',
        field: 'education',
    },
    {
        label: '职称',
        field: 'jobTitle',
    },
]
const product = [
    {
        label: '产品图片',
        field: 'icon',
        formatter: icon => {
            return <img src={icon} alt="" style={{ width: 120 }} />
        },
    },
    {
        label: '产品名称',
        field: 'name',
    },
    {
        label: '产品功能',
        field: 'classes',
    },
    {
        label: '产品介绍',
        field: 'brief',
    },
]
const event = [
    {
        label: '投资公司名称',
        field: 'organizationName',
    },
    {
        label: '业务范围',
        field: 'yewu',
    },
    {
        label: '投资数额',
        field: 'money',
    },
    {
        label: '投资时间',
        field: 'tzdate',
    },
    {
        label: '轮次',
        field: 'lunci',
    },
]
const outward = [
    {
        label: '被投资公司名称',
        field: 'name',
    },
    {
        label: '被投资法定代表人',
        field: 'legalPersonName',
    },
    {
        label: '开业时间',
        field: 'estiblishTime',
    },
    {
        label: '注册资本',
        field: 'regCapital',
    },
    {
        label: '投资金额',
        field: 'amount',
    },
    {
        label: '投资比例',
        field: 'percent',
    },
    {
        label: '状态',
        field: 'regStatus',
    },
]
const trademark = [
    {
        label: '商标名称',
        field: 'tmName',
    },
    {
        label: '注册号',
        field: 'regNo',
    },
    {
        label: '申请时间',
        field: 'appDate',
    },
    {
        label: '状态',
        field: 'category',
    },
    {
        label: '申请进度',
        field: 'status',
    },
]
const patent = [
    {
        label: '专利名称',
        field: 'patentName',
    },
    {
        label: '申请号',
        field: 'appnumber',
    },
    {
        label: '申请日期',
        field: 'applicationTime',
    },
    {
        label: '专利发明人',
        field: 'inventor',
    },
    {
        label: '专利申请人',
        field: 'applicantName',
    },
    {
        label: '专利类型',
        field: 'patentType',
    },
    {
        label: '专利代理机构',
        field: 'agency',
    },
    {
        label: '公开号',
        field: 'pubnumber',
    },
    {
        label: '专利说明',
        field: 'abstracts',
    },
]
const copyright = [
    {
        label: '著作权名称',
        field: 'fullname',
    },
    {
        label: '简称',
        field: 'simplename',
    },
    {
        label: '登记日期',
        field: 'regtime',
    },
    {
        label: '登记号',
        field: 'regnum',
    },
    {
        label: '分类号',
        field: 'catnum',
    },
]
const works = [
    {
        label: '著作权名称',
        field: 'fullname',
    },
    {
        label: '著作权类别',
        field: 'type',
    },
    {
        label: '登记日期',
        field: 'regtime',
    },
    {
        label: '登记号',
        field: 'regnum',
    },
    {
        label: '完成创作时间',
        field: 'finishTime',
    },
]
const website = [
    {
        label: '主办单位/域名/网站',
        field: 'ym',
    },
    {
        label: '主办单位性质',
        field: 'companyType',
    },
    {
        label: '备案号',
        field: 'liscense',
    },
    {
        label: '网站首页',
        field: 'webSite',
    },
    {
        label: '审核时间',
        field: 'examineDate',
    },
    {
        label: '创建时间',
        field: 'sourceTime',
    },
]
const StaffEdu = [
    {
        label: '年份',
        field: 'years',
        formatter: years => {
            return moment(years).format('YYYY')
        },
    },
    {
        label: '就业人数',
        field: 'employment',
    },
    {
        label: '入选区、本市和国家相关人才计划的人员',
        field: 'talents',
    },
    {
        label: '留学生人员',
        field: 'overseasStudent',
    },
    {
        label: '博士人员',
        field: 'doctoral',
    },
    {
        label: '本科及以上学历人员',
        field: 'undergraduate',
    },
    {
        label: '大专及以上学历人员',
        field: 'juniorCollege',
    },
    {
        label: '本公司社保缴纳人员',
        field: 'socialPay',
    },
]
const FinanceInfo = [
    {
        label: '年份',
        field: 'years',
        formatter: years => moment(years).format('YYYY'),
    },
    {
        label: '营业收入',
        field: 'operatingRevenue',
    },
    {
        label: '出口总额',
        field: 'grossExport',
    },
    {
        label: '专利产品年产值',
        field: 'patentYearValue',
    },
    {
        label: '研发费用',
        field: 'researchExpenditure',
    },
    {
        label: '上缴税金',
        field: 'taxes',
    },
    {
        label: '利润总额',
        field: 'totalProfit',
    },
    {
        label: '净利润',
        field: 'retainedProfits',
    },
]
export default {
    BasicInfo: info,
    BaseInfo: business,
    CoreTeam: members,
    FinancingHis: finance,
    ProductInfo: product,
    InvestmentEvent: event,
    InvestmentsAbroad: outward,
    Patent: patent,
    ProductTrademark: works,
    SoftwareCopyright: copyright,
    Trademark: trademark,
    WebsiteRecords: website,
    StaffEdu,
    FinanceInfo,
}
