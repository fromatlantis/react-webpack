import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HourWage from './HourWage'
import { actions } from '../../../redux/configuration'

const mapStateToProps = state => {
    return {
        setDataList: state.configuration.setDataList,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSetInfo: actions('getSetInfo'),
            setTimeLimit: actions('setTimeLimit'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(HourWage)
