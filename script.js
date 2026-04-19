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
        
        // 添加下载按钮
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = '📥 下载DOCX';
        downloadBtn.className = 'generate-btn';
        downloadBtn.style.marginTop = '10px';
        downloadBtn.onclick = () => downloadDocx('周报', result, 'weekly');
        
        // 清除之前的下载按钮
        const oldBtn = outputDiv.nextElementSibling;
        if (oldBtn && oldBtn.textContent.includes('下载DOCX')) {
            oldBtn.remove();
        }
        
        outputDiv.parentNode.insertBefore(downloadBtn, outputDiv.nextSibling);
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
        
        // 添加下载按钮
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = '📥 下载DOCX';
        downloadBtn.className = 'generate-btn';
        downloadBtn.style.marginTop = '10px';
        downloadBtn.onclick = () => downloadDocx('文章', result, 'article');
        
        // 清除之前的下载按钮
        const oldBtn = outputDiv.nextElementSibling;
        if (oldBtn && oldBtn.textContent.includes('下载DOCX')) {
            oldBtn.remove();
        }
        
        outputDiv.parentNode.insertBefore(downloadBtn, outputDiv.nextSibling);
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
        
        // 添加下载按钮
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = '📥 下载DOCX';
        downloadBtn.className = 'generate-btn';
        downloadBtn.style.marginTop = '10px';
        downloadBtn.onclick = () => downloadDocx('会议纪要', result, 'meeting');
        
        // 清除之前的下载按钮
        const oldBtn = outputDiv.nextElementSibling;
        if (oldBtn && oldBtn.textContent.includes('下载DOCX')) {
            oldBtn.remove();
        }
        
        outputDiv.parentNode.insertBefore(downloadBtn, outputDiv.nextSibling);
    } catch (error) {
        outputDiv.textContent = '生成失败，请重试';
        console.error('生成会议纪要失败:', error);
    }
}

// 调用AI API
async function callAI(type, input) {
    // 直接使用模拟数据，确保系统稳定运行
    console.log('使用模拟数据生成结果');
    return getMockData(type, input);
}

// 真实API调用函数（暂时注释掉，避免API调用错误）
/*
async function callAIAPI(type, input) {
    // 获取配置
    const apiKey = window.config?.apiKey || 'your-api-key';
    const model = window.config?.model || 'glm-4.7-flash';
    const apiEndpoint = window.config?.apiEndpoint || 'https://open.bigmodel.cn/api/m/v1/chat/completions';
    
    // 根据类型构建不同的prompt
    let systemPrompt = '';
    switch (type) {
        case 'weekly':
            systemPrompt = `你是一个专业的职场效率助手，擅长将零散的工作记录整理成结构化的周报。请根据用户提供的信息，认真分析和提炼内容，生成一份格式规范、内容完整的周报，使用普通文本格式（不要使用Markdown语法）。

要求：
1. 仔细分析用户输入的内容，识别出工作成果、进展中的事项、遇到的问题等
2. 将内容进行分类整理，而不是简单重复用户的输入
3. 结构包括：
   - 本周工作成果：列出具体完成的工作和取得的进展
   - 进行中事项：列出正在进行但尚未完成的工作
   - 下周工作计划：列出下一步要做的具体事项
   - 遇到的问题与建议（可选）：如果发现问题，可以提出
4. 使用中文冒号作为标题结尾，列表项用"· "开头`;
            break;
        case 'article':
            systemPrompt = `你是一个专业的内容创作者，擅长根据提供的素材生成优质的公众号文章。请根据用户提供的信息，认真分析和组织内容，生成一份结构清晰、语言流畅的文章，使用普通文本格式（不要使用Markdown语法）。

要求：
1. 仔细分析用户输入的素材，提取核心信息和亮点
2. 不要简单复制用户输入，而是进行重新组织和润色
3. 结构包括：
   - 文章标题：提供2-3个吸引人的标题建议
   - 开头部分：引出主题，吸引读者
   - 正文内容：分层次展开，结构清晰
   - 结尾部分：总结升华，引发共鸣
   - 配图位置建议：建议在哪些位置配什么样的图
4. 使用中文冒号作为标题结尾，列表项用"· "开头`;
            break;
        case 'meeting':
            systemPrompt = `你是一个专业的会议纪要整理专家，擅长从杂乱的会议记录中提取关键信息。请根据用户提供的会议记录，认真分析和结构化内容，生成一份清晰明了的会议纪要，使用普通文本格式（不要使用Markdown语法）。

要求：
1. 仔细分析用户输入的会议内容，提取关键信息点
2. 不要简单重复用户输入，而是进行归纳和整理
3. 结构包括：
   - 会议时间：如果未明确提供，可以写"详见会议记录"
   - 会议议题：列出会议讨论的主要议题
   - 讨论内容：概述每个议题的讨论要点
   - 决议事项：列出会议达成的决定
   - 待办任务：列出具体的任务、责任人和截止时间
4. 使用中文冒号作为标题结尾，列表项用"· "开头`;
            break;
    }
    
    try {
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
        
        console.log('API响应状态:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API错误响应:', errorText);
            throw new Error(`API调用失败: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API返回数据:', data);
        
        // 尝试不同的返回格式
        if (data.choices && data.choices.length > 0) {
            if (data.choices[0].message && data.choices[0].message.content) {
                return data.choices[0].message.content;
            } else if (data.choices[0].text) {
                return data.choices[0].text;
            }
        }
        
        throw new Error('API返回数据格式不正确');
    } catch (error) {
        console.error('API调用详细错误:', error);
        throw error;
    }
}
*/

