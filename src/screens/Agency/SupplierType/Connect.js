import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SupplierType from './SupplierType'
import { actions } from '../../../redux/agencyRequire'

const mapStateToProps = state => {
    return {
        ServiceTypeList: state.agencyRequire.ServiceTypeList,
        // editTypeList: state.agencyRequire.editTypeList[0] || state.agencyRequire.editTypeList
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getServiceTypeList: actions('getServiceTypeList'),
            addServiceType: actions('addServiceType'),
            updateServiceType: actions('updateServiceType'),
            deleteServiceType: actions('deleteServiceType'),
            editServiceTypeList: actions('editServiceTypeList'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierType)
