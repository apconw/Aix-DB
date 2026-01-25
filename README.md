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

---

Aix-DB 基于 **LangChain/LangGraph** 框架，结合 **MCP Skills** 多智能体协作架构，实现自然语言到数据洞察的端到端转换。

**核心能力**：通用问答 · 数据问答（Text2SQL） · 表格问答 · 深度搜索 · 数据可视化 · MCP 多智能体

**产品特点**：📦 开箱即用 · 🔒 安全可控 · 🔌 易于集成 · 🎯 越问越准

---

## 演示视频

<p align="center">
  <video src="https://github.com/user-attachments/assets/462f4e2e-86e0-4d2a-8b78-5d6ca390c03c" controls="controls" muted="muted" class="d-block rounded-bottom-2 border-top width-fit" style="max-height:640px; min-height: 200px; width: 80%;">
  </video>
</p>

---

## 系统架构

<p align="center">
  <img src="./docs/docs/images/system-architecture.svg" alt="系统架构图" width="100%" />
</p>

**分层架构设计：**

- **前端层**：Vue 3 + TypeScript 构建的现代化 Web 界面，集成 ECharts 和 AntV 可视化组件
- **API 网关层**：基于 Sanic 的高性能异步 API 服务，提供 RESTful 接口和 JWT 认证
- **智能服务层**：LLM 服务、Text2SQL Agent、RAG 检索引擎、MCP 多智能体协作
- **数据存储层**：支持多种数据库类型，包括关系型数据库、向量数据库、图数据库和文件存储

---

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

| 步骤 | 模块 | 说明 |
|:---:|------|------|
| 1 | **用户输入** | 用户以自然语言提出数据查询问题 |
| 2 | **LLM 意图理解** | 大模型解析问题意图，抽取关键实体和查询条件 |
| 3 | **RAG 知识检索** | Embedding + BM25 混合检索，结合 Neo4j 图谱获取相关表结构和业务知识 |
| 4 | **SQL 生成** | Text2SQL 引擎生成 SQL 语句，并进行语法校验和优化 |
| 5 | **数据库执行** | 在目标数据源执行 SQL，支持 8+ 种数据库类型 |
| 6 | **可视化展示** | 自动生成 ECharts/AntV 图表，直观呈现分析结果 |


---

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
  crpi-7xkxsdc0iki61l0q.cn-hangzhou.personal.cr.aliyuncs.com/apconw/aix-db:1.2.2
```

### 使用 Docker Compose

```bash
git clone https://github.com/apconw/Aix-DB.git
cd Aix-DB/docker
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

```bash
# 克隆项目
git clone https://github.com/apconw/Aix-DB.git
cd Aix-DB

# 安装依赖 (需要 Python 3.11)
pip install -r requirements.txt

# 启动后端服务
python serv.py

# 启动前端开发服务器 (另开终端)
cd web
npm install
npm run dev
```

---

## 技术栈

**后端**：Sanic · SQLAlchemy · LangChain/LangGraph · Neo4j · FAISS/Chroma · MinIO

**前端**：Vue 3 · TypeScript · Vite 5 · Naive UI · ECharts · AntV

**AI 模型**：OpenAI · Anthropic · DeepSeek · Qwen · Ollama

---

## 文档
- [配置说明](./docs/docs/index.md)
- [API 文档](http://localhost:8088/docs) (启动后访问)


---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 联系我们

如有任何疑问，欢迎通过以下方式联系：

<table align="center">
  <tr>
    <td align="center"><b>微信交流群</b><br/><small>（备注进群）</small></td>
    <td align="center"><b>微信公众号</b></td>
  </tr>
  <tr>
    <td align="center"><img src="./docs/docs/images/wchat.jpg" alt="微信交流群" width="180"/></td>
    <td align="center"><img src="./docs/docs/images/wchat_account.jpg" alt="微信公众号" width="180"/></td>
  </tr>
</table>

### 技术支持

> 开源不易，本人精力和时间有限，如需 **一对一技术支持**，可以赞助支持一下。
>
> 联系微信，备注 **技术支持**

**一对一技术支持服务内容：**
- 亲自远程帮您 **配置环境并部署**
- 提供 **项目资料及二开思路**

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=apconw/Aix-DB&type=Date)](https://star-history.com/#apconw/Aix-DB&Date)

---

## 开源许可

本项目采用 [Apache License 2.0](./LICENSE) 开源许可证。
