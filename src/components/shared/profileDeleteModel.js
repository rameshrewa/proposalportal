import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/images/delete-Icon.png"
import DeleteImg from "../../assets/images/delete-Img.png"
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";


const ProfileDeleteModelSection = () => {

    // const [FromDate, setFromDate] = React.useState(new Date());
    // const [ToDate, setToDate] = React.useState(new Date());
    
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {

    }
    
    return(      
        <>  
            <Link href="#" className="LeftMenu-DeleteIcon" style={{marginTop:'-5px'}} onClick={handleShow}>
                Delete
                <span className="text-right" style={{float:'right'}}><img src={DeleteIcon} alt="DeleteIcon" /></span>
            </Link>
            <Modal show={show} onHide={handleClose} size="lg" keyboard={true} backdrop="static" className="Suspended-model mt-5">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                        <Modal.Header closeButton>
                            <Modal.Title></Modal.Title>
                        </Modal.Header>
                        <div className="py-2">
                            <div className="text-right p-3 mobile-open"><button type="button" class="btn-close" aria-label="Close" onClick={handleClose}></button></div>
                            <div className="text-center">
                                <img src={DeleteImg} alt="Profile Delete" />
                                <h6 style={{fontWeight:'600'}}>Please let us Know the reason for<br/> deleting your profile</h6>   
                            </div>                     
                            <form onSubmit={handleSubmit(onSubmit)} className="PaymentProccesForm">
                                <div className="form-group">
                                    <label htmlFor="Reason">Comments<span className="requiredColor">*</span></label>
                                    <textarea
                                        className="form-control Current_Address"
                                        name="Comments"
                                        {...register('Comments', { required: true })}
                                    />
                                    <span className="error_validation ml-3">
                                        {errors.Comments?.type === 'required' && "This field is required."}
                                    </span>
                                </div>                                
                                <div className="text-center">
                                    <button type="submit" className="mt-5 w-50 btn btn-primary btn-block submit-button">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>                    
            </Modal>
        </>    
    )

}

export default ProfileDeleteModelSection;