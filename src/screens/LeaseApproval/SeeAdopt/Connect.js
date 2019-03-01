import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SeeAdopt from './SeeAdopt'
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
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeAdopt)