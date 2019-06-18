import Mock from 'mockjs'
Mock.mock(/property\/getMeterList/, function(options) {
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
                    'id|+1': 1,
                    'meterNo|+1': 1,
                    'category|1': ['水表', '电表', '燃气表'],
                    cycle: '按月抄表',
                    deadlineDay: '@datetime',
                    location: '@city(true)',
                },
            ],
        },
    })
})
Mock.mock(/property\/getMeterDetail/, function(options) {
    console.log(options.body)
    return Mock.mock({
        code: 1000,
        message: '成功',
        data: {
            // 属性 id 是一个自增数,起始值为 1,每次增 1
            'id|+1': 1,
            'category|1': ['水表', '电表', '燃气表'],
            'meterNo|+1': 1,
            location: '@city(true)',
            'areaType|1': ['公区', '企业', '个人', '其他'],
            contacts: '@cname()',
            contactsWay: /^1[385][1-9]\d{8}/,
            remarks: '@cparagraph()',
            customerName: '@cname()',
            customerAddr: '@city(true)',
            cycle: '按月抄表',
            deadlineDay: '@datetime',
            createTime: '@datetime',
            updateTime: '@datetime',
        },
    })
})
