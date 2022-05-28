import { http } from '@/utils/http/axios';
import { url } from '@/api/api';

// 获取所用应用
export async function getAll(params) {
  return await http.request({
    url: url.APPS,
    method: 'get',
    params,
  });
}
