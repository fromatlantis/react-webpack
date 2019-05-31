import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'

import styles from './LeftMenu.module.css'

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
                    <Menu.Item key={item.path}>
                        <NavLink to={item.path}>
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
        const { menuData } = this.props
        return (
            <Menu
                className={styles.menu}
                selectedKeys={[pathname]}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                mode="inline"
            >
                {this.renderMenu(menuData.filter(item => item.display !== 'none'))}
            </Menu>
        )
    }
}
export default LeftMenu
