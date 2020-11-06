import React, { useLayoutEffect, useRef } from 'react';
import { User } from '../../shared/types';


const UserDelete: React.FC<UserDeleteProps> = ({
  handleSubmit,
  selectedUser,
  setConfirmDelete
}) => {

  const focusRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (focusRef.current) focusRef.current.focus();
  }, []);

  return (
    <div className="user-delete">
      <span className="user-delete__text">Delete {selectedUser ? selectedUser.username : null}?</span>
      <button className="button" ref={focusRef} onClick={(e) => handleSubmit(e)}>YES</button>
      <button className="button" onClick={() => setConfirmDelete(false)}>NO</button>
    </div>
  );
};

type UserDeleteProps = {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedUser: User | null;
  setConfirmDelete: (boolean: boolean) => void;
};

export default UserDelete;