import Fetch from '../utils/fetch.js'

const getCoupon = async () => {
  let url = 'http://localhost:5487/api/promotion/coupon'

  let reply = ''
  const response = await Fetch(url)

  const { code, data } = response
  if (code === 0) {
    data.forEach(item => {
      reply += `${item.title}\n`
      reply += `${item.url}\n`
      reply += '\n'
    })
  }
  return reply
}

export { getCoupon }