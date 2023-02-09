/**
 * @description 天行
 */

import config from "../config/index.js";
import moment from "moment";
import { searchArea } from '../utils/index.js'
import Fetch from '../utils/fetch.js'
import fetch from "node-fetch";

// 天气
const weather = async (city, weekFlag) => {
  let url = "http://api.tianapi.com/tianqi/index";
  let content = "";

  const res = await Fetch(url, {
    key: config.tianxing.key,
    city,
    json: true,
  });

  if (res.code === 200) {
    const { newslist } = res;
    if (!newslist && Array.isArray(newslist) && newslist.length === 0) {
      content += "查询天气信息为空";
      return;
    }
    content += `${newslist[0].area.includes("巢湖") ? "宇宙中心" : "城市名称"
      }：${newslist[0].area}\n`;
    content += `更新时间：${moment().format("hh:mm")}\n`;
    if (weekFlag) {
      newslist.forEach((w, index) => {
        if (index === 0) {
          content += `今天：${w.weather} ${w.lowest}-${w.highest}\n`;
        } else if (index === 1) {
          content += `明天：${w.weather} ${w.lowest}-${w.highest}\n`;
        } else {
          content += `${w.week}：${w.weather} ${w.lowest}-${w.highest}\n`;
        }
      });
    } else {
      const weather = newslist[0];
      content += `天气情况：${weather.weather}\n`;
      content += `实时温度：${weather.real}\n`;
      content += `最高温度：${weather.highest}\n`;
      content += `最低温度：${weather.lowest}\n`;
      content += `风向：${weather.wind}\n`;
      content += `风力：${weather.windsc}\n`;
      content += `降雨量：${weather.pcpn}mm\n`;
      content += `相对湿度：${weather.humidity}\n`;
    }
  } else {
    content += "未查询该城市天气";
    console.log("查询该城市天气失败");
  }
  return content;
};

// 新闻
const news = async () => {
  let url = "http://api.tianapi.com/wxhottopic/index";
  let content = "";

  const res = await Fetch(url, {
    key: config.tianxing.key,
    json: true,
  });
  if (res.code === 200) {
    const { newslist } = res;
    if (!newslist && Array.isArray(newslist) && newslist.length === 0) {
      content += "查询新闻信息为空";
      return;
    }
    newslist.reverse().forEach((news) => {
      content += `${news.index + 1}：${news.word}\n`;
    });
  } else {
    console.log("请求tx新闻失败！");
    content += "查询新闻失败！";
  }
  return content;
};

// 体育新闻
const sportNews = async () => {
  let url = "http://api.tianapi.com/tiyu/index";
  let content = "";
  const res = await Fetch(url, {
    key: config.tianxing.key,
    json: true,
    num: 10,
  });
  if (res.code === 200) {
    const { newslist } = res;
    if (!newslist && Array.isArray(newslist) && newslist.length === 0) {
      content += "查询体育新闻信息为空";
      return;
    }
    newslist.forEach((news, index) => {
      content += `${index + 1}：${news.title}\n`;
    });
  } else {
    content += "获取体育新闻失败";
    console.log("请求tx体育新闻失败！");
  }
  return content;
  // return 'https://file.zhibo.tv/uploads/imgs/2021/12-13/5f7e6a81b4ea9b64621f1d66841f88d0_540x304.jpg'
};

// 油价
const oilPrice = async function (prov) {
  let url = "http://api.tianapi.com/txapi/oilprice/index";
  let content = "";
  const computedProv = searchArea(prov, true)
  if (typeof computedProv === 'undefined' || computedProv === '') {
    content += "未查询到该省份～";
    return content
  }
  const res = await Fetch(url, {
    key: config.tianxing.key,
    prov: searchArea(prov, true),
  });

  if (res.code === 200) {
    let result = Array.isArray(res.newslist) ? res.newslist[0] : {};
    if (Object.keys(result).length === 0) {
      content += "查询油价信息为空";
      return;
    }
    content += `查询省份：${result.prov}\n`;
    content += `更新时间：${moment(result.time).format("YYYY-MM-DD")}\n`;
    content += `零号柴油：${result.p0}\n`;
    content += `89号汽油：${result.p89}\n`;
    content += `92号汽油：${result.p92}\n`;
    content += `95号汽油：${result.p95}\n`;
    content += `98号汽油：${result.p98}`;
  } else {
    content += "未查询到该省份～";
    console.log("请求tx油价失败");
  }
  return content;
};

