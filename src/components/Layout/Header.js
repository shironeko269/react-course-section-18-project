import { Fragment, useContext } from 'react';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderLoginButton from './HeaderLoginButton';
import { AuthContext } from "../../store/auth/auth-context";
const Header = (props) => {

  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes["left-header"]}>
          <h1>ReactMeals</h1>
          {authCtx.isLoggin && <h2> Welcome, {authCtx.user}</h2>}
        </div>
        <div className={classes["right-header"]}>
          <HeaderCartButton onClick={props.onShowCart} />
          <HeaderLoginButton></HeaderLoginButton>
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
