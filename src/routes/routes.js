import Loadable from 'react-loadable';
import Loading from '../components/Loading/FullScreen';

import createHouse from '../screens/Home/CreateHouse/Connect'
import UpdateHouse from '../screens/Home/UpdateHouse/Connect'
import BuildingDetails from '../screens/Home/BuildingDetails/Connect'
import HouseDetails from '../screens/Home/HouseDetails/Connect'

// 租赁管理=>租赁房源=》房间详情
import LeaseHouseDetails from '../screens/LeaseHouse/LeaseHouseDetails/Connect'

// 租赁管理=》租赁申请=》提交申请
import SubmitApply from '../screens/LeaseApply/SubmitApply/Connect'
// 租赁管理=》租赁申请=》房间详情
import LeaseApplyDetiles from '../screens/LeaseApply/LeaseApplyDetiles/Connect'

// 租赁审批=》审批申请
import ApprovalApply from '../screens/LeaseApproval/ApprovalApply/Connect'
// 租赁审批=》查看通过审批申请 
import SeeAdopt from '../screens/LeaseApproval/SeeAdopt/Connect'

// 包含children的不需要配置role
const routes = [
    {
        path: '/home',
        name: '房源管理',
        icon: 'appstore',
        navAttr: {
            index: 1,
        },
        role: '房源管理',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "home" */'../screens/Home/Connect'),
            loading: Loading,
        })
    }, {
        path: "/createHouse",
        component: createHouse,
        role: '房源管理',
    }, {
        path: '/updateHouse/:id',
        component: UpdateHouse,
    }, {
        path: '/buildingDetails/:id',
        component: BuildingDetails,
    }, {
        path: '/houseDetails/:id/:id2',
        component: HouseDetails,
    }, {
        path: '/lease',
        name: '租赁管理',
        icon: 'appstore',
        navAttr: {
            index: 2
        },
        children: [
            {
                path: '/leaseHouse',
                name: '租赁房源',
                role: '租赁房源',
                icon: 'appstore',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "leaseHouse" */'../screens/LeaseHouse/Connect'),
                    loading: Loading,
                }),
            }, {
                path: '/leaseApply',
                name: '租赁申请',
                // 所有人可见
                icon: 'appstore',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "leaseApply" */'../screens/LeaseApply/Connect'),
                    loading: Loading,
                }),
            }, {
                path: '/leaseApproval',
                name: '租赁审批',
                role: '租赁审批',
                icon: 'appstore',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "leaseApproval" */'../screens/LeaseApproval/Connect'),
                    loading: Loading,
                }),
            }
        ]
    }, {
        path: '/leaseHouseDetails/:id/:id2',
        component: LeaseHouseDetails,
    }, {
        path: '/submitApply/:id/:name/:rentPrice',
        component: SubmitApply,
    }, {
        path: '/approvalApply/:id',
        component: ApprovalApply,
    }, {
        path: '/seeAdopt/:id',
        component: SeeAdopt,
    }, {
        path: '/leaseApplyDetiles/:id',
        component: LeaseApplyDetiles,
    }
];

const filterByAuths = (routes = [], auths = []) => {
    return routes.filter(route => {
        if(route.children && route.children.length > 0){
            return route.children.map(child=>{
                if(!route.role || auths.includes(child.role)){
                    return true
                }else{
                    return false
                }
            })
        }else{
            // 没有配置role，则全部可见
            return !route.role || auths.includes(route.role)
        }
    })
}
export const getNav = (auths) => {
    //auths = ['房源管理', '租赁审批']
    const navs = routes.filter(item => item.navAttr).map(item => {
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
    console.log(filterByAuths(navs, auths))
    return filterByAuths(navs, auths)
}
// 首个路由
export const getFirst = (auths) => {
    const firstNav = getNav(auths)[0]
    return firstNav && firstNav.children.length > 0 ? firstNav.children[0].path : firstNav.path 
}
export default (auths) => {
    let allRoutes = []
    routes.map(item => {
        if (item.children) {
            item.children.map(child => {
                let first = {
                    path: child.path,
                    component: child.component,
                    role: child.role
                }
                allRoutes.push(first)
                return true
            })
        } else {
            let first = {
                path: item.path,
                component: item.component,
                role: item.role
            }
            allRoutes.push(first)
        }
        return true;
    })
    return allRoutes.filter(route => !route.role || auths.includes(route.role));
}