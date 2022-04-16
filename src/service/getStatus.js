/**
 * @description 获取上传体温服务状态
 */
import http from "http";

const url = "http://42.192.3.27/api/getServerStatus";

export const getServerStatus = () => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        const { statusCode } = res;
        const contentType = res.headers["content-type"];

        let error;
        // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
        if (statusCode !== 200) {
          error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
        }
        if (error) {
          reject(error.message);
          // 消费响应数据以释放内存
          res.resume();
          return;
        }

        res.setEncoding("utf8");
        let rawData = "";
        res.on("data", (chunk) => {
          rawData += chunk;
        });
        res.on("end", () => {
          try {
            resolve(rawData);
          } catch (e) {
            reject(e.message);
          }
        });
      })
      .on("error", (e) => {
        console.error(`Got error: ${e.message}`);
      });
  });
};


