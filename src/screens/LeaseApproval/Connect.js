import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LeaseApproval from './LeaseApproval'
import { actions } from '../../redux/leaseManage'

const mapStateToProps = (state) => {
    return {
        approveStatus: state.leaseManage.approveStatus, //统计当前用审批的企业入驻申请以及未审批的申请数量
        enterApplyLists: state.leaseManage.enterApplyLists, //企业入驻申请列表查询list
        totalCountEnterApplyLists: state.leaseManage.totalCountEnterApplyLists, //企业入驻申请列表查询的总条数

        searchParamsEnterApplyLists: state.leaseManage.searchParamsEnterApplyLists, //企业入驻申请列表查询
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //POST / 企业入驻申请列表查询
        getEnterApplyLists: actions('getEnterApplyLists'),
        //统计当前用审批的企业入驻申请以及未审批的申请数量
        statApproveStatus: actions('statApproveStatus'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaseApproval)