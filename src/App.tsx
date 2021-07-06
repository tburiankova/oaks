import React, { useState } from 'react';
import Checkbox from './components/Checkbox';
import style from './App.module.scss';
import { classes } from './services/utils';

function App() {
   const [state, setState] = useState(
      JSON.parse(localStorage.getItem('progress')) ||
         progressData.reduce((acc, val) => {
            acc[val.name] = val.steps.reduce((acc2, val2) => {
               acc2[val2.id] = { ...val2, value: false };
               return acc2;
            }, {});
            return acc;
         }, {}),
   );

   const handleChange = (phase: string, stepId: number) => {
      const newState = {
         ...state,
         [phase]: {
            ...state[phase],
            [stepId]: {
               ...state[phase][stepId],
               value: !state[phase][stepId].value,
            },
         },
      };
      setState(newState);
      localStorage.setItem('progress', JSON.stringify(newState));
   };

   return (
      <div className={style['page-container']}>
         <div className={style.container}>
            <h1>My startup progress</h1>

            {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}

            <div className={style.inner}>
               {progressData.map(({ id, name, steps }, i) => {
                  const prevPhase = i === 0 ? null : progressData[i - 1].name;
                  const unlocked = prevPhase
                     ? Object.keys(state[prevPhase]).every(
                          (step) => state[prevPhase][step].value,
                       )
                     : true;
                  const isComplete = Object.keys(state[name]).every(
                     (step) => state[name][step].value,
                  );

                  return (
                     <div
                        key={id}
                        className={classes(style.progress, {
                           [style['is-complete']]: isComplete,
                        })}
                     >
                        <h2>
                           <span>{id}</span>
                           {name}
                        </h2>
                        <ul>
                           {steps.map(({ id, title }) => (
                              <li key={id}>
                                 <Checkbox
                                    name={title}
                                    checked={state[name][id].value}
                                    onChange={() => handleChange(name, id)}
                                    disabled={!unlocked}
                                 >
                                    {title}
                                 </Checkbox>
                              </li>
                           ))}
                        </ul>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default App;

const progressData = [
   {
      id: 1,
      name: 'Foundation',
      steps: [
         { id: 1, title: 'Setup virtual office' },
         { id: 2, title: 'Set mission & vision' },
         { id: 3, title: 'Select business name' },
         { id: 4, title: 'Buy domains' },
      ],
   },
   {
      id: 2,
      name: 'Discovery',
      steps: [
         { id: 1, title: 'Create roadmap' },
         { id: 2, title: 'Competitor analysis' },
      ],
   },
   {
      id: 3,
      name: 'Delivery',
      steps: [
         { id: 1, title: 'Release marketing website' },
         { id: 2, title: 'Release MVP' },
      ],
   },
];
