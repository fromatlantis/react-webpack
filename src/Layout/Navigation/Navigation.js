import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Menu } from 'antd'
import { routes } from '../../routes/routes'
import { getNav } from '../../utils/authRouter'

const SubMenu = Menu.SubMenu

@connect(state => ({
    router: state.router,
    auths: state.authUser.auths,
}))
class NewNavigation extends PureComponent {
    static propTypes = {
        //prop: PropTypes
    }
    generateMenu = menuData => {
        return menuData.map((item, index) => {
            if (item.children && item.children.length > 0) {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                {/* <Icon type={item.icon} theme="outlined" /> */}
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.generateMenu(item.children)}
                    </SubMenu>
                )
            } else if (item.path) {
                return (
                    <Menu.Item key={item.path}>
                        <NavLink to={item.path}>
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                )
            } else {
                return null
            }
        })
    }
    render() {
        const { location } = this.props.router
        const openKeys = '/' + location.pathname.match(/[^/]+/)
        const navs = getNav(routes, this.props.auths)
        return (
            <Menu
                //defaultSelectedKeys={[location.pathname]}
                selectedKeys={[openKeys]}
                defaultOpenKeys={[openKeys]}
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                theme="dark"
            >
                {this.generateMenu(navs)}
            </Menu>
        )
    }
}

export default NewNavigation
