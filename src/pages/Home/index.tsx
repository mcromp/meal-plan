import React, { useState, useLayoutEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "../../redux";
import { fetchHelper } from "../../redux/fetchHelper/fetchHelper";
import { AddUserBody, ReqType } from "../../redux/fetchHelper/types";
import { setIsLoggedIn } from "../../redux/modules/isLoggedIn";
import { User } from "../../shared/types";
import UserDelete from "./UserDelete";
import UserSignup from "./UserSignup";
import SigninForm from "./SigninForm";
import AlertText from "../../shared/AlertText";
import Welcome from "./Welcome";
import MenuIcon from "../../assets/MenuIcon";
import FailedToLoad from "../../shared/FailedToLoad";
import useIsLoading from "../../hooks/useIsLoading";
import Loading from "../../shared/Loading";
import "./styles/home.css";

const Home = () => {
  const [isDeleteConfirmShown, setIsDeleteConfirmShown] = useState<boolean>(false);
  const [isSignupShown, setIsSignupShown] = useState<boolean>(false);
  const [isAlertShown, setIsAlertShown] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const users = useSelector<RootState, User[]>(state => state.users);
  const isFailedToLoad = useSelector<RootState, Boolean>(state => state.isFailedToLoad);
  const [value, setValue] = useState<string>("");
  const [isLoading] = useIsLoading();
  const dispatch = useDispatch();
  const history = useHistory();

  useLayoutEffect(() => {
    let listener = setTimeout(() => {
      setIsAlertShown(false)
    }, 1200);
    return () => clearTimeout(listener);
  }, [isAlertShown]);

  useEffect(() => {
    dispatch(fetchHelper(ReqType.reqGetUsers));
  }, [dispatch]);

  const handleDeleteSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsDeleteConfirmShown(false);
    if (selectedUser) deleteUser(selectedUser.id);
    setIsAlertShown(true);
    setSelectedUser(null);
    setValue("");
  };

  const handleSignin = () => {
    dispatch(fetchHelper(ReqType.reqGetUser, "", selectedUser?.id));
    dispatch(setIsLoggedIn(true));
    setSelectedUser(null);
    setValue("");
    history.push("/w");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setSelectedUser(users[+e.target.value]);
  };

  const deleteUser = (id: string) => {
    dispatch(fetchHelper(ReqType.reqDeleteUser, { id }));
  };

  const signupUser = (username: string) => {
    const body: AddUserBody = { username }
    dispatch(fetchHelper(ReqType.reqAddUser, body));
    setIsSignupShown(false);
    setIsAlertShown(true);
  };

  const checkValue = value.length === 0;

  const signinForm = <>
    <span className="signin__heading">Select your username</span>
    <SigninForm
      value={value}
      label={""}
      selectMessage={"Select"}
      optionMap={users}
      handleSelect={handleSelect} />
    <button className="button" onClick={() => handleSignin()} disabled={checkValue}>Sign in</button>
    <button className="button" onClick={() => setIsDeleteConfirmShown(true)} disabled={checkValue}>Delete User</button>
  </>;

  const userDelete = (
    <UserDelete
      handleSubmit={handleDeleteSubmit}
      setConfirmDelete={setIsDeleteConfirmShown}
      selectedUser={selectedUser} />);

  const userSignup = (
    <UserSignup
      setShowAddUser={setIsSignupShown}
      signupUser={signupUser} />
  )
  const signupButton = (
    <>
      <span className="signup__heading">Don't have a username?</span>
      <button className="button button--signup" onClick={() => setIsSignupShown(true)} >Sign up</button>
    </>
  )

  if (isFailedToLoad) { return <FailedToLoad /> };

  return (
    <div className="home">
      <div className="home__header"><MenuIcon /> Menu Plan</div>
      <Welcome />
      <div className="login">
        {isLoading ? <Loading /> :
          <>
            <div className="signin">
              {isDeleteConfirmShown ? userDelete : signinForm}
            </div>
            <div className="signup">
              {isSignupShown ? userSignup : signupButton}
              {isAlertShown ? <AlertText /> : null}
            </div>
          </>
        }
      </div>
    </div>
  );
};


export default Home;