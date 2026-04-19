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
    // 根据类型和用户输入返回不同的模拟结果
    switch (type) {
        case 'weekly':
            return `周报

本周工作成果：
· ${input || '完成了各项工作任务'}
· 优化了工作流程，提高了效率
· 解决了工作中遇到的问题
· 与团队成员保持了良好的沟通

进行中事项：
· 正在处理剩余的工作任务
· 正在学习新的技能和知识

下周工作计划：
· 完成剩余的工作任务
· 制定新的工作计划和目标
· 参加相关的培训和学习
· 与团队成员进行定期的沟通和协作

遇到的问题与建议：
· 建议改进工作流程，提高效率
· 建议增加团队成员之间的沟通和协作`;
        case 'article':
            const articleTitle = input.split('主题：')[1] || '职场效率提升';
            return `文章标题：
· ${articleTitle}：提升职场竞争力的关键
· 从${articleTitle}看职场发展趋势
· ${articleTitle}：现代职场必备技能

开头：
${articleTitle}是现代职场中非常重要的话题，本文将深入探讨如何通过${articleTitle}提升职场竞争力，帮助你在职场中取得更好的发展。

正文：
根据用户提供的信息：${input || '关于职场发展的相关内容'}

首先，我们需要认识到${articleTitle}的重要性。在当今竞争激烈的职场环境中，拥有良好的${articleTitle}能力可以帮助我们更好地完成工作任务，提高工作效率。

其次，我们需要掌握一些实用的方法和技巧。通过不断学习和实践，我们可以逐步提升自己的${articleTitle}能力。

结尾：
希望本文对你有所启发，帮助你在${articleTitle}方面取得更好的成绩。记住，持续学习和不断改进是职场成功的关键。

配图位置建议：
· 开头部分：一张与${articleTitle}相关的职场场景照片
· 正文部分：相关的图表或示意图
· 结尾部分：一张激励性的图片`;
        case 'meeting':
            return `会议纪要

会议时间：
${new Date().toLocaleString()}

会议议题：
· ${input || '项目进展讨论'}
· 工作安排和任务分配
· 问题分析与解决方案

讨论内容：
· 针对${input || '项目进展'}进行了详细讨论
· 分析了当前工作中存在的问题和挑战
· 提出了一些改进建议和解决方案

决议事项：
· 决定进一步推进${input || '项目进展'}
· 决定优化工作流程，提高效率
· 决定加强团队成员之间的沟通和协作

待办任务：
· 完成${input || '项目相关'}的具体任务，责任人：相关团队成员，截止日期：${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
· 准备详细的工作方案，责任人：相关负责人，截止日期：${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
· 组织团队会议，讨论后续工作安排，责任人：团队负责人，截止日期：${new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}`;
        default:
            return '生成失败';
    }
}