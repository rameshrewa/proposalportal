import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import MasterLogo from "../../assets/images/master-logo.png";
import VisaLogo from "../../assets/images/visa-card.png";
import PayPalLogo from "../../assets/images/paypal-logo.png";
//import UserPaymentService from "../../services/user.service";
import { useHistory } from "react-router-dom";

import CandidateService from "../../services/admin/candidate.service";
import { lStorage } from "../../utils/storage";
import { useCallback } from "react";

const PaymentProcces = () => {
  let history = useHistory();

  const [show, setShow] = useState(true);
  //  const [setPaymentSuccss] = React.useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const candidateApi = new CandidateService();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // let InfoData = {
    //     payment_amount: data.amount,
    //     payment_ref_id: '46346346',
    //     payment_status: '1'
    // }
    //Payment API
    // UserPaymentService.postMethod('candidate/payment', InfoData).then(
    //     response => {
    //         console.log(response)
    //         if(response.data.isError === true || response.data.statusCode === '400'){
    //             setPaymentSuccss(response.data.message[0])
    //         }
    //     }, error => {
    //         console.log(error)
    //     }
    // );
    //Payment API

    let paymentDetails = [
      {
        payment_ref_id: (Math.random() + 100).toString(36).substring(7),
        payment_amount: "1000",
        payment_status: 1,
      },
    ];
    candidateApi.paymentApi(paymentDetails).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        history.push("/personal-detail");
      } else {
      }
    });
  };

  // function formats(ele,e){
  //     if(ele.value.length<19){
  //         ele.value= ele.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  //         return true;
  //     }else{
  //         return false;
  //     }
  // }

  // function numberValidation(e){
  //     e.target.value = e.target.value.replace(/[^\d ]/g,'');
  //     return false;
  // }

  // const payAmount =()=>{
  //     let paymentDetails=[{
  //         "payment_ref_id" : (Math.random() + 100).toString(36).substring(7),
  //         "payment_amount" : "1000",
  //         "payment_status" : 1
  //     }]
  //     candidateApi.paymentApi(paymentDetails).then(
  //         response => {
  //           if(response.data.isError === false || response.data.statusCode === '200'){
  //             console.log("aaaa",response.data)
  //             history.push("/personal-detail");
  //           }else{

  //           }})

  // }
  const Logout = useCallback(() => {
    lStorage.clear();
    history.push("/login");
  }, [history]);
  return (
    <>
      {/* <div onClick={handleShow} className="btn btn-primary btn-block proceed_payment">PROCEED TO PAYMENT</div> */}
      <Modal show={show} onHide={handleClose} size="lg" className="mt-5">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="model-payment py-5">
              {/* <div className="text-right p-3 mobile-open"><button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button></div> */}
              <h5>MAKE PAYMENT</h5>
              <p>Select A Payment Method</p>
              <img src={MasterLogo} alt="MasterLogo" className="mr-2" />
              <img src={VisaLogo} alt="VisaLogo" className="mr-2" />
              <img src={PayPalLogo} alt="PayPalLogo" />
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="PaymentProccesForm"
              >
                <div className="form-group">
                  <label htmlFor="Card_Number">Card Number</label>
                  <input
                    type="text"
                    className="form-control card-number"
                    format="#### #### #### ####"
                    name="Card_Number"
                    {...register(
                      "Card_Number"
                      //{ required: true }
                    )}
                  />
                  <span className="error_validation ml-3">
                    {errors.Card_Number?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
                <div className="row">
                  <div className="col-lg-6 col">
                    <div className="form-group">
                      <label htmlFor="Valid_Upto">Valid Upto</label>
                      <input
                        type="text"
                        className="form-control card-number"
                        placeholder="MM/YY"
                        name="Valid_Upto"
                        {...register(
                          "Valid_Upto"
                          // { required: true, pattern: {
                          //     value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                          //     message: 'Please enter a valid Upto!',
                          // } }
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.Valid_Upto?.type === "required" &&
                          "This field is required."}
                        {errors.Valid_Upto?.message}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 col">
                    <div className="form-group">
                      <label htmlFor="CVV">CVV</label>
                      <input
                        type="password"
                        className="form-control card-number"
                        name="CVV"
                        placeholder="XXX"
                        {...register(
                          "CVV"
                          //{ required: true }
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.CVV?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                </div>
                <input
                  type="hidden"
                  name="amount"
                  value={"10"}
                  {...register("amount", { required: false })}
                />
                <input
                  type="submit"
                  value="Pay Rs 1000"
                  className="mt-5 btn btn-primary btn-block login-button cursor"
                />
                <button
                  type="submit"
                  value="Log out"
                  className="mt-5 btn btn-white payment-logout btn-block login-button"
                  onClick={Logout}
                >
                  Log Out
                </button>
              </form>
              {/* {paymentSuccss ? (
                            <div className="payment-error pt-2">{paymentSuccss}</div>
                        ) : null} */}
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            {/* <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header> */}
            <Modal.Body>
              <div className="card_views mt-5">
                <div className="row">
                  <div className="col-lg-6 col">
                    <p>Registration Fee</p>
                  </div>
                  <div className="col-lg-6 col text-right">
                    <p>₹ 1000.00</p>
                  </div>
                </div>
                <hr style={{ border: "1px solid #FFFFFF" }} />
                <div className="row">
                  <div className="col-lg-6 col">
                    <p>
                      <b>Total Amount</b>
                    </p>
                  </div>
                  <div className="col-lg-6 col text-right">
                    <p>
                      <b>₹ 1000.00</b>
                    </p>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PaymentProcces;
