# 大模型数据助手

💡 **项目简介**

一个轻量级全链路可基于二次开发的大模型应用开发项目

基于 Dify 、Ollama 、Sanic 和 Text2SQL 📊 等技术构建的一站式大模型应用开发项目，采用 Vue3、TypeScript 和 Vite 5 打造现代UI。它支持通过 ECharts 📈 实现基于大模型的数据图形化问答，具备处理 CSV 文件 📂 表格数据查询的能力。同时，集成了第三方 RAG 系统 和 公网检索 🌐，以支持广泛的通用问答。

作为轻量级的大模型应用开发项目，Sanic-Web 🛠️ 支持快速迭代与扩展，助力大模型项目快速落地。🚀

🌈 **Live Demo**  
[在线体验即将上线，敬请期待！](***REMOVED***

# 🎉 **特性**
- **核心技术栈**：Dify + Ollama + Sanic + Text2SQL
- **UI 框架**：Vue 3 + TypeScript + Vite 5
- **数据问答**：集成 ECharts大模型实现NL2SQL轻量级的数据图形化问答展示
- **表格问答**：支持 CSV格式文件的上传与基于大模型总结预处理和NL2SQL的表格数据问答
- **通用问答**：支持通用数据形式问答基于对接三方RAG系统+公网检索模式
- **应用架构**：作为一个轻量级全链路一站式大模型应用开发框架方便扩展落地
- **灵活部署**：支持大模型应用开发各依赖组件docker-compose一键拉起快速部署零配置

## 运行效果
![image](./images/chat-02.png***REMOVED***
![image](./images/chat-03.png***REMOVED***

```HTML
<video id="video" controls="" preload="none" poster="http://media.w3.org/2010/05/sintel/poster.png">
      <source id="mp4" src="http://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4">
      <source id="webm" src="http://media.w3.org/2010/05/sintel/trailer.webm" type="video/webm">
      <source id="ogv" src="http://media.w3.org/2010/05/sintel/trailer.ogv" type="video/ogg">
      <p>Your user agent does not support the HTML5 Video element.</p>
</video>
```


# 🔧 **前置条件**
* Python 3.8+
* Poetry 1.8.3+
* Node.js 18.12.x+
* Pnpm 9.x
* Dify 0.7.1+
* Mysql 8.0+

📚 **大模型部署**
- [参考Ollama官网部署](https://ollama.com/docs/install***REMOVED***
- 模型: Qwen2.5


## 🚀 **快速开始**

1. **启动服务**
   ```bash
   # 拉起dify服务
   cd docker/dify
   docker-compose up -d
   
   # 启动前后端服务
   cd docker
   docker compose up -d

2. **数据初始化**
   ```bash
   cd docker
   ./init.sh
   
   或执行
   
   python3 common/initialize_mysql.py


## 🛠️ **本地开发**
- 🔧**需要安装项目所有前置依赖**
1. **后端依赖安装**  
   - poetry安装 [参考poetry官方文档](https://python-poetry.org/docs/***REMOVED***
   ```bash
   # 安装项目依赖
   poetry install

2. **前端依赖安装**  
   - 前端基于chatgpt-vue3-light-mvp开源项目[参考chatgpt-vue3-light-mvp部署](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp***REMOVED***


## 🌹 支持

如果你喜欢这个项目或发现有用，可以点右上角 [`Star`](https://github.com/pdsuwwz/chatgpt-vue3-light-mvp***REMOVED*** 支持一下，你的支持是我们不断改进的动力，感谢！ ^_^ 


## License

[MIT](./LICENSE***REMOVED*** License | Copyright © 2020-PRESENT [AiAdventurer](https://github.com/apconw***REMOVED***