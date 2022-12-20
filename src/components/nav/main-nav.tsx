import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface MainNavProps {}

const MainNav: FunctionComponent<MainNavProps> = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`reader`}>Reader</Link>
          </li>
          <li>
            <Link to={`about`}>About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
