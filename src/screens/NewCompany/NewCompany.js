import React, { PureComponent } from 'react'
import { MenuLayout } from 'components'
import {
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
const menu = [
    {
        title: '企业名片',
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
        icon: '',
        path: '/newCompany',
        children: [
            {
                title: '工商信息',
                path: '/newCompany/business',
                component: Business,
            },
            {
                title: '融资信息',
                path: '/newCompany/finance',
                component: Finance,
            },
            {
                title: '核心人员',
                path: '/newCompany/members',
                component: Members,
            },
            {
                title: '人员情况',
                path: '/newCompany/staff',
                component: Staff,
            },
            {
                title: '企业动态',
                path: '/newCompany/news',
                component: News,
            },
            {
                title: '主要产品',
                path: '/newCompany/product',
                component: Product,
            },
        ],
    },
    {
        title: '投资关系',
        icon: '',
        children: [
            {
                title: '投资事件',
                path: '/newCompany/event',
                component: Event,
            },
            {
                title: '对外投资',
                path: '/newCompany/outward',
                component: Outward,
            },
        ],
    },
    {
        title: '知识产权',
        icon: '',
        children: [
            {
                title: '商标信息',
                path: '/newCompany/trademark',
                component: Trademark,
            },
            {
                title: '专利信息',
                path: '/newCompany/patent',
                component: Patent,
            },
            {
                title: '软件著作权',
                path: '/newCompany/copyright',
                component: Copyright,
            },
            {
                title: '作品著作权',
                path: '/newCompany/works',
                component: Works,
            },
            {
                title: '网站域名',
                path: '/newCompany/website',
                component: Website,
            },
        ],
    },
    // {
    //     title: '更新记录',
    //     icon: '',
    //     children: [
    //         {
    //             title: '更新消息',
    //             path: 'update',
    //         },
    //         {
    //             title: '历史记录',
    //             path: 'history',
    //         },
    //     ],
    // },
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
        icon: '',
        path: '/newCompany/revenue',
        component: Revenue,
    },
    {
        title: '需求和建议',
        icon: '',
        path: '/newCompany/suggest',
        component: Suggest,
    },
]
export default class NewCompany extends PureComponent {
    render() {
        return <MenuLayout menu={menu} />
    }
}
