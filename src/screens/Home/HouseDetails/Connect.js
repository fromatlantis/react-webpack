import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HouseDetails from './HouseDetails'
import { actions } from '../../../redux/houseManage'

const mapStateToProps = (state) => {
    return {
        houseDetail:state.houseManage.houseDetail, //获取de房源详情
        renterRecordList: state.houseManage.renterRecordList,  //租赁管理-租赁房源(详情)-租客记录List 
        totalCountrenterRecord: state.houseManage.totalCountrenterRecord,  //租赁管理-租赁房源(详情)-租客记录Listde总条数

        searchParamsrenterRecord: state.houseManage.searchParamsrenterRecord, //租赁管理-租赁房源(详情)-租客记录List参数
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //获取房源详情
        getHouseDetail: actions('getHouseDetail'),
        //租赁管理-租赁房源(详情)-租客记录List 
        getRenterRecordList: actions('getRenterRecordList'),
        //添加租客
        addRenter: actions('addRenter'),
        //修改租客信息
        updateRenterInfo: actions('updateRenterInfo'),
        //改变tag标签
        storeTabActive: actions('storeTabActive'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseDetails)