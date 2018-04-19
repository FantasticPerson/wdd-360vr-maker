// @flow
import * as React from 'react';
import Header from '../components/Header'

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <Header></Header>
        {this.props.children}
      </div>
    );
  }
}
