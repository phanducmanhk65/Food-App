import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navLinksCenter,navLinksRight } from '../constants';
import LogoUrl from '../assets/LogoSota';
import '../styles/navbar.scss';

const Navbar = () => {
  const navigate = useNavigate();

 
  return (
    <nav className='container-1'>
      <LogoUrl/>
     <ul className='container-2'>
        {navLinksCenter.map((nav, index) => (
          <li key={nav.id} className='keyNav-1'>
            <Link to={`/${nav.id}`} className='aNav-1' onClick={() => navigate(`/${nav.id}`)}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul> 
      <ul className='container-3'>
        {navLinksRight.map((nav, index) => (
          <li key={nav.id} className='keyNav-1'>
            <Link to={`/${nav.id}`} className='aNav-1' onClick={() => navigate(`/${nav.id}`)}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul> 
     
    </nav>
  );
};

export default Navbar;
