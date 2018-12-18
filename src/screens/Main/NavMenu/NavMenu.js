import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";
import styles from './NavMenu.module.css';
import logo from 'assets/logo.png';
import { navData } from '../../../route/menu';
const SubMenu = Menu.SubMenu;

let NavMenu = withRouter(({ history, location, match, items, style }) => {
    const menu = navData();
    let generateMenu = (menuData) => {
        return menuData.map((item, index) => {
            if (item.children && item.children.length > 0) {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                <Icon type={item.icon} theme="outlined" />
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

        <div>
            <div className={styles.title}>
                <img src={logo} alt="logo" />
                数字园区云
            </div>
            <Menu
                defaultSelectedKeys={[location.pathname]}
                defaultOpenKeys={[openKeys]}
                mode="inline"
                theme="dark"
            //inlineCollapsed={this.state.collapsed}
            >
                {generateMenu(menu)}
            </Menu>
        </div>
    );
});
export default NavMenu;
