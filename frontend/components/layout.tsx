import FootBar from "./footbar";
function Layout({ children }) {
  return (
    <>
      <main >{children}</main>
      <FootBar />
    </>
  );
}

export default Layout;
