import Loadable from 'react-loadable'
import Loading from '../components/Loading/FullScreen'

const routes = [
    {
        path: '/repair',
        name: '物业报修',
        icon: 'appstore',
        navAttr: {
            index: 1,
            role: 'repair',
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "repair" */ '../screens/Repair/Repair'),
            loading: Loading,
        }),
    },
    {
        path: '/dispatch',
        name: '物业派工',
        icon: 'appstore',
        navAttr: {
            index: 1,
            role: 'dispatch',
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "dispatch" */ '../screens/Dispatch/Dispatch'),
            loading: Loading,
        }),
    },
    {
        path: '/feedback',
        name: '物业反馈',
        icon: 'appstore',
        navAttr: {
            index: 1,
            role: 'feedback',
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "feedback" */ '../screens/Feedback/Feedback'),
            loading: Loading,
        }),
    },
    {
        path: '/material',
        name: '物料管理',
        icon: 'appstore',
        navAttr: {
            index: 4,
            role: 'material',
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "material" */ '../screens/Material/Material'),
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
    // auths = ['房源管理', '租赁审批']
    const navs = routes
        .filter(item => item.navAttr)
        .map(item => {
            return {
                name: item.name,
                path: item.path,
                icon: item.icon,
                role: item.role,
                //children: item.children,
                children: filterByAuths(item.children, auths),
            }
        })
    //return navs
    // console.log(filterByAuths(navs, auths))
    return filterByAuths(navs, auths)
}
// 首个路由
export const getFirst = auths => {
    const firstNav = getNav(auths)[0]
    return firstNav && firstNav.children.length > 0 ? firstNav.children[0].path : firstNav.path
}
export default auths => {
    // auths = ['房源管理', '租赁审批']
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
