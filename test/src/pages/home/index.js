import React from 'react';
import { Head } from 'dace';
import { observer } from 'mobx-react';
import Layout from '../../layouts/default';

/* eslint-disable */
const Home = observer((props, context) => {
  console.log('props:', props.store);
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <h3>Welcome</h3>
      <p>Check out these awesome features</p>
      <ul>
      {
        props.store.items.map(item => (<li>{item}</li>))
      }
      </ul>
    </Layout>
  );
});

export default Home;
