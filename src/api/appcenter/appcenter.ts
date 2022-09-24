import { http } from '@/utils/http/axios';
import { url } from '@/api/api';
import { RequestEnum } from '@/enums/httpEnum';

// 获取所用应用
export async function getAll(params) {
  return await http.request({
    url: `${url.APPS}/list`,
    method: 'get',
    params,
  });
}

// 获取所用应用
export async function getPageData(params) {
  return await http.request({
    url: `${url.APPS}/listByPage`,
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
    url: url.APPS_INFO,
    method: RequestEnum.DELETE,
    params,
  });
}

// 应用修改
export async function editApp(params) {
  return await http.request({
    url: url.APPS_INFO,
    method: RequestEnum.PUT,
    params,
  });
}

// 应用详情
export async function getApp(params) {
  return await http.request({
    url: url.APPS_INFO,
    method: RequestEnum.GET,
    params,
  });
}

// 下拉分组
export async function getGroup() {
  return await http.request({
    url: url.APPS_GROUP_COMBO,
    method: RequestEnum.GET,
  });
}
