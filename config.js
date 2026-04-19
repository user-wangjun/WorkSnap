// 配置文件
const config = {
    // 智谱AI API Key
    // 实际使用时，请将API Key设置为环境变量或替换为真实的API Key
    apiKey: getAPIKey(),
    // API端点
    apiEndpoint: 'https://open.bigmodel.cn/api/m/v1/chat/completions',
    // 模型名称
    model: 'glm-4.7-flash'
};

// 获取API Key的函数
function getAPIKey() {
    // 尝试从环境变量中获取
    if (typeof process !== 'undefined' && process.env && process.env.ZHIPUAI_API_KEY) {
        return process.env.ZHIPUAI_API_KEY;
    }
    // 尝试从localStorage中获取
    if (typeof localStorage !== 'undefined' && localStorage.getItem('ZHIPUAI_API_KEY')) {
        return localStorage.getItem('ZHIPUAI_API_KEY');
    }
    // 默认值 - 使用用户提供的API Key
    return '33901d235d1341bc85f4d8c3ea338848.EpUZsbPOj48ZQRv2';
}

// 导出配置
try {
    module.exports = config;
} catch (e) {
    // 浏览器环境
    window.config = config;
    // 添加设置API Key的方法
    window.setAPIKey = function(apiKey) {
        window.config.apiKey = apiKey;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('ZHIPUAI_API_KEY', apiKey);
        }
    };
}