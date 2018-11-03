import React from 'react';

import Navigation from './Navigation';
import Introduce from './Introduce';
import FindMe from './FindMe';
import Footer from './Footer';

import css from './App.css';

import zhData from './zh';
import enData from './en';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: zhData };

    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(event) {
    const language = event.target.innerHTML;
    this.setState(() => language === 'English' ? { data: enData } : { data: zhData });
  }

  render() {
    return (
      <div className={css.container}>
        <div className={css.card}>
          <div className={css.name}>
            {this.state.data.name}
          </div>

          <Navigation links={this.state.data.links}/>
          <Introduce message={this.state.data.introduce}/>
          <FindMe title={this.state.data.find.title} find={this.state.data.find.links}/>
          <div className={css.contact}>
            <h2>Contact me</h2>
            <ul>
              <li>QQ: 1205446803</li>
            </ul>
          </div>
          <Footer changeLanguage={this.changeLanguage}/>
        </div>
      </div>
    )
  }
}

export default App;
