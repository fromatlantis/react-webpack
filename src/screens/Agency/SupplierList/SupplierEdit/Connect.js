import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import supplierEdit from './SupplierEdit'
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
            updateSupplier: actions('updateSupplier'),
            getServiceTypeList: actions('getServiceTypeList'),
            getSupplierDetail: actions('getSupplierDetail'),
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(supplierEdit)
