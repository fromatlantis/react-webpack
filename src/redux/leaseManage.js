/**
 * 租赁管理 redux
 */
import { put, call, select } from "redux-saga/effects";
import { replace, goBack } from "connected-react-router";
import request from "../utils/request";
import { blaze } from "../utils/blaze";

const model = {
    namespace:'leaseManage',
    state:{
        rentHouseList:[], //租赁管理-租赁房源List 
        totalCountRentHouse:null, //租赁管理-租赁房源List 的总条数
        houseDetail:[], //获取de房源详情
        renterRecordList:[],  //租赁管理-租赁房源(详情)-租客记录List 
        totalCountrenterRecord:null,  //租赁管理-租赁房源(详情)-租客记录Listde总条数
        allParks: [], //获取全部园区下拉列表
        buildingsByPark: [], //获取指定园区楼栋列表
        rentalLists:[], //可出租房源列表List
        totalCountRentalLists:null, //可出租房源列表List的总条数
        enterApplyLists: [], //企业入驻申请列表查询list
        totalCountEnterApplyLists: null, //企业入驻申请列表查询的总条数
        approveStatus: [], //统计当前用审批的企业入驻申请以及未审批的申请数量
        enterApplyDetail: [], //GET企业入驻申请详情
        

        searchParamsRh:{ //租赁管理-租赁房源List 参数
            pageNo: 1,
            pageSize: 10
        },
        searchParamsrenterRecord:{ //租赁管理-租赁房源(详情)-租客记录List参数
            pageNo: 1,
            pageSize: 10
        },
        searchParamsRentalLists:{ //可出租房源列表List的参数
            pageNo: 1,
            pageSize: 10
        },
        searchParamsEnterApplyLists:{ //企业入驻申请列表查询
            pageNo: 1,
            pageSize: 10
        },
   
    },
    actions:[
        {   //租赁管理-租赁房源List 
            name:"getRentHouseList",
            reducer: (state, action)=>{
                return{
                    ...state,
                    searchParamsRh:{...state.searchParamsRh,...action.payload}
                }
            },
            *effect(action){
                const params = yield select(rootState=>rootState.leaseManage.searchParamsRh)
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/getRentHouseList',
                    contentType: "multipart/form-data",
                    data: params,
                });
                if(res.data){
                    yield put(actions('getRentHouseListSuccess')(res.data));
                }
            }
        },{
            name: "getRentHouseListSuccess",
            reducer: (state, action) => {
                return{
                    ...state,
                    rentHouseList: action.payload.list,
                    totalCountRentHouse: action.payload.totalCount,
                }
            },
        },{   //GET房源发布
            name:"housePublish",
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/asset/housePublish?houseId=${action.payload.houseId}&status=${action.payload.status}`,
                });
                if(res.code===1000){
                    yield put(actions('housePublishSuccess')(res.data));
                    yield put(actions('getRentHouseList')({pageNo:1,pageSize:10}));
                }
            }
        },{ 
            name: "housePublishSuccess",
        },{   //获取房源详情
            name:"getHouseDetail",
            reducer: (state, action)=>{
                return{
                    ...state,
                    houseDetail:[],
                }
            },
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/getHouseDetail',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.data){
                    yield put(actions('getHouseDetailSuccess')(res.data));
                }
            }
        },{ 
            name: "getHouseDetailSuccess",
            reducer:'houseDetail',
        },{   //租赁管理-租赁房源(详情)-租客记录List 
            name:"getRenterRecordList",
            reducer: (state, action)=>{
                return{
                    ...state,
                    searchParamsrenterRecord:{...state.searchParamsrenterRecord,...action.payload}
                }
            },
            *effect(action){
                const params = yield select(rootState=>rootState.leaseManage.searchParamsrenterRecord)
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/getRenterRecordList',
                    contentType: "multipart/form-data",
                    data: params,
                });
                if(res.data){
                    yield put(actions('getRenterRecordListSuccess')(res.data));
                }
            }
        },{
            name: "getRenterRecordListSuccess",
            reducer: (state, action) => {
                return{
                    ...state,
                    renterRecordList: action.payload.list,
                    totalCountrenterRecord: action.payload.totalCount,
                }
            },
        }, //租赁申请
        {   //获取全部园区下拉列表 GET
            name:"getAllParks",
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/asset/getAllParks`,
                    data: action.payload
                });
                if(res.data){
                    yield put(actions('getAllParksSuccess')(res.data));
                }
            }
        },{ 
            name: "getAllParksSuccess",
            reducer: 'allParks',
        },{   //GET获取指定园区楼栋列表
            name:"getBuildingsByPark",
            reducer: (state, action)=>{
                return{
                    ...state,
                    buildingsByPark:[]
                }
            },
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/asset/getBuildingsByPark?parkId=${action.payload}`,
                });
                if(res.code===1000){
                    yield put(actions('getBuildingsByParkSuccess')(res.data));
                }
            }
        },{ 
            name: "getBuildingsByParkSuccess",
            reducer: 'buildingsByPark',
        },{   //POST / 可出租房源列表List
            name:"getRentalLists",
            reducer: (state, action)=>{
                return{
                    ...state,
                    searchParamsRentalLists:{...state.searchParamsRentalLists,...action.payload}
                }
            },
            *effect(action){
                const params = yield select(rootState=>rootState.leaseManage.searchParamsRentalLists)
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/getRentalLists',
                    contentType: "multipart/form-data",
                    data: params,
                });
                if(res.data){
                    yield put(actions('getRentalListsSuccess')(res.data));
                }
            }
        },{
            name: "getRentalListsSuccess",
            reducer: (state, action) => {
                return{
                    ...state,
                    rentalLists: action.payload.list,
                    totalCountRentalLists: action.payload.totalCount,
                }
            },
        },{   //POST / 企业入驻申请列表查询
            name:"getEnterApplyLists",
            reducer: (state, action)=>{
                return{
                    ...state,
                    searchParamsEnterApplyLists:{...state.searchParamsEnterApplyLists,...action.payload}
                }
            },
            *effect(action){
                const params = yield select(rootState=>rootState.leaseManage.searchParamsEnterApplyLists)
                const res = yield call(request,{
                    type: 'post',
                    url: '/merchants/getEnterApplyLists',
                    contentType: "multipart/form-data",
                    data: params,
                });
                if(res.data){
                    yield put(actions('getEnterApplyListsSuccess')(res.data));
                }
            }
        },{
            name: "getEnterApplyListsSuccess",
            reducer: (state, action) => { 
                return{
                    ...state,
                    enterApplyLists: action.payload.list,
                    totalCountEnterApplyLists: action.payload.totalCount,
                }
            },
        },{   //统计当前用审批的企业入驻申请以及未审批的申请数量
            name:"statApproveStatus",
            reducer: (state, action)=>{
                return{
                    ...state,
                    approveStatus:[]
                }
            },
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/merchants/statApproveStatus`,
                });
                if(res.code===1000){
                    yield put(actions('statApproveStatusSuccess')(res.data));
                }
            }
        },{ 
            name: "statApproveStatusSuccess",
            reducer: 'approveStatus', 
        },{   //GET企业入驻申请详情
            name:"getEnterApplyDetail",
            reducer: (state, action)=>{
                return{
                    ...state,
                    enterApplyDetail:[]
                }
            },
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/merchants/getEnterApplyDetail?applyId=${action.payload}`,
                });
                if(res.code===1000){
                    yield put(actions('getEnterApplyDetailSuccess')(res.data));
                }
            }
        },{ 
            name: "getEnterApplyDetailSuccess",
            reducer: 'enterApplyDetail',
        },{   //POST /  指定入驻申请，审批操作
            name:"enterApprove",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: `/merchants/enterApprove`,
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('enterApproveSuccess')(res.data));
                    yield put(goBack()); 
                }
            }
        },{ 
            name: "enterApproveSuccess",
        },{   //POST/ 新增企业入驻申请
            name:"saveCompamyApply",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: `/merchants/saveCompamyApply`,
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('saveCompamyApplySuccess')(res.data));
                    yield put(goBack()); 
                }
            }
        },{ 
            name: "saveCompamyApplySuccess",
        },
    ],
};
const manager = blaze(model);
// reducer combineReducers使用
export default manager.reducers;
// action connect组件使用
export const actions = manager.actions;
// effects saga监听副作用函数使用
export const effects = manager.effects;