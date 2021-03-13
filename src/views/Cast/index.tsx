import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastDetail, getCastEvaluation } from '@network/cast';
import { imgUrlParser } from '@utils/index';
import { Button } from 'woo-ui-react';
import './_style.scss';

interface ICastParams {
  id: '';
}

const defaultCastDetail: dataTypes.ICastDetail = {
  aliasName: '',
  avatar: '', // 头像 url
  birthday: '',
  birthplace: '',
  cnm: '',
  company: '',
  constellation: '',
  deathDate: '',
  desc: '',
  enm: '',
  graduateSchool: '',
  height: 0,
  id: 0,
  nation: '', // 民族
  nationality: '', // 国籍
  photoNum: 0,
  photos: [''],
  sexy: '',
  titleList: [''], // 头衔
  titles: '',
  evaluation: { content: '', spokesman: '' }
};

const Cast: FC = () => {
  const { id } = useParams<ICastParams>();
  const [castDetail, setCastDetail] = useState(defaultCastDetail);

  const onDetailBtnClick = async () => {
    let temp = castDetail;
    temp = await (await getCastDetail(id)).data;
    const { items } = await (await getCastEvaluation(id)).data;
    temp.evaluation = items[0];
    console.log(temp, 'data');
    setCastDetail(temp);
  };

  return (
    <>
      "CAST"
      <span>{id}</span>
      <Button onClick={onDetailBtnClick}>DETAIL</Button>
      <div className="detail_cast">
        <img src={imgUrlParser(castDetail.avatar, 240, 330)} alt="" />
        <div className="castDetail_info">
          <h1 className="castDetail_name">{castDetail.cnm}</h1>
          <p className="castDetail_name_en">{castDetail.enm}</p>
          <p className="castDetail_more">
            {castDetail.titleList.map((title) => (
              <span className="castDetail_title" key={title}>
                {title}
              </span>
            ))}
            <span className="castDetail_birth">{castDetail.birthday}</span>
            <span className="castDetail_gender">{castDetail.sexy}</span>
            <span className="castDetail_cx">{castDetail.constellation}</span>
            <span className="castDetail_height">{castDetail.height} cm</span>
          </p>
          <p className="castDetail_birthPlace">{castDetail.birthplace}</p>
          {!!castDetail.evaluation ? (
            <div className="castDetail_evaluation">
              <span className="evaluation_content">
                “{castDetail.evaluation.content}”
              </span>
              <p className="evaluation_source">
                —— {castDetail.evaluation.spokesman}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Cast;
