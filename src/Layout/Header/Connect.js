import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './Header'
import { actions } from 'reduxDir/authUser'

const mapStateToProps = (state) => {
    return {
        user: state.authUser.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logout: actions('logout')
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
