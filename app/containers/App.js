// @flow
import * as React from 'react';
import Header from '../components/Header';
import styles from './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
      return (
        <MuiThemeProvider>
            <div>
            <Header />
            <div className={styles.container}>
                    {this.props.children}
                  </div>
              </div>
          </MuiThemeProvider>
      );
  }
}
