import React from 'react'
import Loadable from 'react-loadable'
import Loading from '../components/Loading/FullScreen'
const routes = [
    {
        path: '/home',
        title: '首页',
        icon: 'appstore',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "home" */ '../screens/Home'),
            loading: Loading,
        }),
    },
    {
        title: '二级导航',
        icon: 'appstore',
        children: [
            {
                path: '/submenu',
                title: '演示',
                // role: '演示',
                component: () => <span>二级导航</span>,
            },
        ],
    },
]
export { routes }
