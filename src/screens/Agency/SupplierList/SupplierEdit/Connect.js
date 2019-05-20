import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import supplierEdit from './SupplierEdit'
import { actions } from '../../../../redux/agencyRequire'

const mapStateToProps = state => {
    return {
        ServiceTypeList: state.agencyRequire.ServiceTypeList,
        supperList: state.agencyRequire.supperList[0] || state.agencyRequire.supperList,
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateSupplier: actions('updateSupplier'),
            getServiceTypeList: actions('getServiceTypeList'),
            getSupplierList: actions('getSupplierList'),
        },
        dispatch,
    )
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(supplierEdit)
