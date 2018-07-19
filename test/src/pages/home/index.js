import React from 'react';
import { Head, createStore } from 'dace';
import { observer } from 'mobx-react';
// import Store from './store';
import Layout from '../../layouts/default';

const store = new Store(typeof window === 'object' ? window.INITIAL_STATE : {});
console.log('--store:', store);

/* eslint-disable */
const Home = observer((props, context) => {
  console.log('store:', store);
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <h3>Welcome</h3>
      <p>Check out these awesome features</p>
      <ul>
      {
        store.items.map(item => (<li>{item}</li>))
      }
      </ul>
    </Layout>
  );
});

export default Home;
