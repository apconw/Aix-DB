<p align="center">
  <a href="https://github.com/apconw/Aix-DB">
    <img src="./docs/docs/images/logo.svg" alt="Aix-DB" width="160"/>
  </a>
</p>

<h3 align="center">Aix-DB - 大模型数据助手</h3>

<p align="center">
  基于大语言模型和RAG技术的智能数据分析系统，实现对话式数据分析（ChatBI），快速实现数据提取与可视化
</p>



<p align="center">
  <a href="https://github.com/apconw/Aix-DB/releases"><img src="https://img.shields.io/github/v/release/apconw/Aix-DB" alt="Release Version" /></a>
  <a href="https://github.com/apconw/Aix-DB/stargazers"><img src="https://img.shields.io/github/stars/apconw/Aix-DB?style=flat" alt="GitHub Stars" /></a>
  <a href="https://github.com/apconw/Aix-DB/blob/master/LICENSE"><img src="https://img.shields.io/github/license/apconw/Aix-DB" alt="License" /></a>
  <a href="https://hub.docker.com/r/apcon/aix-db"><img src="https://img.shields.io/docker/pulls/apcon/aix-db" alt="Docker Pulls" /></a>
</p>

<p align="center">
  <a href="./README.md">简体中文</a> | <a href="./README_en.md">English</a>
</p>

<p align="center">
  <b>寻找企业级 AI 解决方案？</b>
</p>

<p align="center">
  <a href="http://www.aixhub.top/"><img src="https://img.shields.io/badge/🤖_AiX--Bot-8A2BE2?style=for-the-badge&logoColor=white" alt="AiX-Bot" /></a>
</p>

<p align="center">
  我们的商业产品，提供更强大的企业级功能：<br/>
  私有化部署 · 定制化开发 · 专属技术支持 · 多场景 AI 矩阵应用
</p>

<p align="center">
  <b>👇 点击下方场景立即体验 👇</b>
</p>

<p align="center">
  <a href="YOUR_CHAT_URL"><img src="https://img.shields.io/badge/💬_智能对话-4A90D9?style=for-the-badge" alt="智能对话" /></a>
  <a href="YOUR_DATA_URL"><img src="https://img.shields.io/badge/📊_数据问答-10B981?style=for-the-badge" alt="数据问答" /></a>
  <a href="http://www.aixhub.top:5006"><img src="https://img.shields.io/badge/📈_智能写作-F59E0B?style=for-the-badge" alt="智能写作" /></a>
</p>

<p align="center">
  <sub>💼 商务合作请联系微信（备注「商务合作」）| <a href="http://www.aixhub.top/">联系我们</a></sub>
</p>

Aix-DB 基于 **LangChain/LangGraph** 框架，结合 **MCP Skills** 多智能体协作架构，实现自然语言到数据洞察的端到端转换。

**核心能力**：通用问答 · 数据问答（Text2SQL） · 表格问答 · 深度搜索 · 数据可视化 · MCP 多智能体

**产品特点**：📦 开箱即用 · 🔒 安全可控 · 🔌 易于集成 · 🎯 越问越准


## 演示视频

<table align="center">
  <tr>
    <th>🎯 Skill 模式</th>
    <th>💬 标准模式</th>
  </tr>
  <tr>
    <td>
      <video src="https://github.com/user-attachments/assets/ee09d321-4534-4ccf-aa71-ecab83d91caf" controls="controls" muted="muted" style="max-height:320px; min-height: 150px;"></video>
    </td>
    <td>
      <video src="https://github.com/user-attachments/assets/462f4e2e-86e0-4d2a-8b78-5d6ca390c03c" controls="controls" muted="muted" style="max-height:320px; min-height: 150px;"></video>
    </td>
  </tr>
</table>


## 系统架构

<p align="center">
  <img src="./docs/docs/images/system-architecture.svg" alt="系统架构图" width="100%" />
</p>

**分层架构设计：**

- **前端层**：Vue 3 + TypeScript 构建的现代化 Web 界面，集成 ECharts 和 AntV 可视化组件
- **API 网关层**：基于 Sanic 的高性能异步 API 服务，提供 RESTful 接口和 JWT 认证
- **智能服务层**：LLM 服务、Text2SQL Agent、RAG 检索引擎、MCP 多智能体协作
- **数据存储层**：支持多种数据库类型，包括关系型数据库、向量数据库、图数据库和文件存储


