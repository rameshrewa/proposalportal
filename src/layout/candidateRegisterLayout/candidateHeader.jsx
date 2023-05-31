import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import HeadImg from "../../assets/images/header.png";
import Active from "../../assets/images/active-button.png";
import Deactive from "../../assets/images/deactive-button.png";
import CandidateService from "../../services/admin/candidate.service";
import { Modal } from "react-bootstrap";
import Loading from "../../components/shared/common/loading";

const CandidateHeader = () => {
  const candidateApi = new CandidateService();
  const [actives, setActives] = useState("");
  const [loading, setLoading] = useState(false);
  const Logininfo = () => {
    setLoading(true);
    candidateApi.userReginfoApi().then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setLoading(false);
        setActives(response.data.data.profile_sub_status);
      } else {
        setLoading(false);
      }
    });
    setLoading(false);
  };
  useEffect(() => {
    Logininfo();
  }, [actives]);
  return (
    <section className="ProfileHeader">
      <Navbar collapseOnSelect expand="sm" variant="dark" className="">
        <Container>
          <div className="usersHeader">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <img src={HeadImg} className="headerLogo" alt="header logo" />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <Navbar.Toggle aria-controls="navbarResponsive" />
                <Navbar.Collapse
                  id="navbarResponsive"
                  className="collapse navbar-collapse"
                >
                  <Nav>
                    <ul className="navbar-nav">
                      <li className="personal-detail">
                        <>
                          {actives === 1 ||
                          actives === 2 ||
                          actives === 3 ||
                          actives === 4 ||
                          actives === 6 ||
                          actives === 5 ? (
                            <img src={Active} alt="Active" />
                          ) : (
                            <img src={Deactive} alt="Deactive" />
                          )}
                          <div className="mt-2 proposalUserMenu">
                            Personal Details
                          </div>
                        </>
                      </li>
                      <li className="lifestyle">
                        <>
                          {actives === 2 ||
                          actives === 3 ||
                          actives === 4 ||
                          actives === 6 ||
                          actives === 5 ? (
                            <img src={Active} alt="Active" />
                          ) : (
                            <img src={Deactive} alt="Deactive" />
                          )}
                          <div className="mt-2 proposalUserMenu">Lifestyle</div>
                        </>
                      </li>
                      <li className="upload-documents">
                        <>
                          {actives === 3 ||
                          actives === 4 ||
                          actives === 6 ||
                          actives === 5 ? (
                            <img src={Active} alt="Active" />
                          ) : (
                            <img src={Deactive} alt="Deactive" />
                          )}
                          <div className="mt-2 proposalUserMenu">
                            Document Upload
                          </div>
                        </>
                      </li>
                      <li className="photos-documents">
                        <>
                          {actives === 4 || actives === 6 || actives === 5 ? (
                            <img src={Active} alt="Active" />
                          ) : (
                            <img src={Deactive} alt="Deactive" />
                          )}
                          <div className="mt-2 proposalUserMenu">
                            Photos Upload
                          </div>
                        </>
                      </li>
                    </ul>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </section>
  );
};
export default CandidateHeader;
