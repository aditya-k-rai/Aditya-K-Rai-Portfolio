import React from 'react'

export default function Footer() {
  return (
    <footer>
      <div className="container footerContainer">
        <div className="footerFadedText">AKR</div>
        <div className="footerLegal center-footer">
          <span>&copy; {new Date().getFullYear()} Aditya Rai. All rights reserved.</span>
          <span>Terms &amp; Conditions | Privacy Policy</span>
        </div>
      </div>
    </footer>
  )
}
