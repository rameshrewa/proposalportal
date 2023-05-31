import React, { useEffect } from 'react';

import InnerHeader from './InnerHeader';
import '../../assets/styles/scss/adminpages.scss';
import '../../assets/styles/scss/matchingExpertStyle.scss';
// import Footer from './Footer';

// import ScrollToTop from 'react-scroll-to-top';

const AdminLayout = ({ children, isSticky, wrapperClass }) => {
  useEffect(() => { }, []);
  
    return (
      <div className={wrapperClass}>
        <InnerHeader isSticky={isSticky} />
        <main className='main-wrapper' id='main-wrapper'>
          {children}
        </main>
        {/* <Footer /> */}
        {/* <ScrollToTop smooth className='admin-scroll-to-top' /> */}
      </div>
    );
};

export default AdminLayout;
