import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BuildingDetails from './BuildingDetails'
import { actions } from '../../../redux/houseManage'

const mapStateToProps = (state) => {
    return {
        buildingDetail: state.houseManage.buildingDetail,  //获取楼宇详情
        allHouseList: state.houseManage.allHouseList,  //获取所在楼的所有房间分页列表
        totalCountAllHouse: state.houseManage.totalCountAllHouse, //获取所在楼的所有房间分页列表de总条数

        searchParamsAllHouse: state.houseManage.searchParamsAllHouse, //获取所在楼的所有房间列表de参数
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //获取楼宇详情
        getBuildingDetail: actions('getBuildingDetail'),
        //获取所在楼的所有房间列表 
        getAllHouseList: actions('getAllHouseList'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails)