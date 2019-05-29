import React, { Component } from 'react'
import styles from './Crumbs.module.css'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { Breadcrumb } from 'antd'

class Crumbs extends Component {
    gpush(nav) {
        this.props.push(nav)
    }
    items() {
        let { routes } = this.props
        let items = []
        for (let i = 0; i < routes.length; i++) {
            items.push(
                <Breadcrumb.Item>
                    <Link to={routes[i].path}>{routes[i].breadcrumbName}</Link>
                </Breadcrumb.Item>,
            )
        }
        return <Breadcrumb className={styles.items}>{items}</Breadcrumb>
    }
    render() {
        return <div className={styles.border}>{this.items()}</div>
    }
}

const mapStateToProps = state => {
    return {
        router: state.router,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            push: push,
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Crumbs)
