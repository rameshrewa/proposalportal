import React from "react";
import Header from "../candidateHeader/mainHeader";
import Sidebar from "../candidateHeader/leftSideMenus";
import SeoHead from "../../../layout/Seo/seoBlock"
import Congratulations from "../../../assets/images/Congratulations_Laptop.png"
import { lStorage } from "../../../utils/storage";

const ProfileDashboard = () => {
    const profileSubmit = lStorage.get("profileSubmit");
    
    return(
        <>
            <SeoHead />
            <section className="bg-white">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <Sidebar />
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12 PhotoUpload-dragDrop">
                            <Header />
                            {profileSubmit ? (
                                <div className="row pt-5 mt-5 justify-content-center">
                                    <div className="col-lg-3 col-md-6 col-sm-12 text-center mt-5">
                                        <img src={Congratulations} alt="Congratulations" />
                                        <h5 className="mt-4">Congratulations!</h5>
                                        <p className="mt-3">We are glad with your genuine declaration, kindly wait for the verification process to complete</p>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </section>
        </>    
    )

}

export default ProfileDashboard;