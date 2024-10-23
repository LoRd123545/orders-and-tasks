import { Header, Footer } from 'src/components';

import { Main } from './components';

import classes from './home.module.css';

export default function Home() {
  return (
    <div className={classes['home']}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
