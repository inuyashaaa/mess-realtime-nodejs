'use strict'

const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const createKoaStaticMiddleware = require('koa-static')

const app = new Koa()
const router = new Router()
const views = initViews()
const staticPath = path.resolve(__dirname, '../public')
const koaStatic = createKoaStaticMiddleware(staticPath)

const homeModule = require(path.resolve(__dirname, './home'))

app
  .use(koaStatic)
  .use(views)
  .use(router.routes())
  .use(router.allowedMethods())

homeModule.init(router)

function initViews () {
  const nunjucks = require('nunjucks')
  const createViews = require('koa-views')
  const viewDirPath = __dirname
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(viewDirPath)
  )

  return createViews(viewDirPath, {
    map: { html: 'nunjucks' },
    options: {
      nunjucksEnv: env
    }
  })
}

module.exports = app