// 疫情
const ncovDetail = async (city) => {
  const area = searchArea(city)
  // const url = 'https://voice.baidu.com/newpneumonia/getv2'
  const kuakeUrl = 'https://m.sm.cn/api/rest'

  let res
  let content = ''
  // const callback = `jsonp_${new Date().getTime()}_${Math.ceil(Math.random() * 100000)}`
  // const commonPayload = {
  //   from: 'mola-virus',
  //   stage: 'publish',
  //   area,
  //   callback
  // }
  // const headers = {
  //   'content-type': 'text/javascript; charset=utf-8',
  //   'accept': '*/*',
  //   'accept-encoding': 'gzip, deflate, br',
  //   'accept-language': 'zh-CN,zh;q=0.9',
  //   'cookie': 'BIDUPSID=F07F7F0F6A4E7D8659E9CE159BB5188D; PSTM=1645258056; BAIDUID=F07F7F0F6A4E7D86C4E975ED19312BE7:FG=1; BDUSS=ktRTVdDUk9VUHNXZkFtNVZuaTBTUHMwRHU0flFVbVRQTmZZNi02cENZc0NQemhpSVFBQUFBJCQAAAAAAAAAAAEAAABOX28PYTc5ODQ5MTA1NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKyEGICshBib; BDUSS_BFESS=ktRTVdDUk9VUHNXZkFtNVZuaTBTUHMwRHU0flFVbVRQTmZZNi02cENZc0NQemhpSVFBQUFBJCQAAAAAAAAAAAEAAABOX28PYTc5ODQ5MTA1NQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKyEGICshBib; __yjs_duid=1_acbc7457932a66526d21e8b15320c2bd1645261441538; delPer=0; PSINO=3; BAIDUID_BFESS=F07F7F0F6A4E7D86C4E975ED19312BE7:FG=1; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; BAIDU_WISE_UID=wapp_1648045563703_279; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[X_XKQks0S63]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; BDRCVFR[tox4WRQ4-Km]=mk3SLVN4HKm; BDRCVFR[CLK3Lyfkr9D]=mk3SLVN4HKm; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; lscaptain=srcactivitycaptainindexcss_91e010cf-srccommonlibsesljs_e3d2f596-srcactivitycaptainindexjs_a2e9c712; Hm_lvt_68bd357b1731c0f15d8dbfef8c216d15=1648262311; ZD_ENTRY=baidu; ab_sr=1.0.1_NGI0NDUyZTM2MjUxMjI4ZDVkOTM1OWZhZGY1MWVmNjY3ZjViZGY3MGVhNjkxOTVkYTgyNTJkOTk4MjYzYjFmN2JhZTkyYTNkZjI4MTI2N2IyYzhjOTA2ZWJkODE2NjYwNjhjOWJmM2YyNzA2YzI0YWQ3MWUwZGExMDhlNTUxYjlkOGIyMmFmZmFhNTA4Y2Q4M2I0ZjdmNTI1NzNkMDg4ZmI5NWY3OTcyZWM3MzliMjkyMmQ2ZTBjMzJjMGE2ZDBl; H_PS_PSSID=35837_31253_34813_36165_34584_36142_36120_36075_35994_35956_35319_26350_36112_36103_36061; BA_HECTOR=a4008h258l0h2h0gp41h3thmb0r; Hm_lpvt_68bd357b1731c0f15d8dbfef8c216d15=1648282278',
  //   'referer': 'https://voice.baidu.com/act/newpneumonia/newpneumonia?city=%E5%AE%89%E5%BE%BD-%E5%AE%89%E5%BE%BD',
  //   'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
  //   'sec-ch-ua-mobile': '?0',
  //   'sec-ch-ua-platform': '"Windows"',
  //   'sec-fetch-dest': 'script',
  //   'sec-fetch-mode': 'no-cors',
  //   'sec-fetch-site': 'same-origin',
  //   'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36'
  // }

  if (typeof area !== 'string') return

  // if (area.includes('-')) {
  // const payloadCity = {
  //   target: 'trendCity',
  //   ...commonPayload
  // }
  // const paramsCity = new URLSearchParams(payloadCity);
  // res = await fetch(`${url}?${paramsCity.toString()}`, {
  //   headers,
  // })
  // } else {
  //   const payload = {
  //     target: 'trend',
  //     isCaseIn: 1,
  //     ...commonPayload
  //   }
  //   const params = new URLSearchParams(payload);
  //   res = await fetch(`${url}?${params.toString()}`, {
  //     headers,
  //   })
  //   const resText = await res.text()
  //   const formatResText = resText.replace(callback, '').replace('(', '').replace(')', '').replace(';', '')
  //   const resObject = formatResText.startsWith('{') && formatResText.endsWith('}') ? JSON.parse(formatResText) : undefined
  //   if (resObject) {
  //     const { status, data, msg, errmsg } = resObject
  //     if (status === 0 && msg === 'success') {
  //       const _data = data[0]
  //       const updateDate = _data?.trend?.updateDate[_data?.trend?.updateDate.length - 1]

  //       const list = _data?.trend?.list.map(item => {
  //         return `${item.name}: ${item.data[item.data.length - 1]}`
  //       })

  //       content += `${_data.name}\n`
  //       content += `时间: ${updateDate}\n`
  //       content += `${list.join('\n')}`

  //     } else {
  //       content += errmsg ?? '暂无信息'
  //     }
  //   } else {
  //     content += '查询不对哦'
  //   }
  // }

  let cityName = ''
  const payload = {
    format: 'json',
    method: 'Huoshenshan.ncov2022',
    type: 'latest',
    news_type: 'ncp',
    uc_param_str: 'dsdnfrpfbivesscpgimibtbmnijblaupogpintnwktprchmtut',
  }
  if (area.includes('-')) {
    cityName = area.split('-')[1]
    const payloadCity = {
      ...payload,
      city: cityName
    }
    const paramsCity = new URLSearchParams(payloadCity)
    res = await fetch(`${kuakeUrl}?${paramsCity.toString()}`)
    const data = await res.json()
    content += `${data.time}\n`
    content += `${(data.cityData && data.cityData.city) || cityName}\n`
    content += `时间: ${data.incrTime}\n`
    // content += `确诊: ${data.cityData.sure_cnt}\n`
    // content += `治愈: ${data.cityData.cure_cnt}\n`
    // content += `死亡: ${data.cityData.die_cnt}\n`
    content += `新增确诊: ${(data.cityData && data.cityData.sure_new_cnt) || 0}\n`
    content += `新增本土: ${(data.cityData && data.cityData.sure_new_loc) || 0}\n`
    content += `新增无症状: ${(data.cityData && data.cityData.sure_new_hid) || 0}`
  } else {
    cityName = area
    const payloadProvince = {
      ...payload,
      city: cityName
    }
    const paramsCity = new URLSearchParams(payloadProvince)
    res = await fetch(`${kuakeUrl}?${paramsCity.toString()}`)
    const data = await res.json()
    content += `${data.time}\n`
    content += `${data.provinceData?.name ?? cityName}\n`
    content += `时间: ${data.incrTime}\n`
    // content += `确诊: ${data.provinceData.sure_cnt}\n`
    // content += `治愈: ${data.provinceData.cure_cnt}\n`
    // content += `死亡: ${data.provinceData.die_cnt}\n`
    content += `新增确诊: ${data.provinceData?.sure_new_cnt ?? 0}\n`
    content += `新增本土: ${data.provinceData?.sure_new_loc ?? 0}\n`
    content += `新增无症状: ${data.provinceData?.sure_new_hid ?? 0}`
  }

  return content
}
const ncovNews = async () => {
  let url = "http://api.tianapi.com/ncov/index";
  const res = await Fetch(url, {
    key: config.tianxing.key,
  });
  let content = "";
  if (res.code === 200) {
    const { newslist } = res;
    if (!newslist && Array.isArray(newslist) && newslist.length === 0) {
      content += "查询疫情信息为空";
      return;
    }
    const summary = res.newslist[0]?.news[0];
    content += `标题：${summary.title}\n`;
    content += `\n`;
    content += `时间：${summary.pubDateStr}\n`;
    content += `\n`;
    content += `内容：${summary.sourceUrl}\n`;
  } else {
    console.log("请求tx疫情失败");
  }
  return content;
}

