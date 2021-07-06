import React, { useState, useEffect } from 'react';
import Checkbox from './components/Checkbox';
import { classes, createArray } from './services/utils';
import { IRandomFact } from './services/types';
import style from './App.module.scss';

function App() {
   console.log('mounted');
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
   const [completed, setCompleted] = useState(
      progressData.reduce((acc, val) => {
         acc[val.name] = false;
         return acc;
      }, {}),
   );
   const [randomFact, setRandomFact] = useState<IRandomFact>(undefined);

   useEffect(() => {
      Object.keys(state).forEach((phase) => {
         if (
            Object.keys(state[phase]).every((step) => state[phase][step].value)
         ) {
            setCompleted((prev) => ({ ...prev, [phase]: true }));
         } else {
            setCompleted((prev) => ({ ...prev, [phase]: false }));
         }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state]);

   useEffect(() => {
      if (Object.keys(completed).every((phase) => completed[phase])) {
         fetch('https://uselessfacts.jsph.pl/random.json')
            .then((res) => res.json())
            .then((data) => setRandomFact(data));
      }
   }, [completed]);

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

            <div className={style.inner}>
               {progressData.map(({ id, name, steps }, i) => {
                  let unlocked = true;
                  if (i > 0) {
                     createArray(i).forEach((val) => {
                        if (!completed[progressData[val].name])
                           unlocked = false;
                     });
                  }

                  return (
                     <div
                        key={id}
                        className={classes(style.progress, {
                           [style['is-complete']]: completed[name] && unlocked,
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
               {randomFact && (
                  <div>
                     <h3>Bonus for completing all stages:</h3>
                     <p>Random fact: {randomFact.text}</p>
                  </div>
               )}
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
