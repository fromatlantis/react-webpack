export default menu => {
    let routes = menu
        .filter(route => route.path)
        .map(route => {
            return {
                title: route.title,
                path: route.path,
                component: route.component,
            }
        })
    return routes
    // return menuData
    //     .filter(route => route.children)
    //     .map(route => route.children)
    //     .reduce((a, b) => {
    //         return a.concat(b)
    //     })
    //     .concat(routes)
}
