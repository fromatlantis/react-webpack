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

const routes = [
    {
        path: '/home',
        name: '房源管理',
        icon: 'appstore',
        navAttr: { 
            index: 1,
            role: 'home'
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "home" */'../screens/Home/Connect'),
            loading: Loading,
        })
    },{
        path: "/createHouse",
        component: createHouse,
    },{
        path: '/updateHouse/:id',
        component: UpdateHouse,
    },{
        path: '/buildingDetails/:id',
        component: BuildingDetails,
    },{
        path: '/houseDetails/:id/:id2',
        component: HouseDetails,
    },{
        path: '/lease',
        name: '租赁管理',
        icon: 'appstore',
        navAttr: { 
            index: 2,
            role: 'lease'
        },
        children: [
            {
                path: '/leaseHouse',
                name: '租赁房源',
                icon: 'appstore',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "leaseHouse" */'../screens/LeaseHouse/Connect'),
                    loading: Loading,
                }),
            },{
                path: '/leaseApply',
                name: '租赁申请',
                icon: 'appstore',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "leaseApply" */'../screens/LeaseApply/Connect'),
                    loading: Loading,
                }),
            },{
                path: '/leaseApproval',
                name: '租赁审批',
                icon: 'appstore',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "leaseApproval" */'../screens/LeaseApproval/Connect'),
                    loading: Loading,
                }),
            }
        ]
    },{
        path: '/leaseHouseDetails/:id/:id2', 
        component: LeaseHouseDetails,
    },{
        path: '/submitApply/:id/:name', 
        component: SubmitApply,
    },{
        path: '/approvalApply/:id', 
        component: ApprovalApply,
    },{
        path: '/seeAdopt/:id', 
        component: SeeAdopt,
    },{
        path: '/leaseApplyDetiles/:id/:id2', 
        component: LeaseApplyDetiles,
    }
];
export const getNav = () => {
    return routes.filter(item => item.navAttr).map(item => {
        return {
            name: item.name,
            path: item.path,
            icon: item.icon,
            children: item.children,
        }
    })
}
export default () => {
    let allRoutes = []
    routes.map(item => {
        if(!(item.children==null)){
            for(let i=0;i<=2;i++){
                let first =  {
                    path: item.children[i].path,
                    component: item.children[i].component,
                }
                allRoutes.push(first)
            }
        }else{
            let first =  {
                path: item.path,
                component: item.component
            }
            allRoutes.push(first)
        }
    })
    return allRoutes;
}
