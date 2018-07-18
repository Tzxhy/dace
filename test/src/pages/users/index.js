/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Head } from 'dace';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import Layout from '../../layouts/default';

const defaultProps = {
  users: []
};

// @prefetch({
//   reducer,
//   promise: ({ store: { dispatch } }) => Promise.all([
//     dispatch(fetchUsers())
//   ])
// })
@observer
export default class Users extends Component {
  click() {
    this.props.store.addItem('333');
  }

  render() {
    return (
      <Layout>
        Here is a big list of users:
        <ul>
        {
          this.props.store.items.map(item => (<li>{item}</li>))
        }
        </ul>
        <button onClick={this.click.bind(this)}>Add</button>
      </Layout>
    );
  }
}
