# 职秒 | JobMoment - AI职场助手

> **一句话定位：** 用 AI 驱动的个人知识工作流引擎，让打工人从重复性文字工作中解放出来。

## 项目背景

作为内容创作者和AI工具使用者，我们发现职场人每天花大量时间在做**低价值但必须做**的文字工作：

- 📝 写周报、日报 —— 每周耗时的机械劳动
- 📋 整理会议纪要 —— 开会1小时，整理2小时  
- 📰 产出自媒体内容 —— 从素材到成稿流程繁琐
- 📊 信息搜集与整理 —— 多源信息汇总耗时耗力

本项目的核心理念：**不只是写代码（Code with SOLO），更是用代码解决真问题（More Than Coding）。**

## 核心功能

### 功能1：📝 AI 周报/日报生成器
**场景：** 用户输入零散的工作记录、数据要点 → 自动生成结构化汇报

**用户输入示例：**
```
本周完成了：
- 工资管理系统的PagePrint分页显示功能
- SortMax工资排序函数调试通过
- 参加了TRAE Solo挑战赛选题讨论
下周计划：
- 开始Staticmax部门统计函数
- 准备中期考核文档Part2
```

**期望输出：** 
- 标准化周报格式（含本周成果、进行中事项、下周计划）
- 可选：生成PPT大纲版

### 功能2：🎯 公众号文章辅助写作
**场景：** 用户提供活动素材/主题 → 辅助生成初稿框架

**用户输入示例：**
```
主题：东莞松山湖AI切磋大会活动报道
基本信息：3月29日，60多人参与
嘉宾：付博（绿联NAS）、Star（养虾五阶段）、成啟超（GEO+Skills）、李德明（招投标）
赞助商：模立方OPC社区、唐问老师、极氪汽车
风格：偏正式+社区温度
```

**期望输出：**
- 文章标题建议（3-5个选项）
- 完整文章初稿（含开头、嘉宾亮点、活动氛围、结尾号召）
- 配图位置建议

### 功能3：🔍 会议纪要智能整理
**场景：** 粘贴杂乱会议记录/语音转文字 → 提取关键信息输出结构化纪要

**处理流程：**
1. 原始文本清洗
2. 提取：讨论议题 / 决议事项 / 待办任务 / 责任人 / 截止时间
3. 输出格式化的会议纪要文档

## 技术架构

### 整体架构
```
┌─────────────────────────────────────────────┐
│              前端界面 (HTML/CSS/JS)           │
│         简洁黑白学术风格，响应式布局            │
├─────────────────────────────────────────────┤
│              核心逻辑层                        │
│    - Prompt模板管理                           │
│    - 多功能模块路由                            │
│    - 输入/输出格式处理                         │
├─────────────────────────────────────────────┤
│              AI能力层                          │
│    智谱AI GLM-4-Flash API                     │
│    (免费额度足够开发和演示)                      │
└─────────────────────────────────────────────┘
```

### 技术栈选择
| 组件 | 方案 | 说明 |
|------|------|------|
| **前端** | HTML + CSS + Vanilla JS | 简洁为主，不需要重型框架 |
| **后端/逻辑** | 纯前端方案 | 直接在浏览器中调用API |
| **AI模型** | 智谱GLM-4-Flash | 免费、中文能力强、速度快 |
| **部署方式** | 本地运行 / GitHub Pages / Vercel | 演示方便即可 |

## 快速开始

### 1. 克隆项目

### 2. 配置API Key

#### 方法一：环境变量（推荐）
1. 复制 `.env.example` 文件为 `.env`
2. 在 `.env` 文件中填入你的智谱AI API Key

#### 方法二：浏览器设置
1. 打开项目页面
2. 在浏览器控制台中执行：
   ```javascript
   window.setAPIKey('your-api-key-here');
   ```

### 3. 运行项目

#### 本地运行
```bash
# 启动本地服务器
python3 -m http.server 8000

# 访问 http://localhost:8000
```

#### 部署到GitHub Pages
1. 将项目推送到GitHub仓库
2. 在仓库设置中开启GitHub Pages
3. 访问生成的GitHub Pages URL

## 使用指南

### 1. 周报生成
1. 在左侧导航栏点击「周报生成」
2. 在输入框中填写本周工作内容和下周计划
3. 点击「✨ AI生成」按钮
4. 等待生成结果，可在输出区域查看和编辑

### 2. 文章写作
1. 在左侧导航栏点击「文章写作」
2. 在输入框中填写文章主题、基本信息、嘉宾、赞助商等
3. 点击「✨ AI生成」按钮
4. 等待生成结果，可在输出区域查看和编辑

### 3. 会议纪要
1. 在左侧导航栏点击「会议纪要」
2. 在输入框中粘贴会议记录或语音转文字内容
3. 点击「✨ AI生成」按钮
4. 等待生成结果，可在输出区域查看和编辑

## API调用说明

### 核心调用方式
```javascript
// 实际API调用函数
async function callAIAPI(type, input) {
    const apiKey = window.config?.apiKey || 'your-api-key';
    const model = window.config?.model || 'glm-4-flash';
    const apiEndpoint = window.config?.apiEndpoint || 'https://open.bigmodel.cn/api/m/v1/chat/completions';
    
    // 根据类型构建不同的prompt
    let systemPrompt = '';
    switch (type) {
        case 'weekly':
            systemPrompt = '你是一个专业的职场效率助手，擅长将零散的工作记录整理成结构化的周报。';
            break;
        case 'article':
            systemPrompt = '你是一个专业的内容创作者，擅长根据提供的素材生成优质的公众号文章。';
            break;
        case 'meeting':
            systemPrompt = '你是一个专业的会议纪要整理专家，擅长从杂乱的会议记录中提取关键信息。';
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
```

## 项目结构

```
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 核心逻辑
├── config.js           # 配置文件
├── .env.example        # 环境变量示例
└── README.md           # 项目文档
```

## 注意事项

1. **API Key安全**：请不要将API Key硬编码在代码中，建议使用环境变量或localStorage存储
2. **API调用限制**：智谱AI的免费额度有限，请合理使用
3. **浏览器兼容性**：建议使用Chrome、Firefox、Safari等现代浏览器
4. **响应时间**：API调用可能需要一定时间，请耐心等待

## 未来规划

- [ ] 添加更多功能模块（如简历生成、邮件助手等）
- [ ] 优化Prompt工程，提高生成质量
- [ ] 添加用户登录功能，保存历史记录
- [ ] 支持更多AI模型选择
- [ ] 增加离线功能，使用本地模型

## 贡献

欢迎提交Issue和Pull Request，共同改进这个项目！

## 许可证

MIT License

## 联系方式

如有问题或建议，欢迎联系我们。
