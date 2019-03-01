import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UpdateBuilding from './UpdateBuilding'
import { actions } from '../../../redux/houseManage'

const mapStateToProps = (state) => {
    return {
        buildingDetail: state.houseManage.buildingDetail,  //获取楼宇详情
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //修改楼宇信息 
        updateBuildingInfo: actions('updateBuildingInfo'),
        //获取楼宇详情
        getBuildingDetail: actions('getBuildingDetail'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateBuilding)