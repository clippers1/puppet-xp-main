import Fetch from '../utils/fetch.js'

const getCoupon = async () => {
  let url = 'http://localhost:5487/api/promotion/coupon'

  let reply = ''
  const response = await Fetch(url)

  const { code, data } = response
  if (code === 0) {
    data.forEach(item => {
      if (item.title && item.url) {
        reply += `${item.title}\n`
        reply += `${item.url}\n`
        reply += '\n'
      }
    })
  }
  return reply
}

const getGoodToBuy = async () => {
  let url = 'http://localhost:5487/api/promotion/gotobuy'

  let reply = ''
  const response = await Fetch(url)

  const { code, data } = response
  if (code === 0) {
    data.forEach(item => {
      if (item.article_title && item.article_link) {
        reply += `${item.article_title}\n`
        reply += `${item.article_link}\n`
        reply += '\n'
      }
    })
  }
  return reply
}

export { getCoupon, getGoodToBuy }