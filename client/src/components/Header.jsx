import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../image/logo.png'
function Header() {
    return (
        <div className="dashboard-header">
        <nav className="navbar navbar-expand-lg bg-light-gray fixed-top">
            <img src={logo} width={50} className='m-l-20'/>
            <a className="navbar-brand"><span>M</span>a<span></span><span>s</span><span>t</span><span>e</span><span>r</span><span>s</span><span>t</span><span>r</span><span>o</span><span>k</span><span>e</span></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto navbar-right-top">
                    {/* <li className="nav-item">
                        <div id="custom-search" className="top-search-bar">
                            <input className="form-control" type="text" placeholder="Search.." />
                        </div>
                    </li> */}
                    {/* <li className="nav-item dropdown notification">
                        <a className="nav-link nav-icons" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-fw fa-bell"></i> <span className="indicator"></span></a>
                        <ul className="dropdown-menu dropdown-menu-right notification-dropdown">
                            <li>
                                <div className="notification-title"> Notification</div>
                                <div className="notification-list">
                                  
                                </div>
                            </li>
                            <li>
                                <div className="list-footer"> <a href="#">View all notifications</a></div>
                            </li>
                        </ul>
                    </li> */}
                    {/* <li className="nav-item dropdown connection">
                        <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fas fa-fw fa-th"></i> </a>
                        <ul className="dropdown-menu dropdown-menu-right connection-dropdown">
                            <li className="connection-list">
                                <div className="row">
                                    
                                </div>
                            </li>
                            <li>
                                <div className="conntection-footer"><a href="#">More</a></div>
                            </li>
                        </ul>
                    </li> */}
                    <li className="nav-item dropdown nav-user">
                        <Link className="nav-link nav-user-img" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="assets/images/avatar-1.jpg" alt="" className="user-avatar-md rounded-circle" /></Link>
                        <div className="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                            <div className="nav-user-info">
                                <h5 className="mb-0 text-white nav-user-name">Saurav </h5>
                                <span className="status"></span><span className="ml-2">Available</span>
                            </div>
                            <Link className="dropdown-item"><i className="fas fa-user mr-2"></i>Account</Link>
                            <Link className="dropdown-item"><i className="fas fa-cog mr-2"></i>Setting</Link>
                            <Link to='/' className="dropdown-item"><i className="fas fa-power-off mr-2"></i>Logout</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    );
}

export default Header;
