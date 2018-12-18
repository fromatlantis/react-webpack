/**
 * @description 建议有服务端返回数据集, 防止权限码暴露在客户端
 * icon 作为小图标
 * name 菜单名
 * children 子菜单集合
 */
const menuData = [
    // 平台监控
    {
        icon: 'dashboard',
        path: 'home',
        name: '首页',
        children: [
            {
                icon: 'pie-chart',
                path: 'home',
                name: '首页'
            }
        ]
    }
]

/**
 * 格式化菜单数据, 针对路径做拼接处理
 */
function _formatter(menuData, rootPath = "/") {
    return menuData.map((item) => {
        let { path } = item;
        path = rootPath + path;
        const result = {
            ...item,
            path
        }
        if (item.children) {
            result.children = _formatter(item.children, `${path}/`);
        }

        return result;
    })
}

export const navData = () => _formatter(menuData)