## 支持的数据源

<p align="center">
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white" />
  <img src="https://img.shields.io/badge/SQL%20Server-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/ClickHouse-FFCC01?style=for-the-badge&logo=clickhouse&logoColor=black" />
  <img src="https://img.shields.io/badge/达梦_DM-003366?style=for-the-badge&logoColor=white" />
  <img src="https://img.shields.io/badge/Apache_Doris-5C4EE5?style=for-the-badge&logo=apache&logoColor=white" />
  <img src="https://img.shields.io/badge/StarRocks-FF6F00?style=for-the-badge&logoColor=white" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/CSV-217346?style=for-the-badge&logo=files&logoColor=white" />
  <img src="https://img.shields.io/badge/Excel-217346?style=for-the-badge&logo=microsoft-excel&logoColor=white" />
  <img src="https://img.shields.io/badge/更多数据源持续支持中...-gray?style=for-the-badge" />
</p>


<p align="center">
  <img src="./docs/docs/images/architecture-flow.svg" alt="数据问答核心流程" width="100%" />
</p>

| 步骤  | 模块             | 说明                                                               |
| :---: | ---------------- | ------------------------------------------------------------------ |
|   1   | **用户输入**     | 用户以自然语言提出数据查询问题                                     |
|   2   | **LLM 意图理解** | 大模型解析问题意图，抽取关键实体和查询条件                         |
|   3   | **RAG 知识检索** | Embedding + BM25 混合检索，结合 Neo4j 图谱获取相关表结构和业务知识 |
|   4   | **SQL 生成**     | Text2SQL 引擎生成 SQL 语句，并进行语法校验和优化                   |
|   5   | **数据库执行**   | 在目标数据源执行 SQL，支持 8+ 种数据库类型                         |
|   6   | **可视化展示**   | 自动生成 ECharts/AntV 图表，直观呈现分析结果                       |



## 快速开始

### 使用 Docker 部署（推荐）
```bash
docker run -d \
  --name aix-db \
  --restart unless-stopped \
  -e TZ=Asia/Shanghai \
  -e SERVER_HOST=0.0.0.0 \
  -e SERVER_PORT=8088 \
  -e SERVER_WORKERS=2 \
  -e LANGFUSE_TRACING_ENABLED=false \
  -e LANGFUSE_SECRET_KEY= \
  -e LANGFUSE_PUBLIC_KEY= \
  -e LANGFUSE_BASE_URL= \
  -p 18080:80 \
  -p 18088:8088 \
  -p 15432:5432 \
  -p 9000:9000 \
  -p 9001:9001 \
  -v ./volume/pg_data:/var/lib/postgresql/data \
  -v ./volume/minio/data:/data \
  -v ./volume/logs/supervisor:/var/log/supervisor \
  -v ./volume/logs/nginx:/var/log/nginx \
  -v ./volume/logs/aix-db:/var/log/aix-db \
  -v ./volume/logs/minio:/var/log/minio \
  -v ./volume/logs/postgresql:/var/log/postgresql \
  --add-host host.docker.internal:host-gateway \
  crpi-7xkxsdc0iki61l0q.cn-hangzhou.personal.cr.aliyuncs.com/apconw/aix-db:1.2.3
```

### 使用 Docker Compose

```bash
git clone https://github.com/apconw/Aix-DB.git
cd Aix-DB/docker
cp .env.template .env  # 复制环境变量模板，按需修改
docker-compose up -d
```

### 访问系统

**Web 管理界面**
- 访问地址：http://localhost:18080
- 默认账号：`admin`
- 默认密码：`123456`

**PostgreSQL 数据库**
- 连接地址：`localhost:15432`
- 数据库名：`aix_db`
- 用户名：`aix_db`
- 密码：`1`

### 本地开发

**① 克隆项目**
```bash
git clone https://github.com/apconw/Aix-DB.git
cd Aix-DB
```

**② 启动依赖中间件**（PostgreSQL、MinIO 等）
```bash
cd docker
docker-compose up -d
```

**③ 配置环境变量**

