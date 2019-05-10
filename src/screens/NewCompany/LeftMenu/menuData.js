import { Info } from '../Forms'
export const menuData = [
    {
        title: '企业名片',
        icon: '',
        children: [
            {
                title: '企业信息',
                path: 'info',
                component: Info,
            },
            {
                title: '标签维护',
                path: 'tags',
            },
        ],
    },
    {
        title: '基本信息',
        icon: '',
        children: [
            {
                title: '工商信息',
                path: 'business',
            },
            {
                title: '融资信息',
                path: 'finance',
            },
            {
                title: '核心人员',
                path: 'members',
            },
            {
                title: '相关新闻',
                path: 'news',
            },
            {
                title: '主要产品',
                path: 'product',
            },
        ],
    },
    {
        title: '投资关系',
        icon: '',
        children: [
            {
                title: '投资事件',
                path: 'event',
            },
            {
                title: '对外投资',
                path: 'outward',
            },
        ],
    },
    {
        title: '知识产权',
        icon: '',
        children: [
            {
                title: '商标信息',
                path: 'trademark',
            },
            {
                title: '专利信息',
                path: 'patent',
            },
            {
                title: '软件著作权',
                path: 'copyright',
            },
            {
                title: '作品著作权',
                path: 'works',
            },
            {
                title: '网站域名',
                path: 'website',
            },
        ],
    },
    {
        title: '更新记录',
        icon: '',
        children: [
            {
                title: '更新消息',
                path: 'update',
            },
            {
                title: '历史记录',
                path: 'history',
            },
        ],
    },
    {
        title: '新闻舆情',
        icon: '',
        path: 'sentiment',
    },
    {
        title: '企业需求',
        icon: '',
        path: 'requirement',
    },
    {
        title: '改进建议',
        icon: '',
        path: 'suggest',
    },
    {
        title: '其他信息',
        icon: '',
        path: 'other',
    },
    {
        title: '企业档案',
        icon: '',
        path: 'files',
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
    return menuData
        .filter(route => route.children)
        .map(route => route.children)
        .reduce((a, b) => {
            return a.concat(b)
        })
        .concat(routes)
}
