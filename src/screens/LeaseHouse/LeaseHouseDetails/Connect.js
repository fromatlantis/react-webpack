import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LeaseHouseDetails from './LeaseHouseDetails'
import { actions } from '../../../redux/leaseManage'

const mapStateToProps = (state) => {
    return {
        houseDetail:state.leaseManage.houseDetail, //获取de房源详情
        renterRecordList: state.leaseManage.renterRecordList,  //租赁管理-租赁房源(详情)-租客记录List 
        totalCountrenterRecord: state.leaseManage.totalCountrenterRecord,  //租赁管理-租赁房源(详情)-租客记录Listde总条数

        searchParamsrenterRecord: state.leaseManage.searchParamsrenterRecord, //租赁管理-租赁房源(详情)-租客记录List参数
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //获取房源详情
        getHouseDetail: actions('getHouseDetail'),
        //租赁管理-租赁房源(详情)-租客记录List 
        getRenterRecordList: actions('getRenterRecordList'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaseHouseDetails)