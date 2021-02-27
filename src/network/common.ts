import instance from './request';

const baiduAK = 'c7rsOB1n5WsFayinNBrxXSDpZz4pncG2';

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
      ak: baiduAK,
      coor: 'bd09ll'
    }
  });
}
