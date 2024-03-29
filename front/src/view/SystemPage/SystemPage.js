import React from "react";
import styles from "./SystemPage.module.css";
import $ from "jquery";
import { Navigate } from "react-router-dom";

import Authenticator from "../../controllers/Authenticator/Authenticator";

class SystemPage extends React.Component {
  loggedInNavComponents = new Map([
    [
      "profileComponent",
      <li className="profile-btn">
        <a href="/profile">Manage account</a>
      </li>,
    ],
    [
      "appointmentComponent",
      <li className="appointment-btn">
        <a href="/appointment">Make an appointment</a>
      </li>,
    ],
    [
      "logoutComponent",
      <li className="logout-btn">
        <a href="/logout">Logout</a>
      </li>,
    ],
  ]);
  guestNavComponents = new Map([
    [
      "loginComponent",
      <li className="login-btn">
        <a href="/login">Login</a>
      </li>,
    ],
    [
      "registerComponent",
      <li className="register-btn">
        <a href="/register">Register</a>
      </li>,
    ],
  ]);
  navigateComponent = "";
  shownComponents = new Map();
  doctorsOptions = [];

  registered = false;
  loaded = false;
  blockedForm = false;

  constructor() {
    super();
    this.state = {
      rerenderKey: 0,
    };

    this.initDate = this.initDate.bind(this);
    this.validateLoggedIn = this.validateLoggedIn.bind(this);
    this.validateOnlyForGuests = this.validateOnlyForGuests.bind(this);
    this.handleMakeAppointment = this.handleMakeAppointment.bind(this);
  }

