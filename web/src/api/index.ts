import { mockEventStreamText ***REMOVED*** from '@/data'
import { currentHost ***REMOVED*** from '@/utils/location'
import request from '@/utils/request'

/**
 * Event Stream 调用大模型接口 Ollama3 (Fetch 调用***REMOVED***
 */
export async function createOllama3Stylized(text, qa_type, uuid***REMOVED*** {
    const userStore = useUserStore(***REMOVED***
    const token = userStore.getUserToken(***REMOVED***
    const businessStore = useBusinessStore(***REMOVED***
    const url = new URL(`${location.origin***REMOVED***/sanic/dify/get_answer`***REMOVED***
    const params = {***REMOVED***
    Object.keys(params***REMOVED***.forEach((key***REMOVED*** => {
        url.searchParams.append(key, params[key]***REMOVED***
    ***REMOVED******REMOVED***

    //文件问答传文件url
    if (text.includes('总结归纳文档的关键信息'***REMOVED******REMOVED*** {
        text = `${businessStore.$state.file_url***REMOVED***|总结归纳文档的关键信息`
    ***REMOVED*** else if (qa_type === 'FILEDATA_QA'***REMOVED*** {
        //表格问答默认带上文件url/key
        text = `${businessStore.$state.file_url***REMOVED***|${text***REMOVED***`
    ***REMOVED***

    const req = new Request(url, {
        mode: 'cors',
        method: 'post',
  ***REMOVED***
    ***REMOVED***
            Authorization: `Bearer ${token***REMOVED***`
        ***REMOVED***,
  ***REMOVED***
            query: text,
            qa_type: qa_type,
            chat_id: uuid
        ***REMOVED******REMOVED***
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
  ***REMOVED***
            'Content-Type': 'application/json'
        ***REMOVED***,
  ***REMOVED***
            username,
            password
        ***REMOVED******REMOVED***
    ***REMOVED******REMOVED***
    return fetch(req***REMOVED***
***REMOVED***

/**
 * 查询用户对话历史
 * @param page
 * @param limit
 * @returns
 */
export async function query_user_qa_record(page, limit***REMOVED*** {
    const userStore = useUserStore(***REMOVED***
    const token = userStore.getUserToken(***REMOVED***
    const url = new URL(`${location.origin***REMOVED***/sanic/user/query_user_record`***REMOVED***
    const req = new Request(url, {
        mode: 'cors',
        method: 'post',
  ***REMOVED***
    ***REMOVED***
            Authorization: `Bearer ${token***REMOVED***` // 添加 token 到头部
        ***REMOVED***,
  ***REMOVED***
            page,
            limit
        ***REMOVED******REMOVED***
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
  ***REMOVED***
    ***REMOVED***
            Authorization: `Bearer ${token***REMOVED***` // 添加 token 到头部
        ***REMOVED***,
  ***REMOVED***
            record_ids: ids
        ***REMOVED******REMOVED***
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
  ***REMOVED***
    ***REMOVED***
            Authorization: `Bearer ${token***REMOVED***` // 添加 token 到头部
        ***REMOVED***,
  ***REMOVED***
            chat_id,
            rating
        ***REMOVED******REMOVED***
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
  ***REMOVED***
    ***REMOVED***
            Authorization: `Bearer ${token***REMOVED***` // 添加 token 到头部
        ***REMOVED***,
  ***REMOVED***
            chat_id
        ***REMOVED******REMOVED***
    ***REMOVED******REMOVED***
    return fetch(req***REMOVED***
***REMOVED***
