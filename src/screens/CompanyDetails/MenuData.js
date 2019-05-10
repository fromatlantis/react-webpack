/**
 * Menu的数据
 */
import Information from './Information/Information'
import Investment from './Investment/Investment'
import Relation from './Relation/Relation'
import Property from './Property/Property'
import Renew from './Renew/Renew'
import News from './News/News'
import Need from './Need/Need'
import Advice from './Advice/Advice'
import OtherMes from './OtherMes/OtherMes'
import Archives from './Archives/Archives'

import NewsDetails from './News/NewsDetails'

export const menuData = [
    {
        title: '基本信息',
        icon: '',
        path: 'information',
        component: Information,
        children: [
            {
                title: '企业动态',
                path: 'information',
                key: 'information:1',
                component: Information,
            },
            {
                title: '工商信息',
                path: 'information',
                key: 'information:2',
                component: Information,
            },
            {
                title: '融资信息',
                path: 'information',
                key: 'information:3',
                component: Information,
            },
            {
                title: '核心人员',
                path: 'information',
                key: 'information:4',
                component: Information,
            },
            {
                title: '主要产品',
                path: 'information',
                key: 'information:5',
                component: Information,
            },
        ],
    },
    {
        title: '投资关系',
        icon: '',
        path: 'investment',
        component: Investment,
        children: [
            {
                title: '投资事件',
                path: 'investment',
                key: 'Investment:1',
                component: Investment,
            },
            {
                title: '对外投资',
                path: 'investment',
                key: 'Investment:2',
                component: Investment,
            },
        ],
    },
    {
        title: '企业关系',
        icon: '',
        path: 'relation',
        component: Relation,
        children: [
            {
                title: '企业图谱',
                path: 'relation',
                key: 'relation:1',
                component: Relation,
            },
            {
                title: '投资图谱',
                path: 'relation',
                key: 'relation:2',
                component: Relation,
            },
        ],
    },
    {
        title: '知识产权',
        icon: '',
        path: 'property',
        component: Property,
        children: [
            {
                title: '商标信息',
                path: 'property',
                key: 'property:1',
                component: Property,
            },
            {
                title: '专利信息',
                path: 'property',
                key: 'property:2',
                component: Property,
            },
            {
                title: '软件著作权',
                path: 'property',
                key: 'property:3',
                component: Property,
            },
            {
                title: '作品著作权',
                path: 'property',
                key: 'property:4',
                component: Property,
            },
            {
                title: '网站域名',
                path: 'property',
                key: 'property:5',
                component: Property,
            },
        ],
    },
    {
        title: '更新记录',
        icon: '',
        path: 'renew',
        component: Renew,
        children: [
            {
                title: '更新消息',
                path: 'renew',
                key: 'renew:1',
                component: Renew,
            },
            {
                title: '历史记录',
                path: 'renew',
                key: 'renew:2',
                component: Renew,
            },
        ],
    },
    {
        title: '新闻舆情',
        icon: '',
        path: 'news',
        key: 'news',
        component: News,
    },
    {
        title: '企业需求',
        icon: '',
        path: 'need',
        key: 'need',
        component: Need,
    },
    {
        title: '改进建议',
        icon: '',
        path: 'advice',
        key: 'advice',
        component: Advice,
    },
    {
        title: '其他信息',
        icon: '',
        path: 'otherMes',
        key: 'otherMes',
        component: OtherMes,
    },
    {
        title: '企业档案',
        icon: '',
        path: 'archives',
        key: 'archives',
        component: Archives,
    },
    {
        /* 新闻舆情de列表详情页 */
        path: 'newsDetails',
        component: NewsDetails,
    },
]
export default () => {
    let routes = menuData
        .filter(route => route.path)
        .map(route => {
            return {
                title: route.title,
                path: route.path,
            }
        })
    return menuData.concat(routes)
}
