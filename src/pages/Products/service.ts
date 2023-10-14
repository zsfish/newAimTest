import { request } from '@umijs/max';
import axios from 'axios';
export const baseUrl = 'https://services.dev.dropshipzone.com.au';

// 获取accessToken
export async function queryAccessToken(
  data: ProductAPI.Params_TokenInfo__,
  options?: { [key: string]: any },
) {
  return request<ProductAPI.Result_TokenInfo__>(`${baseUrl}/api/dsz-api/auth`, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

// 获取商品数据
export async function queryProductsList(
  params: ProductAPI.Params_ProductsInfo__,
  options?: { [key: string]: any },
) {
  const devToken = window.localStorage.getItem('new-aim-dev-token');
  if (!devToken) {
    return;
  }
  return request<ProductAPI.Result_ProductsInfo__>(`${baseUrl}/api/dsz-api/products`, {
    method: 'GET',
    params: {
      ...params,
    },
    headers: {
      'Authorization': `jwt ${devToken}`,
    },
    ...(options || {}),
  });
}