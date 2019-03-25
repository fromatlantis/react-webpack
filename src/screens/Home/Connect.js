import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import index from './index'
import { actions } from '../../redux/houseManage'

const mapStateToProps = (state) => {
    return {
        projectDetail: state.houseManage.projectDetail, //获取园区项目de详情
        buildingInfoListList: state.houseManage.buildingInfoList, //获取楼宇分页列表
        totalCount: state.houseManage.totalCount, //获取楼宇分页列表de总条数
        houseList: state.houseManage.houseList, // 分页查询房源列表
        totalCountHouse: state.houseManage.totalCountHouse, //分页查询房源列表de总条数

        searchParams: state.houseManage.searchParams, //获取楼宇分页列表de参数
        searchParamsHouse: state.houseManage.searchParamsHouse, //分页查询房源列表de参数

        user: state.authUser.user,//用户信息
        tabActive: state.houseManage.tabActive, //标签选择值
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //获取园区项目详情
        getProjectDetail: actions('getProjectDetail'),
        //修改园区项目信息 
        updateProjectInfo: actions('saveOrUpdateProjectInfo'),
        //获取楼宇分页列表
        buildingInfoList: actions('buildingInfoList'),
         //添加楼宇信息 
        AddBuilding: actions('AddBuilding'),
        //修改楼宇信息 
        updateBuildingInfo: actions('updateBuildingInfo'),
        //添加房源信息
        addHouseInfo: actions('addHouseInfo'),
        //分页查询房源列表 
        getHouseList: actions('getHouseList'),
        //修改房源信息
        updateHouseInfo: actions('updateHouseInfo'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(index)