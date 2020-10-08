import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setIsLoggedIn } from "../../redux/modules/isLoggedIn";
import { clearCurrentUser } from "../../redux/modules/currentUser";
import { User } from "../../shared/types";

const Header: React.FC = () => {
  const currentUser = useSelector<RootState, User>(state => state.currentUser)
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false))
    dispatch(clearCurrentUser())
  }

  return (
    currentUser ?
      <div style={{ backgroundColor: "yellowgreen" }}>
        <h3>howdy, {currentUser.username}</h3>
        <button onClick={handleLogout}>Signout</button>
      </div> : null)
};

export default Header;
