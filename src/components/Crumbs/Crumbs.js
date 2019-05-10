import React, { Component } from 'react'
import styles from './Crumbs.module.css'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

class Crumbs extends Component {
    gpush(nav) {
        this.props.push(nav)
    }
    items() {
        let { routes } = this.props
        let items = []
        for (let i = 0; i < routes.length; i++) {
            if (i === 0) {
                items.push(
                    <p key={i} onClick={() => this.gpush(routes[i].path)} className={styles.item}>
                        {routes[i].breadcrumbName}
                    </p>,
                )
            } else if (i === routes.length - 1) {
                items.push(
                    <p
                        key={i}
                        onClick={() => this.gpush(routes[i].path)}
                        className={styles.itemlast}
                    >
                        / {routes[i].breadcrumbName}
                    </p>,
                )
            } else {
                items.push(
                    <p key={i} onClick={() => this.gpush(routes[i].path)} className={styles.item}>
                        / {routes[i].breadcrumbName}
                    </p>,
                )
            }
        }
        return <div className={styles.items}>{items}</div>
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
