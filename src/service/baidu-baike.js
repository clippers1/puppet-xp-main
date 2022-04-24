import Fetch from "../utils/fetch";

const baike = async (text) => {
  const url = "https://baike.baidu.com/api/openapi/BaikeLemmaCardApi";
  let content = "";
  const res = await Fetch(url, {
    scope: 103,
    format: "json",
    appid: 379020,
    bk_key: text,
    bk_length: 600,
  });

  if (res && res.abstract) {
    content += res.abstract;
  }

  return content;
};

export { baike };
