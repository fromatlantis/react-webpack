import Mock from 'mockjs'
Mock.mock(/property\/getRepairsType/, function(options) {
    // console.log(options.body)
    return {
        code: 1000,
        message: '成功',
        data: [
            {
                id: '1',
                typeName: '电路',
                level: '1',
                pid: '0',
            },
            {
                id: '10',
                typeName: '电路小',
                level: '2',
                pid: '1',
            },
            {
                id: '100',
                typeName: '电路小小',
                level: '3',
                pid: '10',
            },
            {
                id: '2',
                typeName: '电闸',
                level: '1',
                pid: '0',
            },
            {
                id: '20',
                typeName: '电闸小',
                level: '2',
                pid: '2',
            },
            {
                id: '3',
                typeName: '空调',
                level: '1',
                pid: '0',
            },
        ],
    }
})
// 添加报修类型
Mock.mock(/property\/setRepairsTypeNode/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
//编辑（报修类型）
Mock.mock(/property\/updateRepairsTypeNode/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
//删除（报修类型）
Mock.mock(/property\/deleteRepairsTypeNode/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
// 获取（报修地址）
Mock.mock(/property\/getAddressType/, function(options) {
    // console.log(options.body)
    return {
        code: 1000,
        message: '成功',
        data: [
            {
                id: '1',
                typeName: '同祥城',
                level: '1',
                pid: '0',
                isRelate: '0',
            },
            {
                id: '10',
                typeName: '2单元',
                level: '2',
                pid: '1',
                isRelate: '1',
            },
            {
                id: '100',
                typeName: '13层',
                level: '3',
                pid: '10',
                isRelate: '1',
            },
            {
                id: '2',
                typeName: '慧谷大厦',
                level: '1',
                pid: '0',
                isRelate: '0',
            },
            {
                id: '20',
                typeName: '12层',
                level: '2',
                pid: '2',
                isRelate: '0',
            },
            {
                id: '3',
                typeName: '空调',
                level: '1',
                pid: '0',
                isRelate: '1',
            },
        ],
    }
})
// 添加（报修地址）
Mock.mock(/property\/setAddressTypeNode/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
//编辑（报修地址）
Mock.mock(/property\/updateAddressTypeNode/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
//删除（报修地址）
Mock.mock(/property\/deleteAddressTypeNode/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
// 用户设置-获取table
Mock.mock(/property\/getUserList/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: {
            totalCount: 3,
            pageNo: 1,
            pageSize: 2,
            list: [
                {
                    userId: '5c99dfec43cd221b96cbf8c0',
                    account: 'qianxiansheng',
                    userName: '钱先生',
                    phone: '1234567',
                    role: '物业派工员',
                    deptName: '测试部门',
                    duty: '派工者',
                },
                {
                    userId: '5c99dfec43cd221b96cbf8c1',
                    account: 'qianxiansheng',
                    userName: '张先生',
                    phone: '1234567',
                    role: '物业维修员',
                    deptName: '测试部门',
                    duty: '维修者',
                },
            ],
        },
    }
})
// 用户设置-获取所有员工（楼宇关联信息）
Mock.mock(/property\/getAddressRelateList/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: [
            {
                id: '1',
                area: '同祥城A',
                address: '1单元',
                detail: '12层',
            },
            {
                id: '2',
                area: '同祥城A',
                address: '1单元',
                detail: '13层',
            },
            {
                id: '3',
                area: '同祥城A',
                address: '1单元',
                detail: '',
            },
            {
                id: '4',
                area: '同祥城A',
                address: '',
                detail: '',
            },
        ],
    }
})
// 用户设置-楼宇关联添加
// 用户设置-报修类型table获取
Mock.mock(/property\/getRepairRelateList/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: [
            {
                id: '10',
                repairType: '电路/强电',
            },
            {
                id: '2',
                repairType: '电路/弱电',
            },
        ],
    }
})

// 用户设置-删除关联楼宇
Mock.mock(/property\/deleteAddressRelate/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
Mock.mock(/property\/deleteRepairRelate/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
// 用户设置-添加楼宇关联信息
Mock.mock(/property\/addAddressRelate/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
// 用户设置-添加报修类型关联信息
Mock.mock(/property\/addRepairRelate/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: null,
    }
})
