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

export function getCastExperience(id: string | number) {
  return instance<dataTypes.castExperienceResponseData>({
    url: `maoyan2/v2/celebrity/${id}/feature/yearbook.json`,
    method: 'GET'
  });
}

export function getCastLife(id: string | number) {
  return instance<dataTypes.castLifeResponseData>({
    url: `maoyan2/v2/celebrity/${id}/feature/life.json`,
    method: 'GET'
  });
}

export function getCastQuotes(id: string | number) {
  return instance<dataTypes.castQuotesResponseData>({
    url: `maoyan2/v2/celebrity/${id}/feature/quotes.json`,
    method: 'GET'
  });
}
