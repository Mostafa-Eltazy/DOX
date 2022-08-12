import { useState } from 'react';
import { BiBox } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Header = () => {
  const [active, setActive] = useState('docs');

  const setToActive = dir => {
    setActive(dir);
  };

  return (
    <header className="header px-3 py-3">
      <div className="container d-flex justify-content-between mt-4">
        <Link to="/" onClick={() => setToActive('docs')} style={{ textDecoration: 'none', color: '#000' }}>
          <div className="d-flex align-items-center">
            <h1>
              <strong>DOX</strong>
            </h1>
          </div>
        </Link>

        <div>
          <nav className="d-flex align-items-center">
            <label htmlFor="collpase-btn-check" className="collpase-btn">
              <i className="fas fa-bars"></i>
            </label>
            <input type="checkbox" id="collpase-btn-check" />
            <ul className="mb-1">
              <li>
                <Link to="/" className={active === 'docs' ? 'active' : ''} onClick={() => setToActive('dispatch')}>
                  <BiBox style={{ fontSize: '20px' }} />
                  <span>Documents</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
