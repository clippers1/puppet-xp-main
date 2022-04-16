/**
 * @description 聚合
 */
import config from "../config/index.js";
import Fetch from '../utils/fetch.js'
import { formatTeamName } from "../utils/index.js";

const nba = async () => {
  let url = "http://apis.juhe.cn/fapig/nba/query";
  let content = "";

  const res = await Fetch(url, {
    key: config.juhe.nbaKey,
  });

  if (res.error_code == 0) {
    if (Array.isArray(res.result.matchs) && res.result.matchs.length > 3) {
      if (res.result.matchs[1]) {
        content += `今日赛程：\n`;
        res.result.matchs[1]?.list.forEach((match) => {
          content += `${formatTeamName(match.team1)} ${match.team1_score} : ${match.team2_score} ${formatTeamName(match.team2)}  ${match.status_text}\n`;
        });
        content += `\n`;
      }
      // if (data.result.matchs[2]) {
      //     content += `明日赛程：\n`
      //     data.result.matchs[2]?.list.forEach(match => {
      //         content += `${match.team1} VS ${match.team2} ${match.time_start} ${match.status_text}\n`
      //     })
      // }
    } else {
      content += "查询nba赛事为空";
    }
  } else {
    content += "查询nba赛事失败";
    console.log("查询juhe, nba失败");
  }
  return content;
};

const constellation = async (consName = "白羊座") => {
  let url = "http://web.juhe.cn/constellation/getAll";
  let content = "";

  const res = await Fetch(url, {
    key: config.juhe.constellationKey,
    type: "today",
    consName,
  });

  if (res.error_code === 0) {
    content += `${res.name}\n`;
    content += `${res.datetime}\n`;
    content += `综合指数：${res.all}\n`;
    content += `幸运色：${res.color}\n`;
    content += `健康指数：${res.health}\n`;
    content += `爱情指数：${res.love}\n`;
    content += `财运指数：${res.money}\n`;
    content += `幸运数字：${res.number}\n`;
    content += `速配星座：${res.QFriend}\n`;
    content += `工作指数：${res.work}\n`;
    content += `今日概述：${res.summary}\n`;
  } else {
    content += "未查询到该星座";
    console.log("查询juhe, 星座失败");
  }
  return content;
};

export { nba, constellation };
