import Footer from "@/components/footer";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import Navbar from "@/components/navbar";

const Layout = ({ children }) => {
  return (
    <main>
      <Navbar hasWhiteBgs />
      <MaxWidthWrapper className="py-28">{children}</MaxWidthWrapper>
      <Footer />
    </main>
  );
};

export default Layout;
