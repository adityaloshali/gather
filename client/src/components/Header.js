import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav style={{ padding: '0px 40px' }} className="blue accent-2">
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Gather
          </a>
          <ul className="right">
            <li>
              <a>
                Login With Google
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
