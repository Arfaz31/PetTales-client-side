import LgNav from "../ResponsiveComponent/ResponsiveNav/LgNav";
import SmNav from "../ResponsiveComponent/ResponsiveNav/SmNav";

const Navbar = () => {
  return (
    <div className="py-3 xl:px-0 md:px-5 px-2    w-full shadow-sm">
      <div className="lg:block hidden">
        <LgNav />
      </div>
      <div className="lg:hidden block">
        <SmNav />
      </div>
    </div>
  );
};

export default Navbar;
