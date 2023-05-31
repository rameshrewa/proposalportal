import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
import { yearconvert } from "../../../utils/common/dateConvertion";
import { useCallback } from "react";
import CandidateReject from "./docReject";

function Registeredpopup(props) {
  const getDocumentData = new DocumentVerificationServices();
  const [getoneCandidate, setGetOneCandidate] = useState();
  const [rejectData, setRejectData] = useState(false);
  useEffect(() => {
    setGetOneCandidate(props.oneCandidate);
  }, [props.oneCandidate]);
  const handlePostData = (data) => {
    const approve = [
      {
        candidate_id: data,
        status: "approved_for_payment",
      },
    ];
    getDocumentData.documentPostData(approve).then((res) => {
      if (res.status === 200) {
        toast.success("Candidate Approved Successfully");
        props.setModalShow(false);
        props.getApiData();
        props.reviewGetApiData();
      } else {
        toast.error("Approved for payment faild");
      }
    });
  };
  const handleRejectdDatadd = (data) => {
    setRejectData(false);
    getDocumentData.documentPostData(data).then((res) => {
      if (res.status === 200) {
        toast.success("Rejected for payment");
        props.setModalShow(false);
        setRejectData(false);
        props.getApiData();
      }
    });
  };
  const handleRejectdData = () => {
    setRejectData(true);
  };
  const handleClose = () => {
    setRejectData(false);
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="registered-popup"
      >
        <Modal.Header className="register-popup-head-bg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4> Registered candidate </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {getoneCandidate?.map((itemsPopup) => {
              return (
                <>
                  {rejectData === true && (
                    <CandidateReject
                      propsData={itemsPopup}
                      handleRejectdDatadd={handleRejectdDatadd}
                      handleClose={handleClose}
                    />
                  )}

                  {rejectData === false ? (
                    <>
                      <table>
                        <thead>
                          <tr>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="td-pad-bottom20">
                            <td className="td-wid40 registered-tr-head">
                              {" "}
                              HFN ID{" "}
                            </td>
                            <td className="td-wid60 break-word">
                              {" "}
                              {itemsPopup.abhyasi_id}{" "}
                            </td>
                          </tr>
                          <tr className="td-pad-bottom20">
                            <td className="td-wid40 registered-tr-head">
                              {" "}
                              Abhyasi Name{" "}
                            </td>
                            <td className="td-wid60 break-word">
                              {itemsPopup.name}{" "}
                            </td>
                          </tr>
                          <tr className="td-pad-bottom20">
                            <td className="td-wid40 registered-tr-head">
                              {" "}
                              Email ID{" "}
                            </td>
                            <td className="td-wid60 break-word">
                              {" "}
                              {itemsPopup.email_address}
                            </td>
                          </tr>
                          <tr className="td-pad-bottom20">
                            <td className="td-wid40 registered-tr-head">
                              {" "}
                              Mobile Number{" "}
                            </td>
                            <td className="td-wid60 break-word">
                              {itemsPopup.contact_number}{" "}
                            </td>
                          </tr>
                          <tr className="td-pad-bottom20">
                            <td className="td-wid40 registered-tr-head">
                              {" "}
                              Date Of Attendingvow Workshop{" "}
                            </td>
                            <td className="td-wid60 break-word">
                              {/* {itemsPopup.vow_workshop_date}  */}
                              {yearconvert(itemsPopup.vow_workshop_date)}
                            </td>
                          </tr>
                          <tr className="td-pad-bottom20">
                            <td className="td-wid40 registered-tr-head">
                              {" "}
                              Date of Joining Heartfulness{" "}
                            </td>
                            <td className="td-wid60 break-word">
                              {" "}
                              {yearconvert(itemsPopup.date_of_joining_hfn)}{" "}
                            </td>
                          </tr>
                          {/* <tr className="mt-4">
                      <td className="td-wid80 text-right"><div className="mt-4"><button className="btn btn-white-reject" 
                      onClick={() =>handleRejectdData(itemsPopup.candidate_id)}
                      > Reject </button></div></td>
                      <td className="td-wid40 text-center"><div className="mt-4"><button type="button" className="btn btn-approve-blue" onClick={() =>handlePostData(itemsPopup.candidate_id)}> Approve </button></div></td>
                    </tr> */}
                        </tbody>
                      </table>
                      <div className="btn-aln-center">
                        <div className="popup-aprove-btn">
                          <button
                            type="button"
                            className="btn-white-reject btn-rejec-width"
                            onClick={() =>
                              handleRejectdData(itemsPopup.candidate_id)
                            }
                          >
                            {" "}
                            Reject{" "}
                          </button>
                        </div>
                        <div className="popup-aprove-btn">
                          <button
                            type="button"
                            className="btn-approve-blue"
                            onClick={() =>
                              handlePostData(itemsPopup.candidate_id)
                            }
                          >
                            {" "}
                            Approve{" "}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop={false}
          hideProgressBar
          closeOnClick
          rtl={false}
        />
      </div>
    </>
  );
}

export default Registeredpopup;
