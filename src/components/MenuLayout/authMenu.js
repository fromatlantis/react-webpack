const flatRoute = (routes, nodes, auths = []) => {
    nodes.map(node => {
        if (node.path) {
            if (!node.role || (node.role && auths.includes(node.role))) {
                routes.push(node)
            }
        }
        if (Array.isArray(node.children)) {
            flatRoute(routes, node.children, auths)
        }
    })
}
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
export const getNav = (routes, auths) => {
    const navs = routes.map(item => {
        const children = filterByAuths(item.children, auths)
        return {
            title: item.title,
            path: item.path,
            icon: item.icon,
            role: item.role,
            ...(children.length > 0 ? { children } : null),
        }
    })
    return filterByAuths(navs, auths)
}
export default (menu, auths) => {
    let routes = []
    flatRoute(routes, menu, auths)
    return routes
}
