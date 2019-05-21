import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SupplierDetail from './SupplierDetail'
import { actions } from '../../../../redux/agencyRequire'

const mapStateToProps = state => {
    return {
        supperList: state.agencyRequire.supperList[0] || state.agencyRequire.supperList,
        demandList: state.agencyRequire.demandList,
        demandTotal: state.agencyRequire.demandTotal,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSupplierList: actions('getSupplierList'),
            getDemandList: actions('getDemandList'),
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierDetail)
