/* eslint import/first: 0 */

import './require-hook';
import path from 'path';
import Koa from 'koa';
import serve from 'koa-static';
import proxy from 'koa-proxies';
import middleware from 'koa-webpack';
import webpack from 'webpack';
import { matchRoutes } from 'react-router-config';
import webpackConfig from '../webpack/dev.config.babel';
import Routes from './Routes';
import createStore from './helpers/create-store';
import renderer from './helpers/renderer';

const IS_DEV = process.env.NODE_ENV === 'local';
const host = 'localhost';
const port = 3001;

const app = new Koa();

if (IS_DEV) {
  const dev = { serverSideRender: true };
  const compiler = webpack(webpackConfig);
  app.use(middleware({ compiler, dev }));
} else {
  app.use(serve(path.resolve('dist')));
}

app.use(proxy('/api', {
  target: 'http://react-ssr-api.herokuapp.com',
  rewrite: url => url.replace(/^\/api/, ''),
  changeOrigin: true,
  logs: IS_DEV
}));

app.use(async (ctx) => {
  const store = createStore(ctx);
  const promises = matchRoutes(Routes, ctx.path)
    .map(({ route }) => (route.loadData ? route.loadData(store) : null))
    .filter(promise => !!promise)
    .map(promise => new Promise((resolve) => {
      promise.then(resolve).catch(resolve);
    }));

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(ctx, store, context);
    // console.log('--context:', context);

    if (context.url) {
      return ctx.redirect(301, context.url);
    }
    if (context.notFound) {
      ctx.status = 404;
    }

    ctx.body = content;
    console.log('--content:', content);
    return true;
  });
});

app.listen(port, (err) => {
  if (err) {
    console.error(`==> 😭  OMG!!! ${err}`);
  } else {
    console.info(`==> 💻  http://${host}:${port}`);
  }
});
