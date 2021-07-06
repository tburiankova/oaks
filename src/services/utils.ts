export const classes = (
   classString: string | string[],
   classes?: { [key: string]: boolean },
) => {
   const classesList = [];
   for (const classKey in classes) {
      if (classes.hasOwnProperty(classKey)) {
         const condition = classes[classKey];
         if (condition) {
            classesList.push(classKey);
         }
      }
   }
   return `${
      typeof classString === 'string' ? classString : classString.join(' ')
   }${classesList.length && classString ? ' ' : ''}${classesList.join(' ')}`;
};
