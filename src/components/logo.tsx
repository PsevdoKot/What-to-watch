import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export type LogoProps = {
  light?: boolean;
}

export default function Logo({ light = false }: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link to={ROUTES.main.fullPath} className={`logo__link ${light ? 'logo__link--light' : ''}`}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
