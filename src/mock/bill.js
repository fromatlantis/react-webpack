import Mock from 'mockjs'
Mock.mock(/charge\/getCustomerBillList/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: {
            totalCount: '@integer(60, 100)',
            pageNo: 1,
            pageSize: 10,
            // 属性 list 的值是一个数组,其中含有 1 到 10 个元素
            'list|1-10': [
                {
                    // 属性 id 是一个自增数,起始值为 1,每次增 1
                    'customerId|+1': 1,
                    building: '@ctitle',
                    'room|+1': 1,
                    customerName: '@cname',
                    receiveDate: '2019.08.01-2019.09.01',
                    amount: Mock.Random.string('number', 5),
                    limitDate: '@datetime',
                    'status|1': ['未确认', '已确认'],
                    confirmedCount: Mock.Random.string('number', 2),
                    unconfirmedCount: Mock.Random.string('number', 2),
                },
            ],
        },
    })
})
Mock.mock(/charge\/getCustomerBaseInfo/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: {
            // 属性 id 是一个自增数,起始值为 1,每次增 1
            'id|+1': 1,
            productType: '@title',
            'rentType|1': ['租', '售'],
            'meterNo|+1': 1,
            building: '@ctitle',
            'room|+1': 1,
            customerName: '@cname()',
            ownerName: '@cname()',
            phone: '15100123457',
            email: '76011299@qq.com',
            businessManager: '@name',
            medium: '无',
        },
    })
})
