import React from "react";
import {Helmet} from "react-helmet";
import { useLocation } from 'react-router-dom';
import faviconIcon from "../../assets/images/favicon-logo.svg"

const SEOSECTION = ({HeadTitle, HeadDescription}) => {
    const location = useLocation();
        return(
        <Helmet>
            <meta charSet="utf-8" />
            <link rel="icon" href={faviconIcon} />
            <title>{HeadTitle ? HeadTitle : 'Proposal Portal'}</title>
            <link rel="canonical" href={location.pathname ? location.pathname : null} />
            <meta name="description" content={HeadDescription ? HeadDescription : 'Proposal Portal Description'} />
        </Helmet>
    )
}

export default SEOSECTION;