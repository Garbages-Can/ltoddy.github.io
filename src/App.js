import React from 'react';

import Header from './Header';
import Content from './content/Content';
import Footer from './Footer';
import BackTop from './components/BackTop';
import essays from '../essays';
import projects from '../projects';

import css from './App.css';

const App = () => (
  <div className={css.container}>
    <Header/>
    <Content essays={essays}
             projects={projects}
    />
    <Footer/>
    <BackTop/>
  </div>
);

module.exports = App;
