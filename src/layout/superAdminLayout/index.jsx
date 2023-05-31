import React, { useEffect } from 'react';
import SuperadminHeader from './superAdminHeader';
import '../../assets/styles/scss/superadmin.scss';
// import Footer from './Footer';

// import ScrollToTop from 'react-scroll-to-top';

const SuperadminLayout = ({ children, isSticky, wrapperClass }) => {
  useEffect(() => { }, []);
  
    return (
      <div className={wrapperClass}>
        <SuperadminHeader isSticky={isSticky} />
        <main className='main-wrapper' id='main-wrapper'>
          {children}
        </main>
        {/* <Footer /> */}
        {/* <ScrollToTop smooth className='admin-scroll-to-top' /> */}
      </div>
    );
};

export default SuperadminLayout;
