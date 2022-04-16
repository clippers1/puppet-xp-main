/**
 * @description 百度翻译
 */
import fetch from "node-fetch";
import config from "../config/index.js";
import md5 from "md5";
const reg = /^[\u4e00-\u9fa5]+/; // 文字正则

const translate = async (text) => {
  let url = "https://fanyi-api.baidu.com/api/trans/vip/translate";
  // appId
  let appid = config.baidu.appId;
  // 秘钥
  let key = config.baidu.secret;
  // 用户输入
  let q = text.replace("翻译", "").trim();
  // 随机数
  let salt = new Date().getTime().toString().substring(0, 10) + 0;
  // md5 加密
  let sign = md5(appid + q + salt + key);
  let from, to;
  if (reg.test(q)) {
    from = "zh";
    to = "en";
  }
  let data = new URLSearchParams({
    q,
    appid,
    salt,
    from: from || "en",
    to: to || "zh",
    sign,
  });

  let reply = "";

  const response = await fetch(url, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    method: "POST",
    body: data.toString(),
  });

  if (response.status === 200) {
    const result = await response.json();

    reply =
      "输入：" +
      result.trans_result[0].src +
      "\n翻译：" +
      result.trans_result[0].dst;
  } else {
    reply = "翻译走神了～";
  }

  return reply;
};

export default translate;
