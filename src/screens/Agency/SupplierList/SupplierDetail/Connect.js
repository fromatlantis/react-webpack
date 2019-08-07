import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SupplierDetail from './SupplierDetail'
import { actions } from '../../../../redux/agencyRequire'

const mapStateToProps = state => {
    return {
        ServiceTypeList: state.agencyRequire.ServiceTypeList,
        detail: state.agencyRequire.detail,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getSupplierDetail: actions('getSupplierDetail'),
            getServiceTypeList: actions('getServiceTypeList'),
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierDetail)
