import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SubmitApply from './SubmitApply'
import { actions } from '../../../redux/leaseManage'

const mapStateToProps = (state) => {
    return {
        // houseDetail: state.leaseManage.houseDetail, //获取de房源详情
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
         //获取房源详情
        // getHouseDetail: actions('getHouseDetail'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitApply)