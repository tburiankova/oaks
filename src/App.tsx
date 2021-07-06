import React, { useState } from 'react';
import style from './App.module.scss';
import Checkbox from './components/Checkbox';

function App() {
   const [testCheck, setTestCheck] = useState(false);

   return (
      <div className={style['page-container']}>
         <Checkbox
            name="test"
            checked={testCheck}
            onChange={() => setTestCheck(!testCheck)}
         >
            test
         </Checkbox>
         <Checkbox
            name="test"
            checked={true}
            onChange={() => setTestCheck(!testCheck)}
            disabled
         >
            test
         </Checkbox>
      </div>
   );
}

export default App;
