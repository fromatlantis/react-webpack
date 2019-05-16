import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GoView from './GoView'
import { actions } from '../../../../redux/agencyRequire'

const mapStateToProps = state => {
    return {
        demandList: state.agencyRequire.demandList[0] || state.agencyRequire.demandList,
        supperList: state.agencyRequire.supperList,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDemandList: actions('getDemandList'),
            getSupplierList: actions('getSupplierList'),
            finishOrder: actions('finishOrder'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GoView)
