import React from 'react';
import ReactDOM from 'react-dom';

class Application extends React.Component {
  render() {
    return (
      <div>react webpack</div>
    )
  }
}

ReactDOM.render(<Application />, document.querySelector('#root'));
