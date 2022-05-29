import { http } from '@/utils/http/axios';
import { url } from '@/api/api';
import { RequestEnum } from '@/enums/httpEnum';

// 获取所用应用
export async function getAll(params) {
  return await http.request({
    url: url.APPS,
    method: 'get',
    params,
  });
}

// 获取所用应用
export async function getPageData(params) {
  return await http.request({
    url: url.APPS_LIST,
    method: 'get',
    params,
  });
}

// 添加应用
export async function addApp(params) {
  return await http.request({
    url: url.APPS,
    method: RequestEnum.POST,
    params,
  });
}

// 删除应用
export async function delApp(params) {
  return await http.request({
    url: url.APPS_DEL,
    method: RequestEnum.DELETE,
    params,
  });
}
