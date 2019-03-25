import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UpdateHouse from './UpdateHouse'
import { actions } from '../../../redux/houseManage'

const mapStateToProps = (state) => {
    return {
        houseDetail: state.houseManage.houseDetail, //获取de房源详情
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //修改房源信息
        updateHouseInfo: actions('updateHouseInfo'),
         //获取房源详情
        getHouseDetail: actions('getHouseDetail'),
        //改变tag标签
        storeTabActive: actions('storeTabActive'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHouse)