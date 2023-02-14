import FootBar from "./footbar";
import Navbar from "./header";
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FootBar />
    </>
  );
}

export default Layout;
