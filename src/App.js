import React from 'react';

import Menu from './components/Menu';
import Days from './components/Days';

function App() {
  return (
    <div className="container">
      <div className="row">
        <Menu></Menu>
      </div>
        <Days></Days>
    </div>
  );
}

export default App;
