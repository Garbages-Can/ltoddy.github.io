import React from 'react';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import css from './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      essays: [
        {
          title: "基于docker+gunicorn部署sanic项目",
          createdAt: "2018-04-14",
          link: "../essay/2018/04/14/deploy-sanic.html",
          previews: "最近云服务提供商在打价格战,我在滴滴云上花了很少的钱租了一个月的云服务器: 公网ip是： 116.85.42.182, 以下我以116.85.42.182这个ip为演示,当你自己在部署的时候请换成自己的ip地址."
        }
      ]
    };
  }

  render() {
    return (
      <div className={css.container}>
        <Header/>
        <Content essays={this.state.essays}/>
        <Footer/>
      </div>
    );
  }
}

module.exports = App;
