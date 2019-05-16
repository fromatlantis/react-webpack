import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import GoHandle from './GoHandle'
import { actions } from '../../../../redux/agencyRequire'

const mapStateToProps = state => {
    return {
        demandList: state.agencyRequire.demandList[0] || state.agencyRequire.demandList,
        supperList: state.agencyRequire.supperList,
        ServiceTypeList: state.agencyRequire.ServiceTypeList,
        supperListTotal: state.agencyRequire.supperListTotal,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getDemandList: actions('getDemandList'),
            getSupplierList: actions('getSupplierList'),
            getServiceTypeList: actions('getServiceTypeList'),
            recommendSupplier: actions('recommendSupplier'),
            updateType: actions('updateType'),
        },
        dispatch,
    )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(GoHandle)
