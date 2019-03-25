import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreateHouse from './CreateHouse'
import { actions } from '../../../redux/houseManage'

const mapStateToProps = (state) => {
    return {
        buildingName: state.houseManage.buildingName, //房源管理==》新建房间下获取楼栋名称
        buildingNo: state.houseManage.buildingNo, //获取de楼栋编号
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //获取楼栋名称(模糊匹配)
        getBuildingName: actions('getBuildingName'),
        //添加房源信息
        addHouseInfo: actions('addHouseInfo'),
        //获取楼栋编号
        getBuildingNo: actions('getBuildingNo'),
        //改变tag标签
        storeTabActive: actions('storeTabActive'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateHouse)