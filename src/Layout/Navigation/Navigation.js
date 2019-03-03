import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

import { getNav } from '../../routes/routes';

const SubMenu = Menu.SubMenu;

let Navigation = withRouter(({ history, location, match, items, style }) => {
    const menu = getNav();
    let generateMenu = () => {
        return menu.map((item, index) => {
            if(!(item.children==null)){
                return(
                    <SubMenu title={<span className="submenu-title-wrapper"><Icon type={item.icon} />{item.name}</span>} key={index}>
                            <Menu.Item key={item.children[0].path}>
                                <NavLink to={item.children[0].path}>
                                    <Icon type={item.icon} />
                                    <span>{item.children[0].name}</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={item.children[1].path}>
                                <NavLink to={item.children[1].path}>
                                    <Icon type={item.icon} />
                                    <span>{item.children[1].name}</span>
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key={item.children[2].path}>
                                <NavLink to={item.children[2].path}>
                                    <Icon type={item.icon} />
                                    <span>{item.children[2].name}</span>
                                </NavLink>
                            </Menu.Item>
                    </SubMenu>
                )
            }else{
                return (
                    <Menu.Item key={item.path}>
                        <NavLink to={item.path}>
                            <Icon type={item.icon} />
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
