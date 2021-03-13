import instance from './request';

export function getCastDetail(id: number | string) {
  return instance<dataTypes.castResponseData>({
    url: `maoyan2/v6/celebrity/${id}.json`,
    method: 'GET'
  });
}

export function getCastEvaluation(id: number | string) {
  return instance<dataTypes.castEvaluationResponseData>({
    url: `maoyan2/v2/celebrity/${id}/feature/evaluation.json`,
    method: 'GET'
  });
}
