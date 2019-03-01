import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ApprovalApply from './ApprovalApply'
import { actions } from '../../../redux/leaseManage'

const mapStateToProps = (state) => {
    return {
        enterApplyDetail: state.leaseManage.enterApplyDetail, //GET企业入驻申请详情
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //GET企业入驻申请详情
        getEnterApplyDetail: actions('getEnterApplyDetail'),
        //POST /  指定入驻申请，审批操作
        enterApprove: actions('enterApprove'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalApply)