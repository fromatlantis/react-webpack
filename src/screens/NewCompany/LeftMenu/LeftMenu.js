import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { menuData } from './menuData'

import styles from '../NewCompany.module.css'

const SubMenu = Menu.SubMenu

@connect(state => ({ router: state.router }))
class LeftMenu extends PureComponent {
    rootSubmenuKeys = ['1', '2', '3']
    state = {
        openKeys: ['1'],
    }
    renderMenu = data => {
        return data.map((item, index) => {
            if (item.children) {
                return (
                    <SubMenu
                        key={index}
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            } else {
                return (
                    <Menu.Item key={`/newCompany/${item.path}`}>
                        <NavLink to={`/newCompany/${item.path}`}>
                            <Icon type="appstore" />
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                )
            }
        })
    }
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys })
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            })
        }
    }
    render() {
        let { pathname } = this.props.router.location
        console.log(pathname)
        return (
            <Menu
                className={styles.menu}
                //style={{ width: 256 }}
                defaultSelectedKeys={[pathname]}
                //defaultOpenKeys={['0']}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                mode="inline"
            >
                {this.renderMenu(menuData)}
            </Menu>
        )
    }
}
export default LeftMenu