编辑项目根目录下的 `.env.dev`，按需修改数据库连接、MinIO 地址等配置（默认配置可直接使用）

**④ 安装 Python 依赖**（需要 Python 3.11）
```bash
# 方式一：pip
pip install -r requirements.txt

# 方式二：uv（推荐，更快）
uv venv --python 3.11
source .venv/bin/activate
uv sync
```

**⑤ 启动后端服务**
```bash
# Windows PowerShell 专属命令：设置环境变量+运行脚本，一行执行  增加字符兼容性，解决有些机器错误问题。
$env:PYTHONUTF8=1; python serv.py
```

**⑥ 启动前端开发服务器**（另开终端）
```bash
cd web
npm install
npm run dev
```


## 技术栈

**后端**：Sanic · SQLAlchemy · LangChain/LangGraph · Neo4j · FAISS/Chroma · MinIO

**前端**：Vue 3 · TypeScript · Vite 5 · Naive UI · ECharts · AntV

**AI 模型**：OpenAI · Anthropic · DeepSeek · Qwen · Ollama



## 文档
- [配置说明](./docs/docs/index.md)
- [API 文档](http://localhost:8088/docs) (启动后访问)



## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request


## 联系我们

如有任何疑问，进微信群欢迎通过以下方式联系：

<table align="center">
  <tr>
    <td align="center"><b>微信公众号</b></td>
  </tr>
  <tr>
    <td align="center"><img src="./docs/docs/images/qrcode.jpg" alt="微信公众号" width="180"/></td>
  </tr>
</table>


## 项目私有化部署服务

<table>
<tr>
<td width="100%">

<div align="center" style="max-width: 560px; margin: 0 auto; border: 1px solid #d0d7de; border-radius: 12px; padding: 24px; background: #f8f7f5; color: #1f2328; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', sans-serif; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">

<span style="font-size: 1.05em; color: #1f2328; font-weight: 600;">🚀 仅承接完整交付，不接零散咨询</span>

<div style="margin-top: 6px; font-size: 0.9em; color: #424a53;">开源维护不易，为保障交付质量，服务聚焦于「部署 + 定制 + 资料」一站式落地</div>


<table width="100%" style="margin: 12px 0; border-collapse: collapse; color: #1f2328;">
<tr>
<td width="33%" align="center" style="padding: 12px; border-right: 1px solid #d0d7de;">
<strong style="color: #1f2328;">📦 部署</strong><br/>
<span style="font-size: 0.85em; color: #424a53;">指定环境部署并跑通，无需自行排查</span>
</td>
<td width="33%" align="center" style="padding: 12px; border-right: 1px solid #d0d7de;">
<strong style="color: #1f2328;">🔧 定制</strong><br/>
<span style="font-size: 0.85em; color: #424a53;">简单功能定制与集成</span>
</td>
<td width="34%" align="center" style="padding: 12px;">
<strong style="color: #1f2328;">📄 资料</strong><br/>
<span style="font-size: 0.85em; color: #424a53;">部署文档、配置说明、二开/运维指导</span>
</td>
</tr>
</table>

<div style="text-align: center; margin: 16px 0;">
<strong style="font-size: 1.1em; color: #1f2328;">服务报价</strong><br/>
<span style="font-size: 1.4em; color: #0969da; font-weight: 700;">¥5,000</span> <span style="font-size: 0.9em; color: #424a53;">（一口价）</span>
</div>

<div style="text-align: center; font-size: 0.9em; color: #424a53;">含：远程部署、简单定制开发、完整资料包、二开指导、<strong style="color: #1f2328;">一年运维支持</strong></div>


<div align="center" style="margin-top: 16px; color: #1f2328;">
<strong>联系作者</strong>：微信 <code style="background: #ebecf0; color: #1f2328; padding: 4px 10px; border-radius: 6px; font-size: 1em; border: 1px solid #d0d7de;">weber812</code><br/>
<span style="font-size: 0.9em; color: #424a53;">添加时请备注：<b>项目部署</b></span>
</div>

</div>

</td>
</tr>
</table>


## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=apconw/Aix-DB&type=Date)](https://star-history.com/#apconw/Aix-DB&Date)



## 开源许可

本项目采用 [Apache License 2.0](./LICENSE) 开源许可证。
