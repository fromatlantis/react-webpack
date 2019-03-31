import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, message } from "antd";

import { getNav } from '../../routes/routes';

const SubMenu = Menu.SubMenu;

let Navigation = withRouter(({ history, location, match, items, style, auths }) => {
    const menu = getNav();
    let link = (e, item) => {
        // if(!auths.includes(item.name)) {
        //     e.preventDefault()
        //     message.warning('您没有对应的权限')
        // }
    }
    let generateMenu = () => {
        return menu.map((item, index) => {
            if (item.children.length > 0) {
                return (
                    <SubMenu title={<span className="submenu-title-wrapper">{item.name}</span>} key={index}>
                        {
                            item.children.map(item => {
                                return (
                                    <Menu.Item key={item.path}>
                                        <NavLink to={item.path} onClick={(e) => { link(e, item) }}>
                                            <span>{item.name}</span>
                                        </NavLink>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={item.path}>
                        <NavLink to={item.path} onClick={(e) => { link(e, item) }}>
                            <span>{item.name}</span>
                        </NavLink>
                    </Menu.Item>
                )
            }
        })
    }
    const openKeys = "/" + location.pathname.match(/[^/]+/);
    return (
        <Menu
            selectedKeys={[location.pathname]}
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
