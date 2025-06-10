// import { mockEventStreamText ***REMOVED*** from '@/data'
// import { currentHost ***REMOVED*** from '@/utils/location'
// import request from '@/utils/request'

/**
 * Event Stream 调用大模型接口 Ollama3 (Fetch 调用***REMOVED***
 */
export async function createOllama3Stylized(text, qa_type, uuid,chat_id***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const businessStore = useBusinessStore(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/dify/get_answer`***REMOVED***
  const params = {***REMOVED***
  Object.keys(params***REMOVED***.forEach((key***REMOVED*** => {
    url.searchParams.append(key, params[key]***REMOVED***
  ***REMOVED******REMOVED***

  // 文件问答传文件url
  if (text.includes('表格数据'***REMOVED******REMOVED*** {
    text = `${businessStore.$state.file_url***REMOVED***|${text***REMOVED***`
  ***REMOVED*** else if (qa_type === 'FILEDATA_QA'***REMOVED*** {
    // 表格问答默认带上文件url/key
    text = `${businessStore.$state.file_url***REMOVED***|${text***REMOVED***`
  ***REMOVED***

  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`,
    ***REMOVED***,
    body: JSON.stringify({
      query: text,
      qa_type,
      uuid:uuid,
      chat_id: chat_id,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 用户登录
 * @param username
 * @param password
 * @returns
 */
export async function login(username, password***REMOVED*** {
  const url = new URL(`${location.origin***REMOVED***/sanic/user/login`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    ***REMOVED***,
    body: JSON.stringify({
      username,
      password,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 查询用户对话历史
 * @param page
 * @param limit
 * @returns
 */
export async function query_user_qa_record(page, limit, search_text,chat_id***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/user/query_user_record`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      page,
      limit,
      search_text,
      chat_id
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 删除对话历史记录
 * @param page
 * @param limit
 * @returns
 */
export async function delete_user_record(ids***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/user/delete_user_record`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      record_ids: ids,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 用户反馈
 * @param chat_id
 * @param rating
 * @returns
 */
export async function fead_back(chat_id, rating***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/user/dify_fead_back`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      chat_id,
      rating,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 问题建议
 * @param chat_id
 * @param rating
 * @returns
 */
export async function dify_suggested(chat_id***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/dify/get_dify_suggested`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      chat_id,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * word 转 md
 * @param file_key
 * @returns
 */
export async function word_to_md(file_key***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/ta/word_to_md`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      file_key,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 查询项目列表
 * @param page
 * @param limit
 * @returns
 */
export async function query_demand_records(page, limit***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/ta/query_demand_records`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      page,
      limit,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 保存项目信息
 * @param project_data
 * @returns
 */
export async function insert_demand_manager(project_data***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/ta/insert_demand_manager`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      project_data,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 删除项目信息
 * @param id
 * @returns
 */
export async function delete_demand_records(id***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/ta/delete_demand_records`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      id,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***

/**
 * 抽取功能点
 * @param doc_id
 * @returns
 */
export async function abstract_doc_func(doc_id***REMOVED*** {
  const userStore = useUserStore(***REMOVED***
  const token = userStore.getUserToken(***REMOVED***
  const url = new URL(`${location.origin***REMOVED***/sanic/ta/abstract_doc_func`***REMOVED***
  const req = new Request(url, {
    mode: 'cors',
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token***REMOVED***`, // 添加 token 到头部
    ***REMOVED***,
    body: JSON.stringify({
      doc_id,
    ***REMOVED******REMOVED***,
  ***REMOVED******REMOVED***
  return fetch(req***REMOVED***
***REMOVED***
