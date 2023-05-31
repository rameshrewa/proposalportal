import React from "react";
import { useForm } from "react-hook-form";
import HeartfulnessLogo from "../../assets/images/heartfulness-logo.png"
import weedingIcon from "../../assets/images/weeding-Icon.png"
import RAMYAImg from "../../assets/images/image-20.png"
import SHIKHAImg from "../../assets/images/image-20.png"
import CongratulationsImage from "../../assets/images/CongratulationsImg.png"

const WeedingConfirmSection = ({aboutInfo}) => {

    const[Congratulation, setCongratulation] = React.useState(false);
    const[ProposalDecline, setProposalDecline] = React.useState(false);

    function ActionDecline(name, hfnID) {
        alert(`${name} - ${hfnID}`);
        setProposalDecline(true);
    }

    function ActionConfirm(name, hfnID) {
        alert(`${name} - ${hfnID}`);
        setCongratulation(true)
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onProposalDecline = (data) => {
    }

    return(
        <>
            <div className="col-lg-4 col-md-4 col-sm-12">                    
                <div className="p-0">
                    <img src={RAMYAImg} alt="RAMYAImg" class="weeding-authImg img-fluid"/>
                    <img src={SHIKHAImg} alt="SHIKHAImg" class="weeding-authImg img-fluid"/>
                </div>
            </div>  
            <div className="col-lg-8 col-md-8 col-sm-12 text-center">
                <div className={ProposalDecline ? "weedingbox-withBorder py-5 d-none" : "weedingbox-withBorder py-5"}>                    
                    { Congratulation ? (
                        <>
                            <img src={CongratulationsImage} alt="HeartfulnessLogo" className="pt-5 mt-5" />
                            <h5 className="mt-3">Congratulations</h5>
                            <p>Shikha Kumar your wedding is<br/>confirmed Thanks for choosing<br/>Proposal portal</p>
                            <h5 className="mt-3"><b>Best wishes!</b></h5>
                            <p className="mt-4">From Heartfulness Team</p>
                            <p>&nbsp;</p><p>&nbsp;</p>
                        </>
                    ) : (
                        <>
                        <img src={HeartfulnessLogo} alt="HeartfulnessLogo" className="pt-5 mt-5 img-fluid" />
                        <h5 className="mt-3">CONFIRM WEDDING</h5>
                        <img src={weedingIcon} alt="weedingIcon" className="mt-3 img-fluid" />
                        <div className="row mt-3">
                            <div className="col-lg-12 col-md-8 col-sm-12">
                                <div className="weedingConfrimCol">
                                    <div className="weedingCol-Left">
                                        <h6>HFN ID 1234567</h6>
                                        <h5>SHIKHA KUMAR <br/>28</h5>
                                        <p><b>Contact Details</b><br/>98812-33210</p>
                                    </div>
                                    <div className="weedingCol-Right">
                                        <h6>HFN ID 1234567</h6>
                                        <h5>RAMYA <br/>24</h5>
                                        <p><b>Contact Details</b><br/>98812-33210</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5 mb-5">
                            <div className="col-lg-12 col-md-8 col-sm-12">
                                <div className="weedingConfrimCol">
                                    <div className="weedingCol-Decline">
                                        <button className="Weeding-Decline" onClick={() => ActionDecline('RAMYA-Decline', 'HFN ID 1234567')}>Decline</button>
                                    </div>
                                    <div className="weedingCol-Right">
                                        <button className="Weeding-Confirm" onClick={() => ActionConfirm('RAMYA-Confirm', 'HFN ID 1234567')}>Confirm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </>
                    )}                    
                </div>
                <div className={ProposalDecline ? "weedingbox-withBorder py-5" : "weedingbox-withBorder py-5 d-none"}>
                    <img src={HeartfulnessLogo} alt="HeartfulnessLogo" className="pt-5 mt-5" />
                    <h5 className="mt-3">PROPOSAL PORTAL</h5>
                    <p>Please let us Know the reason on rejection</p>
                    <form onSubmit={handleSubmit(onProposalDecline)} className="DeliceForm m-4">
                        <div className="form-group">
                            <label htmlFor="comments">Comments<span className="requiredColor">*</span></label>
                            <textarea
                                className="form-control Current_Address"
                                name="comments"
                                {...register('comments', { required: true })}
                            />
                            <span className="error_validation ml-3">
                                {errors.comments?.type === 'required' && "This field is required."}
                            </span>
                        </div>
                        <div className="text-left ml-5">
                            <button type="submit" className="mt-3 ml-5 w-30 recommended-Confirm">Submit</button>
                        </div>
                    </form>
                </div>
            </div> 
        </>
    )
}

export default WeedingConfirmSection;