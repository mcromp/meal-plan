import React from "react";
const AlertText: React.FC<AlertTextProps> = ({ children }) => (
  <div>
    <span>{children}</span>
  </div>)


type AlertTextProps = { children: string | null }

export default AlertText