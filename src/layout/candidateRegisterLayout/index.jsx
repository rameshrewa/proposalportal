import React, {useState, useEffect } from 'react';
import CandidateHeader from './candidateHeader';
import '../../assets/styles/scss/style.css';
import '../../assets/styles/scss/common.scss';
// import Footer from './Footer';

// import ScrollToTop from 'react-scroll-to-top';

const CandidateLayout = ({ children, isSticky, wrapperClass }) => {
  
  
    return (
      <div className={wrapperClass}>
        <CandidateHeader isSticky={isSticky} />
        <main className='main-wrapper' id='main-wrapper'>
          {children}
        </main>
        {/* <Footer /> */}
        {/* <ScrollToTop smooth className='admin-scroll-to-top' /> */}
      </div>
    );
};

export default CandidateLayout;
