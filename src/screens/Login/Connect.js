import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from './LoginForm'
import { actions } from 'reduxDir/authUser'

const mapStateToProps = (state) => {
    return {
       
    } 
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login: actions('login')
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
