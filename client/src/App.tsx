import React from 'react';
import {DefaultLayout} from './layout/DefaultLayout/DefaultLayout';
import {PageSwitcher} from './pages/PageSwitcher';

function App() {
  return (
    <DefaultLayout>
        <PageSwitcher/>
    </DefaultLayout>
  );
}

export default App;
