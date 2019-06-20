import React from 'react';
import Envelopes from './containers/Envelopes';
import './App.css';
import Layout from './hoc/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Envelopes />
      </Layout>
    </div>
  );
}

export default App;
