const NavBar = (props) => {
  return (
    <>
      <nav className="nav">
        <span>G4 Crew Contacts App</span>
        <div className="profile">
          <a>John Doe</a>
        </div>
      </nav>
      <style jsx>
        {`
          .nav {
            background-image: var(--navbar-image);
            color: var(--nav-font-color);
            margin: 0px 0px;
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              margin-left: 20px;
            }
            .profile {
              padding: 10px 20px;
              display: flex;
              align-items: center;
            }
          }
        `}
      </style>
    </>
  );
};

export default NavBar;
