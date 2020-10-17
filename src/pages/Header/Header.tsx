import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setIsLoggedIn } from "../../redux/modules/isLoggedIn";
import { clearCurrentUser } from "../../redux/modules/currentUser";
import { User } from "../../shared/types";
import './styles/header.css'

const Header: React.FC = () => {
  const currentUser = useSelector<RootState, User>(state => state.currentUser)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false))
    dispatch(clearCurrentUser())
  }

  return (
    currentUser &&
    <div className="header-container">
      <h3>menu planner</h3>
      <span>{currentUser.username}</span>
      <button onClick={handleLogout}>Signout</button>
    </div>)
};

export default Header;
