import React from 'react'
import './Footer.css'

const footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Your E-Commerce Site. All rights reserved.</p>
    </footer>
  )
}

export default footer
