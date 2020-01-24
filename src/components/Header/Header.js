import React from 'react';
import logo from '../../logo.svg';
import './Header.scss';

export class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <img src={logo} className="Header-logo" alt="logo"/>
        <div className="header-container">
          <h2>Show weather in a chosen city/area</h2>
          <h6>Powered by: Google Maps & OpenWeater</h6>
        </div>
      </div>
    )
  }
}
