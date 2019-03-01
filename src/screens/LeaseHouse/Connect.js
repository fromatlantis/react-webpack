import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LeaseHouse from './LeaseHouse'
import { actions } from '../../redux/leaseManage'

const mapStateToProps = (state) => {
    return {
        rentHouseList:state.leaseManage.rentHouseList, //租赁管理-租赁房源List 
        totalCountRentHouse: state.leaseManage.totalCountRentHouse, //租赁管理-租赁房源List 的总条数

        searchParamsRh: state.leaseManage.searchParamsRh, //租赁管理-租赁房源List 参数
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //租赁管理-租赁房源List 
        getRentHouseList: actions('getRentHouseList'),
        //GET房源发布
        housePublish: actions('housePublish'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaseHouse)