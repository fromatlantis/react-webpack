import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
@connect(state => {
    return {
        auths: state.authUser.auths,
    }
})
class AuthWrapper extends PureComponent {
    render() {
        const { auths, role, children } = this.props
        if (role && !auths.includes(role)) {
            return <Fragment />
        } else {
            return children
        }
    }
}
export default AuthWrapper
