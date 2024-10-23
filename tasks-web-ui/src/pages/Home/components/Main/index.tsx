import { Link } from 'react-router-dom';

import classes from './main.module.css';

import { Button } from 'src/components';

export default function Main() {
  return (
    <main className={classes['main']}>
      <section className={classes['welcome']}>
        <header className={classes['welcome__header']}>
          <h1 className={classes['header__h1']}>
            Organize your day with ease!
            <br />
            Meet the new app for managing tasks
          </h1>
        </header>
        <article className={classes['welcome__body']}>
          <p className={classes['body__p']}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
            fugiat ab provident iste! Asperiores alias rerum qui blanditiis fuga
            voluptas quae minus, architecto molestiae, cupiditate delectus
            debitis illum veniam aspernatur?
          </p>
          <Button>
            <Link to="/dashboard">Start now!</Link>
          </Button>
        </article>
      </section>
      <section className="picture">
        <img src="/images/task-list.png" />
      </section>
      <section className={classes['welcome']}>
        <header className={classes['welcome__header']}>
          <h1 className={classes['header__h1']}>Organize, Plan and Do!</h1>
        </header>
        <article className={classes['welcome__body']}>
          <p className={classes['body__p']}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
            fugiat ab provident iste! Asperiores alias rerum qui blanditiis fuga
            voluptas quae minus, architecto molestiae, cupiditate delectus
            debitis illum veniam aspernatur?
          </p>
        </article>
      </section>
    </main>
  );
}
