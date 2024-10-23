import classes from './Header.module.css';

import Nav from '../Nav';

export default function Header() {
  return (
    <header className={classes['header']}>
      <Nav />
    </header>
  );
}
