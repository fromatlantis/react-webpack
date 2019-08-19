import Mock from 'mockjs'
Mock.mock(/property\/repairList/, function(options) {
    console.log(options.body)
    return {
        code: 1000,
        message: '成功',
        data: {
            totalCount: 10,
            pageNo: 1,
            pageSize: 10,
            list: [
                {
                    repairId: '1',
                    categories: '1',
                    faultDesc: '1',
                    repairLocation: '1',
                    reportTime: '1',
                    evaluateLevel: '1',
                    statusName: '1',
                    repairStatus: '1',
                },
                {
                    repairId: '2',
                    categories: '2',
                    faultDesc: '2',
                    repairLocation: '2',
                    reportTime: '2',
                    evaluateLevel: '2',
                    statusName: '2',
                    repairStatus: '2',
                },
            ],
        },
    }
})
Mock.mock(/property\/workorderList/, function(options) {
    console.log(options.body)
    return {
        code: 1000,
        message: '成功',
        data: {
            totalCount: 10,
            pageNo: 1,
            pageSize: 10,
            list: [
                {
                    repairId: '1',
                    reporterName: '1',
                    reporterContactWay: '1',
                    reportTime: '1',
                    repairLocation: '1',
                    categories: '1',
                    status: '1',
                },
                {
                    repairId: '2',
                    reporterName: '2',
                    reporterContactWay: '2',
                    reportTime: '2',
                    repairLocation: '2',
                    categories: '2',
                    status: '2',
                },
                {
                    repairId: '3',
                    reporterName: '3',
                    reporterContactWay: '3',
                    reportTime: '3',
                    repairLocation: '3',
                    categories: '3',
                    status: '3',
                },
            ],
        },
    }
})
Mock.mock(/property\/myDispatchList/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: {
            totalCount: '@integer(60, 100)',
            pageNo: 1,
            pageSize: 10,
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1-10': [
                {
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'repairId|+1': 1,
                    faultDesc: '@cparagraph',
                    dispatchTime: '@datetime',
                    categories: '@ctitle',
                    maintainers: '@cname',
                    'evaluateLevel|1-5.1': 1,
                    statusName: '@ctitle',
                },
            ],
        },
    })
})
Mock.mock(/property\/getFeedbackList/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: {
            totalCount: '@integer(60, 100)',
            pageNo: 1,
            pageSize: 10,
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            'list|1-10': [
                {
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'repairId|+1': 1,
                    faultDesc: '@cparagraph',
                    dispatchTime: '@datetime',
                    categories: '@ctitle',
                    'evaluateLevel|1-5.1': 1,
                    repairStatus: '@ctitle',
                },
            ],
        },
    })
})
Mock.mock(/property\/getAddressType/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: [
            {
                id: '1',
                typeName: '同祥城A',
                pid: '0',
                isRelate: '0',
            },
            {
                id: '2',
                typeName: '1单元',
                pid: '1',
                isRelate: '1',
            },
            {
                id: '3',
                typeName: '2单元',
                pid: '1',
                isRelate: '0',
            },
            {
                id: '4',
                typeName: '13层',
                pid: '2',
                isRelate: '0',
            },
            {
                id: '5',
                typeName: '12层',
                pid: '2',
                isRelate: '1',
            },
            {
                id: '6',
                typeName: '慧谷大厦B',
                pid: '0',
                isRelate: '0',
            },
        ],
    })
})
Mock.mock(/property\/getRepairsType/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: [
            {
                id: '1',
                typeName: '电路',
                pid: '0',
            },
            {
                id: '2',
                typeName: '强电',
                pid: '1',
            },
            {
                id: '3',
                typeName: '弱电',
                pid: '1',
            },
            {
                id: '4',
                typeName: '电闸坏了',
                pid: '2',
            },
            {
                id: '5',
                typeName: '坏了',
                pid: '2',
            },
            {
                id: '6',
                typeName: '空调',
                pid: '0',
            },
        ],
    })
})
Mock.mock(/property\/repairDetail/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: {
            repairId: '',
            parkId: '',
            propertyId: '',
            propertyName: '物业公司名称',
            repairAddress: '报修详细地址',
            repairLocation: '报修地址',
            category: '报修类型-大类',
            classify: '报修类型-细类',
            fault: '报修类型-简述',
            faultDesc: '@cparagraph',
            isStuck: '电梯是否困人',
            stuckNum: '电梯被困人数',
            faultImages: '故障图片',
            reporterId: '',
            reporterName: '报修人姓名',
            reporterContactWay: '报修人联系方式',
            reportTime: '@datetime',
            repairStatus: '4',
            dispatcherId: '',
            dispatcherName: '派工人员姓名',
            dispatchDesc: '@cparagraph',
            dispatcherTime: '@datetime',
            serviceType: '服务类型',
            maintainerId: '',
            maintainerName: '维修工姓名',
            maintainerContactWay: '维修工程师电话',
            fixResult: '0',
            fixDesc: '@cparagraph',
            fixImages: '反馈图片',
            isPaid: '0',
            materialBill: '物料清单',
            fixBeginDate: '@datetime',
            fixEndDate: '@datetime',
            fixDuration: '维修累计时长',
            humans: '维修人数',
            paymentMethod: '1',
            materialCosts: '物料费用总计',
            staffCosts: '人工费用总计',
            totalCosts: '维修费用总计',
            'evaluateLevel|1-5.1': 1,
            evaluateDesc: '@cparagraph',
        },
    })
})
Mock.mock(/property\/applyRepair/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: null,
    })
})
Mock.mock(/property\/getDispatchor/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: [
            {
                phone: '',
                userName: '宣传管理员',
                userId: '5c9dafbc43cd225066367d1f',
            },
        ],
    })
})
Mock.mock(/property\/getRepairs/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: [
            {
                phone: '15678900987',
                userName: '@cname',
                userId: '5cdbd25cc1ec9e5ed039e6a5',
            },
        ],
    })
})
