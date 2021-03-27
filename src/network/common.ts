import instance from './request';

/**
 * 通过百度地图接口根据 ip 地址获取当前位置信息
 * @export
 * @return {*}
 */
export function getCurrLocation() {
  return instance<dataTypes.ILocaltionInfo>({
    url: 'baidu/ip',
    method: 'GET',
    params: {
      coor: 'bd09ll'
    }
  });
}
