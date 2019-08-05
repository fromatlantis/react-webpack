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
export const filterMenu = (nodes, auths = []) => {
    const navs = []
    nodes.map(node => {
        if (node.path) {
            if (!node.role || (node.role && auths.includes(node.role))) {
                navs.push(node)
            }
        }
        if (Array.isArray(node.children)) {
            node.children = filterMenu(node.children, auths)
        }
    })
    return navs
}
export default (menu, auths) => {
    let routes = []
    flatRoute(routes, menu, auths)
    return routes
}
