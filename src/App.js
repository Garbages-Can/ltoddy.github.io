import React from 'react';

import Header from './Header';
import Content from './content/Content';
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
          preview: "最近云服务提供商在打价格战,我在滴滴云上花了很少的钱租了一个月的云服务器: 公网ip是： 116.85.42.182, 以下我以116.85.42.182这个ip为演示,当你自己在部署的时候请换成自己的ip地址."
        }
      ],

      projects: [
        {
          title: 'sugar',
          description: 'A minimal web framework by Python.',
          link: 'https://github.com/ltoddy/sugar',
          language: 'Python',
          star: 29,
          fork: 1
        },
        {
          title: 'flask-tutorial',
          description: '技术交流群:630398887  基于Python-Flask框架搭建的简易博客  希望非程序员也可以看懂  这套教程不会讲的多么深入 只是为了大体了解一下Flask和其扩展库',
          link: 'https://github.com/ltoddy/flask-tutorial',
          language: 'HTML',
          star: 5,
          fork: 1
        },
        {
          title: 'Python-useful',
          description: '收集和编写一些Python有用的小程序',
          link: 'https://github.com/ltoddy/Python-useful',
          language: 'Python',
          star: 2,
          fork: 1
        },
        {
          title: 'beautiful-code',
          description: 'Some more beautiful code',
          link: 'https://github.com/ltoddy/beautiful-code',
          language: 'Scheme',
          star: 0,
          fork: 1
        },
        {
          title: 'ubuntu-beautification-scripts',
          description: 'Ubuntu美化工具',
          link: 'https://github.com/ltoddy/ubuntu-beautification-scripts',
          language: 'Shell',
          star: 1,
          fork: 0
        },
        {
          title: 'rabbitmq-tutorial',
          description: 'RabbitMQ官方中文入门教程(Python版)',
          link: 'https://github.com/ltoddy/rabbitmq-tutorial',
          language: 'Python',
          star: 0,
          fork: 0
        },
        {
          title: 'resume',
          description: '个人简历(还没写完),目前寻求一份暑假Python工作(南京).',
          link: 'https://github.com/ltoddy/resume',
          language: 'JavaScript',
          star: 0,
          fork: 0
        }
      ]
    };
  }

  render() {
    console.log();
    return (
      <div className={css.container}>
        <Header/>
        <Content essays={this.state.essays}
                 projects={this.state.projects}
        />
        <Footer/>
      </div>
    );
  }
}

module.exports = App;
