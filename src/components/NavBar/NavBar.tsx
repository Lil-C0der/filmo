import React, { FC } from 'react';
import classNames from 'classnames';
import './NavBar.scss';

const NavBar: FC = () => {
  return (
    <div className="navbar">
      <div className="navbar_primary">
        <div className="navbar_logo"></div>
        <div className="navbar_search"></div>
      </div>
      <div className="navbar_secondary">"SECONDARY"</div>
    </div>
  );
};

export default NavBar;