const ncov = async (city) => {
  return city ? await ncovDetail(city) : await ncovNews()
};

const weiboHot = async () => {
  let url = "http://api.tianapi.com/weibohot/index";
  let content = "";

  const res = await Fetch(url, {
    key: config.tianxing.key,
  });
  if (res.code === 200) {
    const { newslist } = res;
    if (!newslist && Array.isArray(newslist) && newslist.length === 0) {
      content += "查询微博热搜为空";
      return;
    }
    newslist.slice(0, 10).forEach((news, index) => {
      content += `${index + 1}、${news.hotword} \n`;
    });
  } else {
    console.log("查询微博热搜失败");
  }
  return content;
};

const robot = async (qusetion) => {
  let url = "http://api.tianapi.com/robot/index";
  let content = "";

  const res = await Fetch(url, {
    key: config.tianxing.key,
    qusetion,
  });

  if (res.code === 200) {
    const { newslist } = res;
    if (newslist[0].datatype === "text") {
      content += newslist[0].reply;
    }
  } else {
    content += '听不懂～'
    console.log("robot fail");
  }

  return content;
};

// const robot = async (msg) => {
//   let content = ''
//   const url = 'https://api.qingyunke.com/api.php?key=free&appid=0&msg=%E4%BD%A0%E5%9C%A8%E5%B9%B2%E4%BB%80%E4%B9%88'
//   const res = await Fetch (url, {
//     key: 'free',
//     appid: 0,
//     msg
//   }) 

//   if (res.result === 0) {
//     content += res.content
//   } else {
//     content += '听不懂，宕机了~'
//   }

//   return content
// }

const robotAi = async (msg) => {
  let url = 'http://localhost:5220/api/chatgpt/chat'

  let res = await fetch(`${url}?u=${msg}`)

  if (res.status === 200) {
    let content = await res.text()
    return content
  }
}

export { weather, news, sportNews, oilPrice, ncov, weiboHot, robot, robotAi };
