import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';
import ShoppingList from './components/ShoppingList';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDays: true,
      showShoppingList: false
    }
    this.toggleShow = this.toggleShow.bind(this);
  }

  toggleShow() {
    this.setState({
      showDays: !this.state.showDays,
      showShoppingList: !this.state.showShoppingList
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Menu toggleShow={this.toggleShow} showDays={this.state.showDays} showShoppingList={this.state.showShoppingList}></Menu>
        </div>
        <Days show={this.state.showDays}></Days>
        <ShoppingList show={this.state.showShoppingList}></ShoppingList>
      </div>
    );
  }
}

export default App;