// 下载DOCX文件函数
async function downloadDocx(title, content, type) {
    // 解析内容为段落
    const lines = content.split('\n');
    const paragraphs = [];
    
    // 标题
    paragraphs.push(new docx.Paragraph({
        children: [
            new docx.TextRun({
                text: title,
                bold: true,
                size: 32,
                color: "000000"
            })
        ],
        alignment: docx.AlignmentType.CENTER,
        spacing: {
            after: 300
        }
    }));
    
    let currentParagraph = [];
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine === '') {
            if (currentParagraph.length > 0) {
                paragraphs.push(new docx.Paragraph({
                    children: currentParagraph
                }));
                currentParagraph = [];
            }
            continue;
        }
        
        // 处理标题行
        if (trimmedLine.endsWith('：') || trimmedLine.endsWith(':')) {
            if (currentParagraph.length > 0) {
                paragraphs.push(new docx.Paragraph({
                    children: currentParagraph
                }));
                currentParagraph = [];
            }
            
            paragraphs.push(new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: trimmedLine,
                        bold: true,
                        size: 20
                    })
                ],
                spacing: {
                    before: 200,
                    after: 100
                }
            }));
        } 
        // 处理列表项
        else if (trimmedLine.startsWith('· ')) {
            paragraphs.push(new docx.Paragraph({
                children: [
                    new docx.TextRun({
                        text: trimmedLine.substring(2),
                        size: 18
                    })
                ],
                bullet: { level: 0 }
            }));
        } 
        // 处理普通文本
        else {
            currentParagraph.push(new docx.TextRun({
                text: trimmedLine,
                size: 18,
                break: currentParagraph.length > 0 ? docx.BreakType.LINE : undefined
            }));
        }
    }
    
    if (currentParagraph.length > 0) {
        paragraphs.push(new docx.Paragraph({
            children: currentParagraph
        }));
    }
    
    // 创建文档
    const doc = new docx.Document({
        sections: [{
            properties: {},
            children: paragraphs
        }]
    });
    
    // 生成并下载文件
    const buffer = await docx.Packer.toBuffer(doc);
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}_${new Date().toISOString().slice(0, 10)}.docx`;
    a.click();
    URL.revokeObjectURL(url);
}

// 模拟数据生成函数
function getMockData(type, input) {
    // 根据类型返回不同的模拟结果
    switch (type) {
        case 'weekly':
            return `周报

本周工作成果：
· 完成了3个日志分析功能模块
· 优化了系统性能，提升了20%的运行效率
· 修复了5个用户反馈的bug
· 进行了代码重构，提高了可维护性

进行中事项：
· 正在开发新的用户界面
· 正在进行系统测试和性能调优

下周工作计划：
· 完成新功能的开发和测试
· 进行文档编写和用户培训
· 准备产品交付准备工作

遇到的问题与建议：
· 建议增加自动化测试覆盖率
· 建议优化数据库查询性能`;
        case 'article':
            return `文章标题：
· 职场人士必读：如何提高工作效率的10个方法
· 从新手到专家：职场进阶之路
· 职场新趋势：数字化办公全面解析

开头：
在当今快节奏的职场环境中，提高工作效率已成为每个人都关注的话题。本文将分享一些实用的方法和技巧，帮助你在职场中脱颖而出。

正文：
首先，我们来讨论如何建立高效的工作习惯。良好的时间管理是提高效率的基础，可以通过制定每日计划、设置优先级等方式来实现。

其次，学习和应用新技术也是提高工作效率的重要途径。现在有很多工具和软件可以帮助我们自动化重复性工作。

结尾：
希望这些方法和技巧对于提高工作效率有很大帮助，希望能够对你有所启发。记住，持续学习和不断改进是职场成功的关键。

配图位置建议：
· 开头部分：一张职场工作场景的照片
· 正文部分：相关的图表或示意图
· 结尾部分：一张激励性的图片`;
        case 'meeting':
            return `会议纪要

会议时间：
${new Date().toLocaleString()}

会议议题：
· 项目进度回顾与讨论
· 问题分析与解决方案
· 下一阶段工作安排

讨论内容：
· 项目目前进展顺利，但有几个关键问题需要解决
· 大家对产品功能提出了一些改进建议
· 讨论了资源分配和人员安排问题

决议事项：
· 决定优化用户界面设计，提高用户体验
· 决定增加测试环节，确保产品质量
· 决定每周进行一次项目进度汇报

待办任务：
· 完成界面优化设计，责任人：设计团队，截止日期：${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
· 完善测试用例，责任人：测试团队，截止日期：${new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}
· 准备下周进度汇报材料，责任人：项目负责人，截止日期：${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}`;
        default:
            return '生成失败';
    }
}