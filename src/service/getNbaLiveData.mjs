import http from 'http'

const url = 'http://42.192.3.27/api/nba/getNbaLiveData'

export const getNbaLiveData = () => {
    // return new Promise((resolve, reject) => {
    //     http
    //         .get(url, (res) => {
    //             const { statusCode } = res;
    //             const contentType = res.headers["content-type"];

    //             let error;
    //             // 任何 2xx 状态码都表示成功响应，但这里只检查 200。
    //             if (statusCode !== 200) {
    //                 error = new Error("Request Failed.\n" + `Status Code: ${statusCode}`);
    //             }
    //             if (error) {
    //                 reject(error.message);
    //                 // 消费响应数据以释放内存
    //                 res.resume();
    //                 return;
    //             }

    //             res.setEncoding("utf8");
    //             let rawData = "";
    //             res.on("data", (chunk) => {
    //                 rawData += chunk;
    //             });
    //             res.on("end", () => {
    //                 try {
    //                     resolve(rawData);
    //                 } catch (e) {
    //                     reject(e.message);
    //                 }
    //             });
    //         })
    //         .on("error", (e) => {
    //             console.error(`Got error: ${e.message}`);
    //         });
    // });

    return [
        '复制任意url，手机浏览器打开',
        'http://www.515.tv/',
        'http://jrkankan.com/',
        // 'http://jrszb111.com/',
        'http://www.wuchajian.tv/'
    ]
}
