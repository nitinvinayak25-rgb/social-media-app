import { useContext } from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import Datacontext from "./context/DataContext";

const Header = ({ title }) => {
  const {width} = useContext(Datacontext)
  return (
    <header className="header">
      <h1>{title}</h1>

      {width < 768 ? (
        <FaMobileAlt />
      ) : width < 992 ? (
        <FaTabletAlt />
      ) : (
        <FaLaptop />
      )}
    </header>
  );
};

export default Header;