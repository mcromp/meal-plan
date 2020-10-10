import React from 'react';

const BigButton: React.FC<any> = ({ disabled = false, onClick, children }) => {
  return (
    <button className="big" onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default BigButton