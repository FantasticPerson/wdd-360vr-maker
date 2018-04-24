// @flow
import * as React from 'react';
import Header from '../components/Header';
import styles from './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;



  render() {
      const muiTheme = getMuiTheme({
        fontFamily:'"Lato","Microsoft Yahei","微软雅黑","STXihei","Meiryo UI","Meiryo","メイリオ","ＭＳ Ｐゴシック","MS PGothic","Hiragino Kaku Gothic Pro","Arial Unicode MS","Helvetica Neue","Helvetica","Arial",sans-serif'
      }); 
      return (
          <MuiThemeProvider muiTheme={muiTheme}>
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
