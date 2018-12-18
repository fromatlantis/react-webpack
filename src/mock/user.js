import Mock from 'mockjs';
Mock.mock(/api\/login/,function (options) {
    return {
        "data": {
            username:'梦溪'
        }
    }
});
