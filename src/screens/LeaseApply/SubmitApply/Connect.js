import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SubmitApply from './SubmitApply'
import { actions } from '../../../redux/leaseManage'

const mapStateToProps = (state) => {
    return {
        // houseDetail: state.leaseManage.houseDetail, //获取de房源详情
        user: state.authUser.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //POST/ 新增企业入驻申请
        saveCompamyApply :actions('saveCompamyApply'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitApply)