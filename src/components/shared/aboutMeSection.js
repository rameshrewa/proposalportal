import React from "react";
import AboutIcon from "../../assets/images/aboutIcons.png"

const AboutMeSection = ({aboutInfo}) => {

    return(
        <div className="box-withBorder p-4">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="InformationIconImg"><img src={AboutIcon} alt="AboutIcon" /></div>
                    <div className="info-scrolls pl-4">
                        <p>{aboutInfo}</p>
                    </div>
                </div>              
            </div>
        </div>
    )
}

export default AboutMeSection;