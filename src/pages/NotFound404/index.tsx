import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import "./styles/NotFound404.css"

const NotFound404: React.FC = () => {
  const [isRedirect, setIsRedirect] = useState<boolean>(false)
  useEffect(() => {
    let listener = setTimeout(() => {
      setIsRedirect(true)
    }, 5000);
    return () => {
      clearTimeout(listener)
    }
  }, [])
  if (isRedirect) { return <Redirect to={`/`} />; }
  return (
    <div className="main">
      <span className="main__text">404: Not Found</span>
      <span className="main__sub-text">Returning to homepage...</span>
    </div>
  )
}

export default NotFound404