import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => (
        <nav>
            <div className="nav-wrapper blue-grey darken-4"> 
                <Link to={'/'} className="brand-logo" style={{ paddingLeft: '2%'}}> IT knjige </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to={'/shop'}>Shop</Link></li>
                    <li><Link to={'/about'}>O nama</Link></li>
                </ul>
            </div>
        </nav>

)

export default Header;