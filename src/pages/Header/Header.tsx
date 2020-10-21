import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setIsLoggedIn } from "../../redux/modules/isLoggedIn";
import { clearCurrentUser } from "../../redux/modules/currentUser";
import { User } from "../../shared/types";
import MIcon from "../../shared/sass/micon";
import './styles/header.css'

const Header: React.FC = () => {
  const currentUser = useSelector<RootState, User>(state => state.currentUser)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false))
    dispatch(clearCurrentUser())
  }

  return (
    <div className="header">
      <div className="header__icon">
        <MIcon color={"#000"} />
      </div>
      <h1 className="header__title">Menu Plan</h1>
      {currentUser ?
        <>
          <span className="header__username">{currentUser.username}</span>
          <button className="header__signout" onClick={handleLogout}>Signout</button>
        </> : null}
    </div>)
};

export default Header;
