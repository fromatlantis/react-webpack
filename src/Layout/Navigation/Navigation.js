import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import { getNav } from '../../routes/routes';

let Navigation = withRouter(({ history, location, match, items, style }) => {
    const menu = getNav();
    let generateMenu = () => {
        return menu.map((item, index) => {
            return (
                <Menu.Item key={item.path}>
                    <NavLink to={item.path}>
                        <Icon type={item.icon} />
                        <span>{item.name}</span>
                    </NavLink>
                </Menu.Item>
            )
        })
    }
    const openKeys = "/" + location.pathname.match(/[^/]+/);
    return (
        <Menu
            defaultSelectedKeys={[location.pathname]}
            defaultOpenKeys={[openKeys]}
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            theme="dark"
        >
            {generateMenu()}
        </Menu>
    );
});
export default Navigation;
