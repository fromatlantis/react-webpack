import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LeaseApply from './LeaseApply'
import { actions } from '../../redux/leaseManage'

const changeTitle = (state) =>{
    let allParksM = state.leaseManage.allParks
    let allParksUpdate = []

    for (let k in allParksM) {
        allParksUpdate.push({
            Names: allParksM[k].parkName,
            Ids: allParksM[k].parkId
        })
    }
    return allParksUpdate;
}
const changeTitle2 = (state) =>{
    let allParksM = state.leaseManage.buildingsByPark
    let allParksUpdate = []

    for (let k in allParksM) {
        allParksUpdate.push({
            Names: allParksM[k].buildingName,
            Ids: allParksM[k].buildingId
        })
    }
    return allParksUpdate;
}

const mapStateToProps = (state) => {
    return {
        allParks: changeTitle(state), //获取全部园区下拉列表
        buildingsByPark: changeTitle2(state), //获取指定园区楼栋列表
        rentalLists:state.leaseManage.rentalLists, //可出租房源列表List
        totalCountRentalLists: state.leaseManage.totalCountRentalLists, //可出租房源列表List的总条数

        searchParamsRentalLists: state.leaseManage.searchParamsRentalLists, //可出租房源列表List的参数
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        //获取全部园区下拉列表 GET
        getAllParks: actions('getAllParks'),
        //GET获取指定园区楼栋列表
        getBuildingsByPark: actions('getBuildingsByPark'),
         //POST / 可出租房源列表List
         getRentalLists: actions('getRentalLists'),
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaseApply)