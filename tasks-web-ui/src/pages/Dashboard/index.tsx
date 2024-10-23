import { Header, Footer } from 'src/components';

import { Main } from './components';

import classes from './dashboard.module.css';

export default function Dashboard() {
  return (
    <div className={classes['dashboard']}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
