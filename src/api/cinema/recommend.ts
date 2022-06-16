import { http } from '@/utils/http/axios';
import { url } from '@/api/api';
import { RequestEnum } from '@/enums/httpEnum';

// 获取所用应用
export async function getRecommend(params) {
  return await http.request({
    url: url.CINEMA_RECOMMEND,
    method: RequestEnum.GET,
    params,
  });
}

// 视频详情
export async function getDetail(params) {
  return await http.request({
    url: `${url.CINEMA_RECOMMEND}${params}`,
    method: RequestEnum.GET,
  });
}
