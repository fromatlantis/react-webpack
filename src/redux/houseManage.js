/**
 * 房源管理 redux
 */
import { put, call, select } from "redux-saga/effects";
import { replace, goBack } from "connected-react-router";
import request from "../utils/request";
import { blaze } from "../utils/blaze";

const model = {
    namespace:'houseManage',
    state:{
        tabActive: 'building', //房源管理页面标签

        projectDetail:[], //获取de园区项目详情
        buildingInfoList:[], //获取楼宇分页列表
        totalCount: null, //获取楼宇分页列表de总条数
        buildingDetail:[],  //获取楼宇详情
        allHouseList:[],  //获取所在楼的所有房间分页列表
        totalCountAllHouse: null, //获取所在楼的所有房间分页列表de总条数
        houseList:[], // 分页查询房源列表
        totalCountHouse: null, //分页查询房源列表de总条数
        houseDetail:[], //获取de房源详情
        renterRecordList:[],  //租赁管理-租赁房源(详情)-租客记录List 
        totalCountrenterRecord:[],  //租赁管理-租赁房源(详情)-租客记录Listde总条数
        buildingName: [], //房源管理==》新建房间下获取楼栋名称
        buildingNo: [], //获取de楼栋编号
        

        searchParams:{ //获取楼宇分页列表de参数
            pageNo: 1,
            pageSize: 10
        },
        searchParamsAllHouse:{ //获取所在楼的所有房间列表de参数
            pageNo: 1,
            pageSize: 10
        },
        searchParamsHouse:{ //分页查询房源列表de参数
            pageNo: 1,
            pageSize: 10
        },
        searchParamsrenterRecord:{ //租赁管理-租赁房源(详情)-租客记录List参数
            pageNo: 1,
            pageSize: 10
        },
   
    },
    actions:[
        {   //获取园区项目详情 
            name:"getProjectDetail",
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: '/asset/getProjectDetail',
                    data: action.payload
                });
                if(res.data){
                    yield put(actions('getProjectDetailSuccess')(res.data));
                }
            }
        },{ 
            name: "getProjectDetailSuccess",
            reducer: 'projectDetail',
        },{   //修改园区项目信息 
            name:"saveOrUpdateProjectInfo",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/saveOrUpdateProjectInfo',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('saveOrUpdateProjectInfoSuccess')(res.data));
                    yield put(actions('getProjectDetail')());
                }
            }
        },{ 
            name: "saveOrUpdateProjectInfoSuccess",
        },{   //获取楼宇分页列表
            name:"buildingInfoList",
            reducer: (state, action)=>{
                return{
                    ...state,
                    searchParams:{...state.searchParams,...action.payload}
                }
            },
            *effect(action){
                const params = yield select(rootState=>rootState.houseManage.searchParams)
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/buildingInfoList',
                    contentType: "multipart/form-data",
                    data: params,
                });
                if(res.data){
                    yield put(actions('buildingInfoListSuccess')(res.data));
                }
            }
        },{ 
            name: "buildingInfoListSuccess",
            reducer: (state, action) => {
                return{
                    ...state,
                    buildingInfoList: action.payload.list,
                    totalCount: action.payload.totalCount,
                }
            },
        },{   //添加楼宇信息 
            name:"AddBuilding",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/AddBuilding',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('AddBuildingSuccess')(res.data));
                    yield put(actions('buildingInfoList')({pageNo:1,pageSize:10}));
                }
            }
        },{ 
            name: "AddBuildingSuccess",
        },{   //修改楼宇信息 
            name:"updateBuildingInfo",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/updateBuildingInfo',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('updateBuildingInfoSuccess')(res.data));
                    yield put(actions('buildingInfoList')({pageNo:1,pageSize:10}));
                }
            }
        },{ 
            name: "updateBuildingInfoSuccess",
        },{   //获取楼宇详情
            name:"getBuildingDetail",
            reducer: (state, action)=>{
                return{
                    ...state,
                    buildingDetail:[],
                }
            },
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/asset/getBuildingDetail?buildingId=${action.payload}`,
                });
                if(res.data){
                    yield put(actions('getBuildingDetailSuccess')(res.data));
                }
            }
        },{ 
            name: "getBuildingDetailSuccess",
            reducer:'buildingDetail',
        },{   //获取所在楼的所有房间列表 
            name:"getAllHouseList",
            reducer: (state, action)=>{
                return{
                    ...state,
                    searchParamsAllHouse:{...state.searchParamsAllHouse,...action.payload}
                }
            },
            *effect(action){
                const params = yield select(rootState=>rootState.houseManage.searchParamsAllHouse)
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/getAllHouseList',
                    contentType: "multipart/form-data",
                    data: params,
                });
                if(res.data){
                    yield put(actions('getAllHouseListSuccess')(res.data));
                }
            }
        },{ 
            name: "getAllHouseListSuccess",
            reducer: (state, action) => {
                return{
                    ...state,
                    allHouseList: action.payload.list,
                    totalCountAllHouse: action.payload.totalCount,
                }
            },
        }, //房源管理导航下=》房源管理标签页
        {   //添加房源信息
            name:"addHouseInfo",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/addHouseInfo',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('addHouseInfoSuccess')(res.data));
                    yield put(actions('storeTabActive')('house'));
                    yield put(goBack()); 
                }
            }
        },{ 
            name: "addHouseInfoSuccess",
        },{   //分页查询房源列表 
            name:"getHouseList",
            reducer: (state, action)=>{
                return{
                    ...state,
                    searchParamsHouse:{...state.searchParamsHouse,...action.payload}
                }
            },
            *effect(action){
                const params = yield select(rootState=>rootState.houseManage.searchParamsHouse)
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/getHouseList',
                    contentType: "multipart/form-data",
                    data: params,
                });
                if(res.data){
                    yield put(actions('getHouseListSuccess')(res.data));
                }
            }
        },{ 
            name: "getHouseListSuccess",
            reducer: (state, action) => {
                return{
                    ...state,
                    houseList: action.payload.list,
                    totalCountHouse: action.payload.totalCount,
                }
            },
        },{   //修改房源信息
            name:"updateHouseInfo",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/updateHouseInfo',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('updateHouseInfoSuccess')(res.data));
                    yield put(actions('storeTabActive')('house'));
                    yield put(goBack()); 
                }
            }
        },{ 
            name: "updateHouseInfoSuccess",
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
                const params = yield select(rootState=>rootState.houseManage.searchParamsrenterRecord)
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
        },{   //添加租客
            name:"addRenter",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/addRenter',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('addRenterSuccess')(res.data));
                    yield put(actions('getRenterRecordList')({pageNo:1,pageSize:10}));
                }
            }
        },{ 
            name: "addRenterSuccess",
        },  //房源管理==》房源管理==》新建房间
        {   //获取楼栋名称(模糊匹配)
            name:"getBuildingName",
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/asset/getBuildingName?testParam=${action.payload}`,
                });
                if(res.data){
                    yield put(actions('getBuildingNameSuccess')(res.data));
                }
            }
        },{ 
            name: "getBuildingNameSuccess",
            reducer: 'buildingName',
        },{   //获取楼栋编号
            name:"getBuildingNo",
            *effect(action){
                const res = yield call(request,{
                    type: 'get',
                    url: `/asset/getBuildingNo?buildingName=${action.payload}`,
                });
                if(res.data){
                    yield put(actions('getBuildingNoSuccess')(res.data));
                }
            }
        },{ 
            name: "getBuildingNoSuccess",
            reducer: 'buildingNo',
        },{   //修改租客信息
            name:"updateRenterInfo",
            *effect(action){
                const res = yield call(request,{
                    type: 'post',
                    url: '/asset/updateRenterInfo',
                    contentType: "multipart/form-data",
                    data: action.payload
                });
                if(res.code===1000){
                    yield put(actions('updateRenterInfoSuccess')(res.data));
                    yield put(actions('getRenterRecordList')({pageNo:1,pageSize:10}));
                }
            }
        },{ 
            name: "updateRenterInfoSuccess",
        },{ //改变tab标签
            name: "storeTabActive",
            reducer:'tabActive',
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