import Mock from 'mockjs';
Mock.mock(/api\/portals/,function (options) {
    console.log(options.body);
    return {
        "data": [
            {
                "key": "1",
                "name": "启迪科技城集团",
                "age": "2018-09-12 23:23:34",
                "address": "未发布"
            },
            {
                "key": "2",
                "name": "华夏幸福基业",
                "age": "2018-09-12 23:23:34",
                "address": "已停用"
            },
            {
                "key": "3",
                "name": "启迪科技城集团",
                "age": "2018-09-12 23:23:34",
                "address": "使用中"
            },
            {
                "key": "4",
                "name": "华夏幸福基业",
                "age": "2018-09-12 23:23:34",
                "address": "未发布"
            },
            {
                "key": "5",
                "name": "启迪科技城集团",
                "age": "2018-09-12 23:23:34",
                "address": "未发布"
            },
            {
                "key": "6",
                "name": "华夏幸福基业",
                "age": "2018-09-12 23:23:34",
                "address": "已停用"
            },
            {
                "key": "7",
                "name": "启迪科技城集团",
                "age": "2018-09-12 23:23:34",
                "address": "使用中"
            },
            {
                "key": "8",
                "name": "华夏幸福基业",
                "age": "2018-09-12 23:23:34",
                "address": "未发布"
            }
        ]
    }
});
