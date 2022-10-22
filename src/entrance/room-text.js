/**
 * @description 处理群文字
 */

import baiduTranslate from "../service/baidu-translate.js";
import {
  weather,
  news,
  sportNews,
  oilPrice,
  ncov,
  weiboHot,
  robot,
} from "../service/tx.js";
import { constellation, nba } from "../service/juhe.js";
import { fetchFundClass, fetchFundDetail } from "../service/fund.js";
import config from "../config/index.js";
import { getNbaLiveData } from "../service/getNbaLiveData.mjs";
import { baike } from "../service/baidu-baike.js";
import { getBuyDigital, getCoupon, getGoodToBuy } from "../service/promotion.js";

const handleWeather = async (text) => {
  let city = undefined;
  let weekFlag = false;
  if (text.includes("一周")) {
    weekFlag = true;
    city = text.replace("天气", "").replace("一周", "").trim();
  } else {
    city = text.replace("天气", "").trim();
  }

  return await weather(city === "" ? "巢湖" : city, weekFlag);
};
const handleHotNews = async () => {
  return await news();
};
const handleSportNews = async () => {
  return await sportNews();
};
const handleOilPrice = async (text) => {
  const prov =
    text.replace("油价", "").trim() === ""
      ? "安徽"
      : text.replace("油价", "").replace("省", "").trim();
  return await oilPrice(prov);
};
const handleWeiboHot = async () => {
  return await weiboHot();
};
const handleNba = async () => {
  return await nba();
};
const handleConstellation = async (text) => {
  const consName = text.replace("星座", "").trim();
  return await constellation(consName);
};
const handleFundClass = async (text) => {
  const keyWord = text.replace("基金类型", "").trim();
  return await fetchFundClass(keyWord);
};
const handleFundDetail = async (text) => {
  const code = text.replace("基金代码", "").trim();
  return await fetchFundDetail(code);
};
const handleTranlation = async (text) => {
  return await baiduTranslate(text);
};
const handleSharesDetail = async (text) => {
  const code = text.replace("股票代码", "").trim();
  return await fetchSharesDetail(code);
};
const handNcov = async (text) => {
  const city = text.replace("疫情", "").trim();
  return await ncov(city);
};

const handNbaLive = async (text) => {
  const res = await getNbaLiveData();
  return res.slice(1, res.length - 1).split("$");
};

const handleBaidu = async (text) => {
  const entry = text.replace("百度", "").trim();
  return await baike(entry);
};

const handleCoupon = async (text) => {
  if (text !== '优惠券') return
  return await getCoupon()
}

const handleGoodToBuy = async (text) => {
  if (text !== '买买买') return
  return await getGoodToBuy()
}

const handleBuyDigital = async (text) => {
  if (text !== '买数码') return
  return await getBuyDigital()
}


// 关键词匹配map
const matchMap = {
  天气: handleWeather,
  热点新闻: handleHotNews,
  体育新闻: handleSportNews,
  油价: handleOilPrice,
  微博热搜: handleWeiboHot,
  "^nba": handleNba,
  星座: handleConstellation,
  基金类型: handleFundClass,
  基金代码: handleFundDetail,
  股票代码: handleSharesDetail,
  疫情: handNcov,
  "^直播": handNbaLive,
  "^百度": handleBaidu,
  "^优惠券": handleCoupon,
  "^买买买": handleGoodToBuy,
  "^买数码": handleBuyDigital
};

export default async function entryHandleText(text) {
  const isAt = text.trim().startsWith(`@${config.botName}`) || text.trim().endsWith(`@${config.botName}`);
  if (isAt) {
    const handleText = text.replace(`@${config.botName}`, "").trim();
    return robot(handleText);
  }

  const reg = (str) => new RegExp(str, "i");
  for (let [k, v] of Object.entries(matchMap)) {
    if (reg(k).test(text)) {
      return v(text);
    }
  }

  if (/^翻译/.test(text)) {
    return handleTranlation(text);
  }
  return false;
}
