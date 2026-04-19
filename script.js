// 标签页切换功能
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 更新导航按钮状态
            navBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新内容区域
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // 绑定生成按钮事件
    document.getElementById('generate-weekly').addEventListener('click', generateWeeklyReport);
    document.getElementById('generate-article').addEventListener('click', generateArticle);
    document.getElementById('generate-meeting').addEventListener('click', generateMeetingNotes);
});

// 生成周报
async function generateWeeklyReport() {
    const input = document.getElementById('weekly-input').value;
    const outputDiv = document.getElementById('weekly-output');
    
    if (!input.trim()) {
        outputDiv.textContent = '请输入工作内容';
        return;
    }
    
    outputDiv.textContent = '正在生成...';
    
    try {
        const result = await callAI('weekly', input);
        outputDiv.textContent = result;
    } catch (error) {
        outputDiv.textContent = '生成失败，请重试';
        console.error('生成周报失败:', error);
    }
}

// 生成文章
async function generateArticle() {
    const input = document.getElementById('article-input').value;
    const outputDiv = document.getElementById('article-output');
    
    if (!input.trim()) {
        outputDiv.textContent = '请输入文章相关信息';
        return;
    }
    
    outputDiv.textContent = '正在生成...';
    
    try {
        const result = await callAI('article', input);
        outputDiv.textContent = result;
    } catch (error) {
        outputDiv.textContent = '生成失败，请重试';
        console.error('生成文章失败:', error);
    }
}

// 生成会议纪要
async function generateMeetingNotes() {
    const input = document.getElementById('meeting-input').value;
    const outputDiv = document.getElementById('meeting-output');
    
    if (!input.trim()) {
        outputDiv.textContent = '请输入会议记录';
        return;
    }
    
    outputDiv.textContent = '正在生成...';
    
    try {
        const result = await callAI('meeting', input);
        outputDiv.textContent = result;
    } catch (error) {
        outputDiv.textContent = '生成失败，请重试';
        console.error('生成会议纪要失败:', error);
    }
}

// 调用AI API
async function callAI(type, input) {
    // 尝试使用真实API调用
    try {
        return await callAIAPI(type, input);
    } catch (error) {
        console.error('API调用失败，使用模拟数据:', error);
        // 失败时使用模拟数据
        return getMockData(type, input);
    }
}

// 真实API调用函数
async function callAIAPI(type, input) {
    // 获取配置
    const apiKey = window.config?.apiKey || 'your-api-key';
    const model = window.config?.model || 'glm-4-flash';
    const apiEndpoint = window.config?.apiEndpoint || 'https://open.bigmodel.cn/api/m/v1/chat/completions';
    
    // 根据类型构建不同的prompt
    let systemPrompt = '';
    switch (type) {
        case 'weekly':
            systemPrompt = '你是一个专业的职场效率助手，擅长将零散的工作记录整理成结构化的周报。请根据用户提供的信息，生成一份格式规范、内容完整的周报，包括本周工作成果、进行中事项、下周计划等部分。';
            break;
        case 'article':
            systemPrompt = '你是一个专业的内容创作者，擅长根据提供的素材生成优质的公众号文章。请根据用户提供的信息，生成一份结构清晰、语言流畅的文章，包括标题建议、完整内容和配图位置建议。';
            break;
        case 'meeting':
            systemPrompt = '你是一个专业的会议纪要整理专家，擅长从杂乱的会议记录中提取关键信息。请根据用户提供的会议记录，生成一份结构化的会议纪要，包括会议时间、讨论议题、决议事项、待办任务、责任人、截止时间等部分。';
            break;
    }
    
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: input }
            ]
        })
    });
    
    if (!response.ok) {
        throw new Error('API调用失败');
    }
    
    const data = await response.json();
    return data.choices[0].message.content;
}

// 模拟数据生成函数
function getMockData(type, input) {
    // 根据类型返回不同的模拟结果
    switch (type) {
        case 'weekly':
            return `# 周报\n\n## 本周工作成果\n\n${input}\n\n## 下周工作计划\n- 完成剩余任务\n- 学习新技能\n- 优化工作流程\n\n## 总结\n本周工作进展顺利，各项任务均按计划完成。`;
        case 'article':
            return `# 文章标题：${input.split('主题：')[1] || 'AI技术分享'}\n\n## 开头\n为了促进AI技术的交流与合作，我们举办了一场精彩的活动。\n\n## 正文\n${input}\n\n## 结尾\n期待下次活动的举办，共同推动AI技术的发展。\n\n## 配图位置建议\n- 开头部分：活动现场照片\n- 嘉宾介绍部分：嘉宾照片\n- 结尾部分：大合影`;
        case 'meeting':
            return `# 会议纪要\n\n## 会议时间\n${new Date().toLocaleString()}\n\n## 讨论议题\n- 项目进度\n- 资源分配\n- 问题解决\n\n## 会议内容\n${input}\n\n## 决议事项\n- 事项1\n- 事项2\n\n## 待办任务\n- 任务1：责任人A，截止日期：${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}\n- 任务2：责任人B，截止日期：${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}`;
        default:
            return '生成失败';
    }
}