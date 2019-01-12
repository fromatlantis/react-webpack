import Loadable from 'react-loadable';
import Loading from '../components/Loading/FullScreen';

const routes = [
    {
        path: '/home',
        name: '首页',
        icon: 'appstore',
        navAttr: {
            index: 1,
            role: 'home'
        },
        component: Loadable({
            loader: () => import(/* webpackChunkName: "home" */'../screens/Home'),
            loading: Loading,
        })
    }
];
export const getNav = () => {
    return routes.filter(item => item.navAttr).map(item => {
        return {
            name: item.name,
            path: item.path,
            icon: item.icon
        }
    })
}
export default () => {
    return routes.map(item => {
        return {
            path: item.path,
            component: item.component
        }
    })
}
