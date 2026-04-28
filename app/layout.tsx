export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <html lang="zh-TW">
      <body>
        <header className="topbar">
          <div className="shell topbar-inner">
            <a className="brand" href="/">
              <div className="mark">O</div>
              <div>
                <strong>ONYX DEEP TECH STUDIO</strong>
                <span>Litu / Lidao Base · Field System</span>
              </div>
            </a>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/gems">G.E.M.S.</a>
              <a href="/tcp">T.C.P.</a>
              <a href="/litu-node">Litu Node</a>
              <a href="/about">About</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="footer">© ONYX · Field Infrastructure · AI · Energy · Optical</footer>
        <div className="ai">AI</div>
      </body>
    </html>
  )
}