import React from 'react';
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_LINKS2 } from "../lib/consts/Navigation";
import { useState } from 'react';
function Sidebar() {
    const [activeTab, setActiveTab] = useState(0);
  const [activeNavIndex1, setActiveNavIndex1] = useState(0);
  const [activeNavIndex2, setActiveNavIndex2] = useState(0);

  const clickHandler1 = (index) => {
    setActiveTab(0);
    setActiveNavIndex1(index);
  };

  const clickHandler2 = (index) => {
    setActiveTab(1);
    setActiveNavIndex2(index);
  };
    return (
    <div className='dashboard-main-wrapper'>
    <div className="nav-left-sidebar sidebar-dark">
        <div className="menu-list">
            <nav className="navbar navbar-expand-lg navbar-light">
                <a className="d-xl-none d-lg-none" href="#">Dashboard</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav flex-column">
                        <li className="nav-divider">
                            Menu
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link active" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-1" aria-controls="submenu-1"><i className="fa fa-fw fa-user-circle"></i>Masters <span className="badge badge-success">6</span></a>
                            <div id="submenu-1" className="collapse submenu">
                                <div className="nav flex-column">
                                    {DASHBOARD_SIDEBAR_LINKS.map((item, index) => (
                                        <p className="nav-item nav-link" key={index} onClick={() => clickHandler1(index)}><span  onClick={() => setActiveNavIndex1(index)}
                                        className={
                                          activeNavIndex1 === index
                                            ? "current"
                                            : "default"
                                        }>{item.label}</span></p>
                                    ))}
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" data-toggle="collapse" aria-expanded="false" data-target="#submenu-2" aria-controls="submenu-2"><i className="fa fa-fw fa-rocket"></i>Input Form</a>
                            <div id="submenu-2" className="collapse submenu">
                                <div className="nav flex-column">
                                {DASHBOARD_SIDEBAR_LINKS2.map((item, index) => (
                                        <p className="nav-item nav-link" key={index} onClick={() => clickHandler2(index)}><span onClick={() => setActiveNavIndex1(index)}
                                        className={
                                          activeNavIndex1 === index
                                            ? "current"
                                            : "default"}>{item.label}</span></p>
                                    ))}
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    <div className="dashboard-wrapper">
        <div className="row m-l-20">
            <div className="col">
                {activeTab === 0 && DASHBOARD_SIDEBAR_LINKS[activeNavIndex1].content}
                {activeTab === 1 && DASHBOARD_SIDEBAR_LINKS2[activeNavIndex2].content}
            </div>
        </div>
    </div>
</div>

      
    );
}

export default Sidebar;
