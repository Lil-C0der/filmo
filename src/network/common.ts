import instance from './request';

// const baiduAK = 'c7rsOB1n5WsFayinNBrxXSDpZz4pncG2&coor=bd09ll';

const baiduAK = 'c7rsOB1n5WsFayinNBrxXSDpZz4pncG2';

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
