import React from 'react';

const MedButton: React.FC<any> = ({ disabled = false, onClick, children }) => {
  return (
    <button className="med" onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default MedButton