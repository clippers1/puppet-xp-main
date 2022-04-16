/**
 * @description 基金股票
 */
import moment from "moment";
import Fetch from '../utils/fetch.js'

const fetchFundClass = async (keyWord) => {
  let url = "https://api.doctorxiong.club/v1/fund/all";
  let content = "";

  const res = await Fetch(url, {
    keyWord,
  });

  if (res.code === 200) {
    if (res.data.length > 0) {
      content += `${keyWord}：\n`;
      res.data.forEach((d) => {
        content += `${d[2]} - ${d[0]}\n`;
      });
    } else {
      content = "啥也没有～";
    }
  } else {
    content = "基金查询失败";
  }
  return content;
};

const fetchFundDetail = async (code) => {
  let url = "https://api.doctorxiong.club/v1/fund/detail";
  let content = "";

  const res = await Fetch(url, {
    startDate: moment().format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    code,
  });
  if (res.code === 200) {
    content += `${res.data.name}\n`;
    content += `${res.data.netWorthDate}\n`;
    content += `代码：${res.data.code}\n`;
    content += `类型：${res.data.type}\n`;
    content += `单位净值：${res.data.netWorth}\n`;
    content += `单位净值估算：${res.data.expectWorth}\n`;
    content += `累计净值：${res.data.totalWorth}\n`;
    content += `估算日涨幅：${res.data.expectGrowth}% ${
      Number(res.data.expectGrowth) > 0 ? "↑" : "↓"
    }\n`;
    content += `日涨幅：${res.data.dayGrowth}%\n`;
    content += `周涨幅：${res.data.lastWeekGrowth}%\n`;
    content += `月涨幅：${res.data.lastMonthGrowth}%\n`;
    content += `三月涨幅：${res.data.lastThreeMonthsGrowth}%\n`;
    content += `半年涨幅：${res.data.lastSixMonthsGrowth}%\n`;
    content += `年涨幅：${res.data.lastYearGrowth}%\n`;
    content += `基金规模：${res.data.fundScale}\n`;
  } else {
    content = "无效的基金代码";
  }
  return content;
};

const fetchSharesDetail = async (code) => {
  let url = "https://api.doctorxiong.club/v1/stock";
  let content = "";

  const res = await Fetch(url, {
    code,
  });

  if (res.code === 200) {
    const data = res.data[0];
    // const { buy, sell } = data
    // const dateMap = {
    //   0: '周一',
    //   2: '周二',
    //   4: '周三',
    //   6: '周四',
    //   8: '周五'
    // }
    if (!data) return;
    content += `${data.name}\n`;
    content += `代码: ${data.code}\n`;
    content += `更新日期: ${data.date}\n`;
    content += `今日开盘价: ${data.open}\n`;
    content += `昨日收盘价: ${data.close}\n`;
    content += `实时价格: ${data.price}\n`;
    content += `开盘后价格变化: ${data.priceChange}\n`;
    content += `价格变化: ${data.changePercent}%\n`;
    content += `开盘截至目前最高价: ${data.high}\n`;
    content += `开盘截至目前最低价: ${data.low}\n`;
    content += `成交量: ${data.volume}手\n`;
    content += `成交额: ${data.turnover}万\n`;
    content += `换手率: ${data.turnoverRate}%\n`;
    content += `总市值: ${data.totalWorth}亿\n`;
    content += `流通市值: ${data.circulationWorth}亿\n`;
  } else {
    content = "无效股票代码";
  }
  return content;
};

export { fetchFundClass, fetchFundDetail, fetchSharesDetail };
