import Loadable from 'react-loadable'
import Loading from '../components/Loading/FullScreen'
const routes = [
    {
        path: '/bill',
        name: '客户账单',
        role: '客户账单',
        icon: 'appstore',
        navAttr: {
            index: 1,
            role: 'home',
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "customerBill" */ '../screens/CustomerBill'),
            loading: Loading,
        }),
    },
    {
        path: '/record',
        name: '收费记录',
        role: '收费记录',
        icon: 'appstore',
        navAttr: {
            index: 1,
            role: 'home',
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "record" */ '../screens/Record'),
            loading: Loading,
        }),
    },
    {
        path: '/stats',
        name: '统计分析',
        role: '统计分析',
        icon: 'appstore',
        navAttr: {
            index: 1,
            role: 'home',
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "stats" */ '../screens/Stat/Stat'),
            loading: Loading,
        }),
    },
]
const filterByAuths = (routes = [], auths = []) => {
    return routes.filter(route => {
        if (route.children && route.children.length > 0) {
            return route.children.map(child => {
                if (!route.role || auths.includes(child.role)) {
                    return true
                } else {
                    return false
                }
            })
        } else {
            // 没有配置role，则全部可见
            return !route.role || auths.includes(route.role)
        }
    })
}
export const getNav = auths => {
    // auths = []
    const navs = routes
        .filter(item => item.navAttr)
        .map(item => {
            return {
                name: item.name,
                path: item.path,
                icon: item.icon,
                role: item.role,
                children: filterByAuths(item.children, auths),
            }
        })
    // console.log(filterByAuths(navs, auths))
    return filterByAuths(navs, auths)
}

// 首个路由
export const getFirst = auths => {
    const firstNav = getNav(auths)[0]
    if (firstNav) {
        if (firstNav.children.length > 0) {
            return firstNav.children[0].path
        } else {
            return firstNav.path
        }
    } else {
        //如果没有任何菜单项
        return '/'
    }
}

export default auths => {
    // auths = []
    let allRoutes = []
    routes.map(item => {
        if (item.children) {
            item.children.map(child => {
                let first = {
                    path: child.path,
                    component: child.component,
                    role: child.role,
                }
                allRoutes.push(first)
                return true
            })
        } else {
            let first = {
                path: item.path,
                component: item.component,
                role: item.role,
            }
            allRoutes.push(first)
        }
        return true
    })
    return allRoutes.filter(route => !route.role || auths.includes(route.role))
}
