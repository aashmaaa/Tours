import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import PropTypes from 'prop-types';

const Header = ({ user }) => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to="/">
          All tours
        </Link>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user ? (
          <>
            <Link className="nav__el nav__el--logout" to="/logout">
              Log out
            </Link>
            <Link className="nav__el" to="/me">
              <img
                className="nav__user-img"
                src={`/img/users/${user.photo}`}
                alt={`Photo of ${user.name}`}
              />
              <span>{user.name.split(' ')[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link className="nav__el" to="/login">
              Log in
            </Link>
            <Link className="nav__el nav__el--cta" to="#">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

// PropTypes validation for user prop
Header.propTypes = {
  user: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Header;