  initDate() {
    let tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1);
    $("#date").attr("min", tomorrow.toISOString().split("T")[0]);
  }

  validateDate(e) {
    var day = new Date(e.target.value).getUTCDay();
    if ([6, 0].includes(day)) {
      e.preventDefault();
      e.target.value = "";
      e.target.setCustomValidity("Weekends not allowed");
      e.target.reportValidity();
    } else {
      e.target.setCustomValidity("");
      e.target.reportValidity();
    }
  }

  componentDidMount() {
    if (this.loaded === false) {
      this.initDate();
      Authenticator.getLoginInfo().then((response) => {
        if (response.logged === false) {
          this.shownComponents = this.guestNavComponents;
          this.validateLoggedIn();
        } else {
          this.shownComponents = this.loggedInNavComponents;
          this.validateOnlyForGuests();
        }
        this.setState({
          rerenderKey: this.state.rerenderKey + 1,
        });
      });
    }
    this.loaded = true;
    this.onDepartmentChange({
      target: {
        value: "General Health",
      },
    });
  }

  validateLoggedIn() {
    if (this.props.authRequired) {
      this.navigateComponent = <Navigate to="/" replace={true} />;
      this.setState({
        rerenderKey: this.state.rerenderKey + 1,
      });
    }
  }

  validateOnlyForGuests() {
    if (this.props.onlyForGuests) {
      this.navigateComponent = <Navigate to="/" replace={true} />;
      this.setState({
        rerenderKey: this.state.rerenderKey + 1,
      });
    }
  }

  async onDepartmentChange(e) {
    let response = await Authenticator.getDoctorsFromDepartment(e.target.value);
    response = response.data.map((doctor) => {
      return (
        <option key={doctor.id} value={doctor.id}>
          {doctor.firstName} {doctor.lastName}
        </option>
      );
    });
    this.doctorsOptions = response;
    this.setState({
      rerenderKey: this.state.rerenderKey + 1,
    });
    console.log(this.doctorsOptions);
  }

  handleValidation(form) {
    return false;
  }

  async handleMakeAppointment(event) {
    event.preventDefault();
    console.log("making an appointment");
    if (this.blockedForm === false) {
      const form = event.target;
      const formFields = form.elements;

      if (this.handleValidation(form) === true) return;

      this.blockedForm = true;
      $(".preloader").css({ display: "opacity(1)" });
      this.setState({
        rerenderKey: this.state.rerenderKey + 1,
      });

      const appointmentData = {
        appointmentDate: new Date(formFields["date"].value),
        appointmentTime: formFields["time"].value,
        doctorId: parseInt(formFields["doctor"].value),
        userId: 1,
        reason: formFields["reason"].value,
        additionalMessage: formFields["message"].value,
      };

      const response = await Authenticator.handleMakeAppointment(
        appointmentData
      );
      console.log(response);

      $(".preloader").css({ display: "none" });
      this.blockedForm = false;
      this.registered = true;
      this.setState({
        rerenderKey: this.state.rerenderKey + 1,
      });
    }
  }

  render() {
    return (
      <div className={styles.SystemPage}>
        <section className="preloader" style={{ display: "none" }}>
          <div className="spinner">
            <span className="spinner-rotate"></span>
          </div>
        </section>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-5">
                <p>Welcome to a Professional Laboratory Service</p>
              </div>

              <div className="col-md-8 col-sm-7 text-align-right">
                <span className="phone-icon">
                  <i className="fa fa-phone"></i> 011-8728299
                </span>
                <span className="date-icon">
                  <i className="fa fa-calendar-plus-o"></i> 6:00 AM - 10:00 PM
                  (Mon-Fri)
                </span>
                <span className="email-icon">
                  <i className="fa fa-envelope-o"></i>{" "}
                  <a href="#">info@ABCcompany.com</a>
                </span>
              </div>
            </div>
          </div>
        </header>
        <section
          className="navbar navbar-default navbar-static-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <button
                className="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
                <span className="icon icon-bar"></span>
              </button>
              <a href="/" className="navbar-brand">
                <i className="fa fa-h-square"></i>ealth Center
              </a>
            </div>
            <div
              className="collapse navbar-collapse"
              key={this.state.rerenderKey}
            >
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="/" className="smoothScroll">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/#about" className="smoothScroll">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/#team" className="smoothScroll">
                    Doctors
                  </a>
                </li>
                <li>
                  <a href="/#news" className="smoothScroll">
                    News
                  </a>
                </li>
                <li>
                  <a href="/#google-map" className="smoothScroll">
                    Contact
                  </a>
                </li>
                {/* Guest part */}
                {this.shownComponents.get("loginComponent")}
                {this.shownComponents.get("registerComponent")}
                {/* Logged in part */}
                {this.shownComponents.get("profileComponent")}
                {this.shownComponents.get("appointmentComponent")}
                {this.shownComponents.get("logoutComponent")}
              </ul>
            </div>
          </div>
        </section>
        <section id="appointment" data-stellar-background-ratio="3">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <img
                  src="images/appointment-image.jpg"
                  className="img-responsive"
                  alt=""
                />
              </div>

              <div className="col-md-6 col-sm-6">
                <form
                  id="appointment-form"
                  role="form"
                  method="post"
                  onSubmit={(event) => this.handleMakeAppointment(event)}
                  style={{
                    display:
                      this.blockedForm || this.registered ? "none" : "initial",
                  }}
                >
                  <div
                    className="section-title wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <h2>Make an appointment</h2>
                  </div>

                  <div className="wow fadeInUp" data-wow-delay="0.8s">
                    <div className="col-md-6 col-sm-6">
                      <label htmlFor="date">
                        Select Date{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        defaultValue=""
                        className="form-control"
                        onInput={(e) => this.validateDate(e)}
                        required
                      />
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <label htmlFor="date">
                        Select Time{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <input
                        id="time"
                        type="time"
                        name="time"
                        defaultValue=""
                        className="form-control"
                        min="08:00"
                        max="18:00"
                        step="1800"
                        required
                      />
                      <small
                        style={{
                          marginBottom: "20px",
                          display: "inline-block",
                        }}
                      >
                        Appointment hours are 8am to 6pm
                      </small>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <label htmlFor="select">
                        Select Department{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <select
                        name="department"
                        className="form-control"
                        onChange={(e) => this.onDepartmentChange(e)}
                        required
                      >
                        <option>General Health</option>
                        <option>Cardiology</option>
                        <option>Dental</option>
                        <option>Medical Research</option>
                      </select>
                    </div>

                    <div className="col-md-6 col-sm-6">
                      <label htmlFor="select">
                        Select Doctor{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <select
                        name="doctor"
                        className="form-control"
                        key={this.state.rerenderKey}
                        required
                      >
                        {this.doctorsOptions}
                      </select>
                    </div>

                    <div className="col-md-12 col-sm-12">
                      <label htmlFor="Message">
                        Reason{" "}
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          *
                        </span>
                      </label>
                      <textarea
                        className="form-control"
                        rows="5"
                        id="reason"
                        name="reason"
                        placeholder="Reason"
                        required
                      ></textarea>
                    </div>

                    <div className="col-md-12 col-sm-12">
                      <label htmlFor="Message">Additional Message</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        id="message"
                        name="message"
                        placeholder="Message"
                      ></textarea>
                      <button
                        type="submit"
                        className="form-control"
                        id="cf-submit"
                        name="submit"
                        disabled={this.blockedForm}
                      >
                        Submit Button
                      </button>
                    </div>
                  </div>
                </form>
                <form
                  id="appointment=form"
                  role="form"
                  style={{ display: this.registered ? "initial" : "none" }}
                >
                  <div
                    className="section-title wow fadeInUp"
                    data-wow-delay="0.4s"
                  >
                    <h2>
                      Thank you for making an appointment!
                      <br />
                      <br />
                      You can now look into your Manage Account details to see
                      further details!{" "}
                    </h2>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section id="google-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.24372214923!2d79.90246161166937!3d6.8613673931085115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25be226886b9b%3A0x2d62d4a4881508c1!2sABC%20Labs!5e0!3m2!1sen!2slk!4v1709839591193!5m2!1sen!2slk"
            width="100%"
            height="350"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </section>
        <footer data-stellar-background-ratio="5">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="footer-thumb">
                  <h4 className="wow fadeInUp" data-wow-delay="0.4s">
                    Contact Info
                  </h4>
                  <p>ABC Professional Laboratory Service</p>

                  <div className="contact-info">
                    <p>
                      <i className="fa fa-phone"></i> 011-8728299
                    </p>
                    <p>
                      <i className="fa fa-envelope-o"></i>{" "}
                      <a href="#">info@ABCcompany.com</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="footer-thumb">
                  <h4 className="wow fadeInUp" data-wow-delay="0.4s">
                    Latest News
                  </h4>
                  <div className="latest-stories">
                    <div className="stories-image">
                      <a href="#">
                        <img
                          src="images/news-image.jpg"
                          className="img-responsive"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="stories-info">
                      <a href="#">
                        <h5>Amazing Technology</h5>
                      </a>
                      <span>March 08, 2024</span>
                    </div>
                  </div>

                  <div className="latest-stories">
                    <div className="stories-image">
                      <a href="#">
                        <img
                          src="images/news-image.jpg"
                          className="img-responsive"
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="stories-info">
                      <a href="#">
                        <h5>New Healing Process</h5>
                      </a>
                      <span>February 20, 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-4">
                <div className="footer-thumb">
                  <div className="opening-hours">
                    <h4 className="wow fadeInUp" data-wow-delay="0.4s">
                      Opening Hours
                    </h4>
                    <p>
                      Monday - Friday <span>06:00 AM - 10:00 PM</span>
                    </p>
                    <p>
                      Saturday <span>09:00 AM - 08:00 PM</span>
                    </p>
                    <p>
                      Sunday <span>Closed</span>
                    </p>
                  </div>

                  <ul className="social-icon">
                    <li>
                      <a
                        href="#"
                        className="fa fa-facebook-square"
                        attr="facebook icon"
                      ></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-twitter"></a>
                    </li>
                    <li>
                      <a href="#" className="fa fa-instagram"></a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-12 col-sm-12 border-top">
                <div className="col-md-4 col-sm-6">
                  <div className="copyright-text">
                    <p>
                      Copyright &copy; 2024 Your Company | Design:{" "}
                      <a
                        rel="nofollow"
                        href="https://www.facebook.com/emloxy"
                        target="_parent"
                      >
                        EmloxY
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="footer-link">
                    <a href="#">Laboratory Tests</a>
                    <a href="#">Departments</a>
                    <a href="#">Insurance Policy</a>
                    <a href="#">Careers</a>
                  </div>
                </div>
                <div className="col-md-2 col-sm-2 text-align-center">
                  <div className="angle-up-btn">
                    <a
                      href="#top"
                      className="smoothScroll wow fadeInUp"
                      data-wow-delay="1.2s"
                    >
                      <i className="fa fa-angle-up"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div key={this.state.rerenderKey}>{this.navigateComponent}</div>
      </div>
    );
  }
}

export default SystemPage;
