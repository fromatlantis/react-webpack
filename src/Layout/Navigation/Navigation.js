import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, message } from 'antd'

import { getNav } from '../../routes/routes'

const SubMenu = Menu.SubMenu

let Navigation = withRouter(({ history, location, match, items, style, auths }) => {
    const menu = getNav(auths)
    let link = (e, item) => {
        // if(!auths.includes(item.name)) {
        //     e.preventDefault()
        //     message.warning('您没有对应的权限')
        // }
    }
    let generateMenu = menuData => {
        return menuData.map((item, index) => {
            if (item.children && item.children.length > 0) {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                {/* <Icon type={item.icon} theme="outlined" /> */}
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {generateMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.path}>
                        <NavLink to={item.path}>
                            <span>{item.name}</span>
                        </NavLink>
                    </Menu.Item>
                )
            }
        })
    }
    const openKeys = '/' + location.pathname.match(/[^/]+/)
    return (
        <Menu
            defaultSelectedKeys={[location.pathname]}
            //selectedKeys={[location.pathname]}
            defaultOpenKeys={[openKeys]}
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            theme="dark"
        >
            {generateMenu(menu)}
        </Menu>
    )
})
export default Navigation
