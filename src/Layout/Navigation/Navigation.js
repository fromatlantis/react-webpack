import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { Menu } from 'antd'
import { getNav } from '../../routes/routes'

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
                                <span>{item.name}</span>
                            </span>
                        }
                    >
                        {this.generateMenu(item.children)}
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
    render() {
        const { location } = this.props.router
        const openKeys = '/' + location.pathname.match(/[^/]+/)
        // console.log(this.props.auths)
        const menu = getNav(this.props.auths)
        return (
            <Menu
                //defaultSelectedKeys={[location.pathname]}
                selectedKeys={[openKeys]}
                defaultOpenKeys={[openKeys]}
                mode="horizontal"
                style={{ lineHeight: '64px' }}
                theme="dark"
            >
                {this.generateMenu(menu)}
            </Menu>
        )
    }
}

export default NewNavigation
