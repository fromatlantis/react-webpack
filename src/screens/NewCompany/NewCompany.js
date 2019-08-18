import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import {
    Approval, //审批
    Info,
    Business,
    Finance,
    Members,
    News,
    Product,
    Event,
    Outward,
    Trademark,
    Patent,
    Suggest,
    Other,
    Copyright,
    Works,
    Website,
    Staff,
    Revenue,
} from './Forms'

// redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'reduxDir/newCompany'
import { actions as companyActions } from 'reduxDir/company'

const mapStateToProps = state => {
    return {
        modelList: state.newCompany.modelList.map(item => item.model),
        serviceModel: state.company.serviceModel.map(item => item.model),
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getModelList: actions('getModelList'), //获取被指派模块
            getServiceModel: companyActions('getServiceModel'), //获取所有模块
            getBaseInfoOk: actions('getBaseInfoOk'), //清除redux
        },
        dispatch,
    )
}

@connect(
    mapStateToProps,
    mapDispatchToProps,
)
class NewCompany extends PureComponent {
    state = {
        menu: [
            {
                title: '企业名片',
                role: '企业名片',
                icon: '',
                path: '/newCompany/info',
                component: Info,
                // children: [
                //     {
                //         title: '企业信息',
                //         path: 'info',
                //         component: Info,
                //     },
                //     {
                //         title: '标签维护',
                //         path: 'tags',
                //     },
                // ],
            },
            {
                title: '基本信息',
                role: '基本信息',
                icon: '',
                // path: 'base',
                children: [
                    {
                        title: '工商信息',
                        role: '工商信息',
                        path: '/newCompany/business',
                        component: Business,
                    },
                    {
                        title: '融资信息',
                        role: '融资信息',
                        path: '/newCompany/finance',
                        component: Finance,
                    },
                    {
                        title: '核心人员',
                        role: '核心人员',
                        path: '/newCompany/members',
                        component: Members,
                    },
                    {
                        title: '人员情况',
                        role: '人员情况',
                        path: '/newCompany/staff',
                        component: Staff,
                    },
                    {
                        title: '企业动态',
                        role: '企业动态',
                        path: '/newCompany/news',
                        component: News,
                    },
                    {
                        title: '主要产品',
                        role: '主要产品',
                        path: '/newCompany/product',
                        component: Product,
                    },
                ],
            },
            {
                title: '投资关系',
                role: '投资关系',
                icon: '',
                // path: 'investment',
                children: [
                    {
                        title: '投资事件',
                        role: '投资事件',
                        path: '/newCompany/event',
                        component: Event,
                    },
                    {
                        title: '对外投资',
                        role: '对外投资',
                        path: '/newCompany/outward',
                        component: Outward,
                    },
                ],
            },
            {
                title: '知识产权',
                role: '知识产权',
                icon: '',
                // path: 'copyright',
                children: [
                    {
                        title: '商标信息',
                        role: '商标信息',
                        path: '/newCompany/trademark',
                        component: Trademark,
                    },
                    {
                        title: '专利信息',
                        role: '专利信息',
                        path: '/newCompany/patent',
                        component: Patent,
                    },
                    {
                        title: '软件著作权',
                        role: '软件著作权',
                        path: '/newCompany/copyright',
                        component: Copyright,
                    },
                    {
                        title: '作品著作权',
                        role: '作品著作权',
                        path: '/newCompany/works',
                        component: Works,
                    },
                    {
                        title: '网站域名',
                        role: '网站域名',
                        path: '/newCompany/website',
                        component: Website,
                    },
                ],
            },
            // {
            //     title: '新闻舆情',
            //     icon: '',
            //     path: 'sentiment',
            // },
            // {
            //     title: '企业需求',
            //     icon: '',
            //     path: 'requirement',
            // },
            {
                title: '财务信息',
                role: '财务信息',
                icon: '',
                path: '/newCompany/revenue',
                component: Revenue,
            },
            {
                title: '更新审批',
                icon: '',
                path: '/newCompany/approval',
                component: Approval,
            },
            {
                title: '更新审批待办',
                icon: '',
                display: 'none',
                path: '/newCompany/approval/:id',
                component: Approval,
            },
            {
                title: '需求和建议',
                role: '需求和建议',
                icon: '',
                path: '/newCompany/suggest',
                component: Suggest,
            },
        ],
    }
    componentDidMount() {
        this.props.getServiceModel()
        const { companyId } = sessionStorage
        if (companyId && companyId !== '000000') {
            this.props.getModelList(companyId)
        } else {
            this.setState({
                menu: this.state.menu.filter(item => item.title !== '更新审批'),
            })
            this.props.getBaseInfoOk({})
        }
    }
    render() {
        const { modelList, serviceModel } = this.props
        const { companyId } = sessionStorage //新增无权限限制，编辑只展示指派模块
        return (
            <MenuLayout
                menu={this.state.menu}
                privateAuths={companyId === '000000' ? serviceModel : modelList}
            />
        )
    }
}
export default NewCompany
