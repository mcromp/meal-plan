import React, { useEffect, useRef } from 'react'
import { User } from '../../shared/types';


const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  handleSubmit,
  selectedUser,
  setConfirmDelete
}) => {
  const focusRef: React.MutableRefObject<any> = useRef();
  useEffect(() => {
    focusRef.current.focus();
  }, [])

  return (
    <div style={{ backgroundColor: "plum" }}>
      <span>Delete {selectedUser ? selectedUser.username : null}?</span>
      <button ref={focusRef} onClick={(e) => handleSubmit(e)}>YES</button>
      <button onClick={() => setConfirmDelete(false)}>NO</button>
    </div>
  )
}

type ConfirmDeleteProps = {
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedUser: User | null;
  setConfirmDelete: (boolean: boolean) => void;
}
export default ConfirmDelete