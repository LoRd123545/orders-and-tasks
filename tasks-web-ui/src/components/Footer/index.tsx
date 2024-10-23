import classes from './Footer.module.css';

import Nav from '../Nav';

export default function Footer() {
  return (
    <footer className={classes['footer']}>
      <Nav />
      <span>Kamil Abbasi 2024</span>
    </footer>
  );
}
