
import { Link } from 'react-router-dom';


export const Error404 = () => (
  <div>
    <h1>
      <span>404</span> not found
    </h1>
    <Link to="/">
      ⬅️ Main Page
    </Link>
  </div>
);