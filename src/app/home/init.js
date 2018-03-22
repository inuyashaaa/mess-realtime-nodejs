'use strict'

module.exports = initHome

function initHome (router) {
  router.get('home', '/', renderHomePage)

  async function renderHomePage (ctx) {
    return ctx.render('home/index', {
      pageTitle: 'Chat Room By Illuminati'
    })
  }
}
