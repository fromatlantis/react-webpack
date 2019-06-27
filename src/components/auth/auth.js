import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const mapStateToProps = state => ({})

export const mapDispatchToProps = {}

export const hocComponentName = WrappedComponent => {
    return class auth extends PureComponent {
        render() {
            const { auth, authList, ...props } = this.props
            if (auth && authList.indexOf(auth) === -1) {
                return null
            }
            return <WrappedComponent {...props} />
        }
    }
}

export default WrapperComponent =>
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(hocComponentName(WrapperComponent))
