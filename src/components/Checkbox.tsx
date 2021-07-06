import React from 'react';
import { classes } from '../services/utils';
import style from './Checkbox.module.scss';

export interface ICheckbox {
   name: string;
   checked: boolean;
   onChange: (value?: any) => void;
   onBlur?: (e: any) => void;
   disabled?: boolean;
   value?: string;
   className?: string;
}

const Checkbox: React.FC<ICheckbox> = ({
   name,
   checked,
   onChange,
   disabled = false,
   className,
   children,
}) => {
   return (
      <label
         htmlFor={`checkbox-${name}`}
         className={classes(style.label, {
            [style['is-disabled']]: disabled,
            [className || '']: !!className,
         })}
      >
         <input
            id={`checkbox-${name}`}
            type="checkbox"
            name={name}
            checked={checked}
            disabled={disabled}
            className={style.checkbox}
            onChange={(e) => onChange(e.target.checked)}
         />
         <div
            className={classes([style['custom-checkbox'], style.checked])}
         ></div>
         <div>{children}</div>
      </label>
   );
};

export default Checkbox;
