import './Header.css'
function Header() {
  return (<div className="header-wrapper">
    <nav className='navigation-bar'>
      {/* Logo goes here */}
      <a className='logo-wrapper' href='/' aria-label="Home">
        <div>
          <div className="logo" data-loading="true">
          </div>
        </div>
      </a>
      {/* My workspace goes here */}

    </nav>
  </div>);
}

export default Header;