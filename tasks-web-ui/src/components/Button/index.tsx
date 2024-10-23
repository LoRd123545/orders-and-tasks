import { ReactNode } from 'react';

import classes from './Button.module.css';

export default function Button({ children }: { children: ReactNode }) {
  return <button className={classes['btn']}>{children}</button>;
}
