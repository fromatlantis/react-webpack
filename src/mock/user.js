import Mock from 'mockjs'
Mock.mock(/authuser\/login/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: {
            auth: [],
            user: {
                name: '运营管理员',
                account: 'admin_2',
                email: '4567890@qq.com',
            },
        },
    }
})
Mock.mock(/authuser\/userinfo/, function(options) {
    return {
        code: 1000,
        message: '成功',
        data: {
            auth: [],
            user: {
                name: '运营管理员',
                account: 'admin_2',
                email: '4567890@qq.com',
            },
        },
    }
})
