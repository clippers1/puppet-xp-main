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
    data.slice(0, 10).forEach(item => {
      if (item.article_title && item.article_link && item.article_mall && item.article_price) {
        reply += `${item.article_mall} -> ${item.article_price}\n`
        reply += `${item.article_title}\n`
        reply += `${item.article_link}\n`
        reply += '\n'
      }
    })
  }
  return reply
}

const getBuyDigital = async () => {
  let url = 'http://localhost:5487/api/promotion/buydigital'

  let reply = ''
  const response = await Fetch(url)

  const { code, data } = response
  if (code === 0) {
    data.data.slice(0, 11).forEach(item => {
      if (item.title && item.link) {
        reply += `${item.title}\n`
        reply += `${item.link}\n`
        reply += '\n'
      }
    })
  }
  return reply
}

const getRecommendGoods = async (text) => {
  const host = `http://localhost:5487/api/promotion/get-recommend-goods/${text}`

  let reply = ''
  const response = await Fetch(url)

  const { code, data } = response
  if (code === 0) {
    data.forEach(item => {
      if (item.title && item.link && item.price) {
        reply += `${item.title} -> ${item.price}\n`
        reply += `${item.link}\n`
        reply += '\n'
      }
    })
  }
  return reply
}

export { getCoupon, getGoodToBuy, getBuyDigital, getRecommendGoods }