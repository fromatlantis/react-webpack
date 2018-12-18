import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from './LoginForm'
import { actions } from 'reduxDir/authUser'

const mapStateToProps = (state) => {
    return {
        toPath: state.authUser.toPath,
        auth: state.authUser.auth,
        user: state.authUser.user
    } 
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login: actions.login
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
