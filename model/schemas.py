"""
API 请求和响应 Schema 定义
用于 Swagger 文档生成
"""

from typing import List, Optional, Any, Dict, Generic, TypeVar
from pydantic import BaseModel, Field


def get_schema(model: type[BaseModel]) -> dict:
    """将 Pydantic 模型转换为 OpenAPI schema，并展开所有 $defs 引用"""
    schema = model.model_json_schema()

    # 如果存在 $defs，需要展开所有引用
    if "$defs" in schema:
        defs = schema.pop("$defs")

        def resolve_refs(obj, defs_dict):
            """递归解析所有 $ref 引用"""
            if isinstance(obj, dict):
                if "$ref" in obj:
                    # 解析 $ref: #/$defs/ModelName -> ModelName
                    ref_path = obj["$ref"]
                    if ref_path.startswith("#/$defs/"):
                        model_name = ref_path.replace("#/$defs/", "")
                        if model_name in defs_dict:
                            # 递归解析引用的模型（深拷贝避免修改原对象）
                            import copy

                            resolved = resolve_refs(copy.deepcopy(defs_dict[model_name]), defs_dict)
                            # 合并其他属性（如 description, title 等）
                            other_props = {k: v for k, v in obj.items() if k != "$ref"}
                            if other_props and isinstance(resolved, dict):
                                # 保留原有属性，但用 other_props 中的属性覆盖
                                resolved = {**resolved, **other_props}
                            return resolved
                    # 如果不是 $defs 引用，保持原样
                    return obj
                else:
                    # 递归处理所有值
                    return {k: resolve_refs(v, defs_dict) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [resolve_refs(item, defs_dict) for item in obj]
            else:
                return obj

        # 展开所有引用
        schema = resolve_refs(schema, defs)

    return schema


# ==================== 通用响应模型 ====================
class BaseResponse(BaseModel):
    """通用响应模型"""

    code: int = Field(description="响应码，200表示成功")
    msg: str = Field(description="响应消息")
    data: Any = Field(description="响应数据")


# ==================== 分页模型 ====================
T = TypeVar("T")


class PaginationParams(BaseModel):
    """分页请求参数"""

    page: int = Field(1, description="页码，从1开始")
    size: int = Field(20, description="每页大小")
    order_by: Optional[str] = Field(None, description="排序字段")
    desc: bool = Field(False, description="是否降序")


class PaginatedResponse(BaseModel, Generic[T]):
    """分页响应模型"""

    records: List[T] = Field(description="数据列表")
    total_count: int = Field(description="总记录数")
    current_page: int = Field(description="当前页码")
    total_pages: int = Field(description="总页数")


# ==================== 数据源相关模型 ====================
class DatasourceItem(BaseModel):
    """数据源项"""

    id: int = Field(description="数据源ID")
    name: str = Field(description="数据源名称")
    description: Optional[str] = Field(None, description="描述")
    type: str = Field(description="数据源类型")
    type_name: Optional[str] = Field(None, description="类型名称")
    status: Optional[str] = Field(None, description="状态")
    num: Optional[str] = Field(None, description="编号")
    create_time: Optional[str] = Field(None, description="创建时间")


class DatasourceListResponse(BaseResponse):
    """数据源列表响应"""

    data: List[DatasourceItem]


class CreateDatasourceRequest(BaseModel):
    """创建数据源请求"""

    name: str = Field(description="数据源名称")
    description: Optional[str] = Field(None, description="描述")
    type: str = Field(description="数据源类型")
    type_name: Optional[str] = Field(None, description="类型名称")
    configuration: str = Field(description="配置信息(加密)")
    tables: Optional[List[Dict[str, Any]]] = Field(None, description="表列表")


class CreateDatasourceResponse(BaseResponse):
    """创建数据源响应"""

    data: Dict[str, Any] = Field(description="创建的数据源信息")


class UpdateDatasourceRequest(BaseModel):
    """更新数据源请求"""

    id: int = Field(description="数据源ID")
    name: Optional[str] = Field(None, description="数据源名称")
    description: Optional[str] = Field(None, description="描述")
    type: Optional[str] = Field(None, description="数据源类型")
    type_name: Optional[str] = Field(None, description="类型名称")
    configuration: Optional[str] = Field(None, description="配置信息(加密)")


class UpdateDatasourceResponse(BaseResponse):
    """更新数据源响应"""

    data: Dict[str, Any] = Field(description="更新的数据源信息")


class SyncTablesRequest(BaseModel):
    """同步表请求"""

    tables: List[Dict[str, Any]] = Field(default_factory=list, description="表列表")


class SyncTablesResponse(BaseResponse):
    """同步表响应"""

    data: Dict[str, str] = Field(description="同步结果")


class DeleteDatasourceResponse(BaseResponse):
    """删除数据源响应"""

    data: Dict[str, str] = Field(description="删除结果")


class DatasourceDetailResponse(BaseResponse):
    """数据源详情响应"""

    data: Dict[str, Any] = Field(description="数据源详情")


class CheckDatasourceRequest(BaseModel):
    """测试数据源连接请求"""

    id: Optional[int] = Field(None, description="数据源ID")
    type: Optional[str] = Field(None, description="数据源类型")
    configuration: Optional[str] = Field(None, description="配置信息")


class CheckDatasourceResponse(BaseResponse):
    """测试数据源连接响应"""

    data: Dict[str, Any] = Field(description="连接测试结果")


class GetTablesByConfRequest(BaseModel):
    """根据配置获取表列表请求"""

    type: str = Field(description="数据源类型")
    configuration: str = Field(description="配置信息")


class GetTablesByConfResponse(BaseResponse):
    """根据配置获取表列表响应"""

    data: List[Dict[str, Any]] = Field(description="表列表")


class GetFieldsByConfRequest(BaseModel):
    """根据配置获取字段列表请求"""

    type: str = Field(description="数据源类型")
    configuration: str = Field(description="配置信息")
    table_name: str = Field(description="表名")


class GetFieldsByConfResponse(BaseResponse):
    """根据配置获取字段列表响应"""

    data: List[Dict[str, Any]] = Field(description="字段列表")


class TableListResponse(BaseResponse):
    """表列表响应"""

    data: List[Dict[str, Any]] = Field(description="表列表")


class FieldListResponse(BaseResponse):
    """字段列表响应"""

    data: List[Dict[str, Any]] = Field(description="字段列表")


class SaveTableRequest(BaseModel):
    """保存表信息请求"""

    id: int = Field(description="表ID")
    table_name: Optional[str] = Field(None, description="表名")
    table_comment: Optional[str] = Field(None, description="表注释")
    custom_comment: Optional[str] = Field(None, description="自定义注释")
    checked: Optional[bool] = Field(None, description="是否选中")


class SaveTableResponse(BaseResponse):
    """保存表信息响应"""

    data: Dict[str, str] = Field(description="保存结果")


class SaveFieldRequest(BaseModel):
    """保存字段信息请求"""

    id: int = Field(description="字段ID")
    field_name: Optional[str] = Field(None, description="字段名")
    field_type: Optional[str] = Field(None, description="字段类型")
    field_comment: Optional[str] = Field(None, description="字段注释")
    custom_comment: Optional[str] = Field(None, description="自定义注释")
    checked: Optional[bool] = Field(None, description="是否选中")


class SaveFieldResponse(BaseResponse):
    """保存字段信息响应"""

    data: Dict[str, str] = Field(description="保存结果")


class PreviewDataRequest(BaseModel):
    """预览数据请求"""

    ds_id: int = Field(description="数据源ID")
    table: Dict[str, Any] = Field(description="表信息")
    fields: List[Dict[str, Any]] = Field(default_factory=list, description="字段列表")


class PreviewDataResponse(BaseResponse):
    """预览数据响应"""

    data: Dict[str, Any] = Field(description="预览数据")


class TableRelationRequest(BaseModel):
    """保存表关系请求"""

    ds_id: int = Field(description="数据源ID")
    relations: List[Dict[str, Any]] = Field(default_factory=list, description="表关系列表")


class TableRelationResponse(BaseResponse):
    """保存表关系响应"""

    data: Dict[str, str] = Field(description="保存结果")


class GetTableRelationResponse(BaseResponse):
    """获取表关系响应"""

    data: List[Dict[str, Any]] = Field(description="表关系列表")


class GetNeo4jRelationResponse(BaseResponse):
    """获取 Neo4j 关系响应"""

    data: List[Dict[str, Any]] = Field(description="Neo4j 关系列表")


# ==================== 用户服务相关模型 ====================
class LoginRequest(BaseModel):
    """登录请求"""

    username: str = Field(description="用户名")
    password: str = Field(description="密码")


class LoginResponse(BaseResponse):
    """登录响应"""

    data: Dict[str, str] = Field(description="登录结果，包含token")


class QueryUserRecordRequest(PaginationParams):
    """查询用户聊天记录请求"""

    search_text: Optional[str] = Field(None, description="搜索关键词，可选")
    chat_id: Optional[str] = Field(None, description="聊天ID，可选")


class QueryUserRecordResponse(BaseResponse):
    """查询用户聊天记录响应"""

    data: PaginatedResponse[Dict[str, Any]] = Field(description="聊天记录列表和总数")


class DeleteUserRecordRequest(BaseModel):
    """删除用户聊天记录请求"""

    record_ids: List[str] = Field(description="要删除的记录ID列表")


class DeleteUserRecordResponse(BaseResponse):
    """删除用户聊天记录响应"""

    data: Dict[str, str] = Field(description="删除结果")


class DifyFeedbackRequest(BaseModel):
    """Dify反馈请求"""

    chat_id: str = Field(description="聊天ID")
    rating: str = Field(description="评分，如：like/dislike")


class DifyFeedbackResponse(BaseResponse):
    """Dify反馈响应"""

    data: Dict[str, str] = Field(description="反馈结果")


# ==================== 用户管理相关模型 ====================
class UserBase(BaseModel):
    """用户基本信息"""

    userName: str = Field(description="用户名")
    mobile: Optional[str] = Field(None, description="手机号")


class AddUserRequest(UserBase):
    """添加用户请求"""

    password: str = Field(description="密码")


class UpdateUserRequest(UserBase):
    """更新用户请求"""

    id: int = Field(description="用户ID")
    password: Optional[str] = Field(None, description="密码(留空则不修改)")


class UserResponse(UserBase):
    """用户响应"""

    id: int = Field(description="用户ID")
    createTime: Optional[str] = Field(None, description="创建时间")
    updateTime: Optional[str] = Field(None, description="修改时间")


class UserListResponse(BaseResponse):
    """用户列表响应"""

    data: PaginatedResponse[UserResponse] = Field(description="用户列表")


class QueryUserListRequest(PaginationParams):
    """查询用户列表请求"""

    name: Optional[str] = Field(None, description="用户名搜索")


class DeleteUserRequest(BaseModel):
    """删除用户请求"""

    id: int = Field(description="用户ID")


# ==================== Dify 服务相关模型 ====================
class LLMGetAnswerRequest(BaseModel):
    """获取LLM答案请求"""

    query: str = Field(description="查询内容")
    chat_id: str = Field(description="聊天ID")
    uuid: str = Field(description="uuid")
    qa_type: str = Field(description="问答类型")
    file_list: List[Dict] = Field(default_factory=list, description="文件列表")
    datasource_id: Optional[int] = Field(None, description="数据源ID")


class DifyGetSuggestedRequest(BaseModel):
    """获取Dify问题建议请求"""

    chat_id: str = Field(description="聊天ID")


class DifyGetSuggestedResponse(BaseResponse):
    """获取Dify问题建议响应"""

    data: Dict[str, List[str]] = Field(description="建议问题列表")


class StopChatRequest(BaseModel):
    """停止聊天请求"""

    task_id: str = Field(description="任务ID")
    qa_type: str = Field(description="问答类型")


class StopChatResponse(BaseResponse):
    """停止聊天响应"""

    data: Dict[str, str] = Field(description="停止结果")


# ==================== 文件服务相关模型 ====================
class ReadFileRequest(BaseModel):
    """读取文件请求"""

    file_qa_str: str = Field(description="文件地址（MinIO对象key）")


class ReadFileResponse(BaseResponse):
    """读取文件响应"""

    data: Dict[str, Any] = Field(description="文件内容，包含data和columns")


class ReadFileColumnRequest(BaseModel):
    """读取文件列信息请求"""

    file_qa_str: str = Field(description="文件地址（MinIO对象key）")


class ReadFileColumnResponse(BaseResponse):
    """读取文件列信息响应"""

    data: Dict[str, List[str]] = Field(description="列名列表")


class UploadFileResponse(BaseResponse):
    """上传文件响应"""

    data: Dict[str, str] = Field(description="上传结果，包含file_key和file_url")


class UploadFileAndParseResponse(BaseResponse):
    """上传文件并解析响应"""

    data: Dict[str, Any] = Field(description="上传和解析结果")


class ProcessFileLlmOutRequest(BaseModel):
    """处理文件问答LLM输出请求"""

    sql: str = Field(description="大模型返回的SQL语句")


class ProcessFileLlmOutResponse(BaseResponse):
    """处理文件问答LLM输出响应"""

    data: Dict[str, Any] = Field(description="查询结果，包含data和columns")


# ==================== 数据问答相关模型 ====================
class ProcessLlmOutRequest(BaseModel):
    """处理LLM输出请求"""

    llm_text: str = Field(description="大模型返回的SQL语句")


class ProcessLlmOutResponse(BaseResponse):
    """处理LLM输出响应"""

    data: Dict[str, Any] = Field(description="查询结果，包含data和columns")


class QueryGuidedReportResponse(BaseResponse):
    """查询引导报告响应"""

    data: Dict[str, List[Dict[str, str]]] = Field(description="报告列表")


# ==================== AI模型相关模型 ====================
class AiModelItem(BaseModel):
    name: str = Field(description="模型名称")
    model_type: int = Field(default=1, description="模型类型")
    base_model: str = Field(description="基础模型")
    supplier: int = Field(default=1, description="供应商")
    protocol: int = Field(default=1, description="协议")
    default_model: bool = Field(False, description="是否默认")


class AiModelConfigItem(BaseModel):
    key: str = Field(description="配置Key")
    val: Any = Field(description="配置Value")
    name: Optional[str] = Field(None, description="配置名称")


class AiModelCreator(AiModelItem):
    api_domain: str = Field(description="API域名")
    api_key: str = Field(description="API Key")
    config_list: List[AiModelConfigItem] = Field(default=[], description="额外配置列表")


class AiModelEditor(AiModelCreator):
    id: int = Field(description="模型ID")


class AiModelGridItem(AiModelItem):
    id: int = Field(description="模型ID")
    create_time: int = Field(description="创建时间")


class AiModelListResponse(BaseResponse):
    data: List[AiModelGridItem] = Field(description="模型列表")


class AiModelDetailResponse(BaseResponse):
    data: AiModelEditor = Field(description="模型详情")
