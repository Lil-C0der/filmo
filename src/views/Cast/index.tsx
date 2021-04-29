import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getCastDetail,
  getCastEvaluation,
  getCastExperience,
  getCastLife,
  getCastQuotes
} from '@network/cast';
import { imgUrlParser } from '@utils/index';
import Slide from '@cpnt/Slide';

import './_style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICastDetail } from '@/types';

interface ICastParams {
  id: '';
}

const defaultCastDetail: ICastDetail = {
  aliasName: '',
  avatar: '', // 头像 url
  birthday: '',
  birthplace: '',
  bloodType: '',
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
  evaluation: undefined,
  movieItems: [],
  musicItems: [],
  showItems: [],
  experienceItems: [],
  feelingItems: [],
  familyItems: [],
  quotes: []
};

const defaultDetailList: { key: string; value: string | number }[] = [
  { key: '别名', value: '' },
  { key: '身高', value: 0 },
  { key: '血型', value: '' },
  { key: '性别', value: '' },
  { key: '出生地', value: '' },
  { key: '出生日期', value: '' },
  { key: '身份', value: '' },
  { key: '国籍', value: '' },
  { key: '民族', value: '' },
  { key: '经纪公司', value: '' },
  { key: '星座', value: '' },
  { key: '毕业院校', value: '' }
];

const Cast: FC = () => {
  const { id } = useParams<ICastParams>();
  const [castDetail, setCastDetail] = useState(defaultCastDetail);
  const [detailList, setDetailList] = useState(defaultDetailList);

  const initCastDetail = useCallback(async () => {
    let temp = defaultCastDetail;
    temp = await (await getCastDetail(id)).data;
    const { items } = await (await getCastEvaluation(id)).data;
    const { movieItems, musicItems, showItems } = await (
      await getCastExperience(id)
    ).data;
    const { experienceItems, feelingItems, familyItems } = await (
      await getCastLife(id)
    ).data;
    const quotes = await (await getCastQuotes(id)).data.items;

    setCastDetail({
      ...temp,
      evaluation: items?.[0],
      movieItems: movieItems?.reverse(),
      musicItems: musicItems?.reverse(),
      showItems: showItems?.reverse(),
      experienceItems,
      feelingItems,
      familyItems,
      quotes
    });
    setDetailList([
      { key: '别名', value: temp.aliasName.replaceAll(',', ', ') },
      { key: '国籍', value: temp.nationality },
      { key: '民族', value: temp.nation },
      { key: '性别', value: temp.sexy },
      { key: '出生地', value: temp.birthplace.replaceAll(',', ', ') },
      { key: '出生日期', value: temp.birthday },
      { key: '星座', value: temp.constellation },
      { key: '身高', value: temp.height ? `${temp.height} cm` : '' },
      { key: '血型', value: temp.bloodType },
      { key: '毕业院校', value: temp.graduateSchool },
      {
        key: '身份',
        value: temp.titles ? temp.titles.replaceAll(' |', ',') : ''
      },
      { key: '经纪公司', value: temp.company }
    ]);
  }, [id]);

  useEffect(() => {
    initCastDetail();
  }, [initCastDetail]);

  const renderSlideItem = (itemList: string[]) => {
    let slideItemArr: Array<JSX.Element> = [];

    for (let startIdx = 0; startIdx < itemList.length; startIdx += 5) {
      slideItemArr.push(
        <Slide.Item index={startIdx / 5} key={startIdx}>
          <ul className="cast_photos_wrapper">
            {itemList.slice(startIdx, startIdx + 5).map((itemUrl, i) => (
              <li key={i}>
                <div className="img_wrapper">
                  <img src={imgUrlParser(itemUrl, 260, 340)} alt="" />
                </div>
              </li>
            ))}
          </ul>
        </Slide.Item>
      );
    }

    return slideItemArr;
  };

  const renderExperienceItems = (
    experienceList: { content: string; year?: number }[] | undefined,
    title: string
  ) => (
    <>
      {experienceList?.length ? (
        <p className="experience_title">{title}</p>
      ) : null}
      {experienceList?.map(({ year, content }, i) => (
        <div
          className="experience_item"
          key={`${experienceList.toString()}_${i}`}
        >
          {year ? (
            <p className="experience_year">
              <FontAwesomeIcon
                className="experience_year_icon"
                icon={['far', 'clock']}
              ></FontAwesomeIcon>
              {year}
            </p>
          ) : null}
          <p className="experience_content">{content}</p>
        </div>
      ))}
    </>
  );

  return (
    <div className="cast">
      <div className="detail_cast_infoWrap">
        <img src={imgUrlParser(castDetail.avatar, 240, 330)} alt="" />
        <div className="castDetail_info">
          <h1 className="castDetail_name">{castDetail.cnm}</h1>
          <p className="castDetail_name_en">{castDetail.enm}</p>
          <p className="castDetail_more">
            {castDetail.titleList?.map((title) => (
              <span className="castDetail_title" key={title}>
                {title}
              </span>
            ))}
            {castDetail.birthday ? (
              <span className="castDetail_birth">{castDetail.birthday}</span>
            ) : null}
            <span className="castDetail_gender">{castDetail.sexy}</span>
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
      {/* 下半部分 */}
      <div className="detail_cast_introWrap">
        <div className="detail_cast_intro">
          <p className="cast_intro_title">影人简介</p>
          <p className="cast_intro_desc">{castDetail.desc}</p>

          <p className="cast_intro_title">影人信息</p>
          <div className="cast_intro_detail">
            {detailList.map((item) =>
              item.value ? (
                <div className="detail_item" key={item.key}>
                  <span className="detail_item_key">{item.key}：</span>
                  <span className="detail_item_value">{item.value}</span>
                </div>
              ) : null
            )}
          </div>

          {castDetail.photos.length ? (
            <>
              <p className="cast_intro_title">相册</p>
              <Slide
                interval={5000}
                height="170px"
                className="cast_intro_slide"
              >
                {renderSlideItem(castDetail.photos)}
              </Slide>
            </>
          ) : null}

          {castDetail.movieItems?.length ||
          castDetail.musicItems?.length ||
          castDetail.showItems?.length ? (
            <>
              <p className="cast_intro_title">作品</p>
              <div className="cast_intro_experience">
                {renderExperienceItems(castDetail.movieItems, '影视作品')}
                {renderExperienceItems(castDetail.musicItems, '音乐作品')}
                {renderExperienceItems(castDetail.showItems, '其他')}
              </div>
            </>
          ) : null}

          {castDetail.experienceItems?.length ||
          castDetail.familyItems?.length ||
          castDetail.feelingItems?.length ? (
            <>
              <p className="cast_intro_title">个人生活</p>
              <div className="cast_intro_life">
                {renderExperienceItems(castDetail.experienceItems, '早年经历')}
                {renderExperienceItems(castDetail.familyItems, '家庭背景')}
                {renderExperienceItems(castDetail.feelingItems, '情感生活')}
              </div>
            </>
          ) : null}

          {castDetail.quotes?.length ? (
            <>
              <p className="cast_intro_title">语录</p>
              <div className="cast_intro_quotes">
                {castDetail.quotes.map((quote, i) => (
                  <p className="cast_quote" key={i}>
                    “{quote.content}”
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Cast;
