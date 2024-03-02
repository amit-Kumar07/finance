import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
const Dashboard = () =>{

    return(
        <div> 
           <div><Header/></div>
          <div><Sidebar/></div>
          <div>{Outlet}</div>
        </div>
    )
}

export default Dashboard;


