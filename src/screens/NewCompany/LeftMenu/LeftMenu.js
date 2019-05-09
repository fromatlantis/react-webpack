import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
import { menuData } from './menuData'

const SubMenu = Menu.SubMenu

@connect(state => ({ router: state.router }))
class LeftMenu extends PureComponent {
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
                            <span>{item.title}</span>
                        </NavLink>
                    </Menu.Item>
                )
            }
        })
    }
    render() {
        let { pathname } = this.props.router.location
        console.log(pathname)
        return (
            <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={['0']}
                mode="inline"
            >
                {this.renderMenu(menuData)}
            </Menu>
        )
    }
}
export default LeftMenu
