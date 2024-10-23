import classes from './Nav.module.css';

import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className={classes['nav']}>
      <div className={classes['nav__left']}>
        <Link to="/">
          <h1>Tasks</h1>
        </Link>
      </div>
      <div className={classes['nav__right']}>
        <ul className={classes['nav__right-ul']}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
