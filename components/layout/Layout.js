import NavBar from './navBar';

const Layout = (props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <style jsx>
        {`
          main {
            padding: 0 20px;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
