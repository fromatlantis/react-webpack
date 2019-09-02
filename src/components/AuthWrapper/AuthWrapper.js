import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
@connect(state => {
    return {
        auths: state.authUser.auths,
    }
})
class AuthWrapper extends PureComponent {
    render() {
        const { auths, auth, children } = this.props
        if (auth && !auths.includes(auth)) {
            return <Fragment />
        } else {
            return children
        }
    }
}
export default AuthWrapper
