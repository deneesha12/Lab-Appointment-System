import React from "react";
import styles from "./HomePage.module.css";
import { Navigate } from "react-router-dom";

import Authenticator from "../../controllers/Authenticator/Authenticator";

class HomePage extends React.Component {
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

  loaded = false;

  constructor() {
    super();
    this.state = {
      rerenderKey: 0,
    };

    this.validateLoggedIn = this.validateLoggedIn.bind(this);
    this.validateOnlyForGuests = this.validateOnlyForGuests.bind(this);
  }

  componentDidMount() {
    if (this.loaded === false) {
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

  render() {
    return (
      <div className={styles.HomePage}>
        <section className="preloader" style={{ display: "none" }}>
          <div className="spinner">
            <span className="spinner-rotate"></span>
          </div>
        </section>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-5">
                <p>
                  Welcome to ABC Laboratories' online Lab Appointment System
                </p>
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
                  <a href="#">info@company.com</a>
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
                ABC LAB
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
                  <a href="#about" className="smoothScroll">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#team" className="smoothScroll">
                    Doctors
                  </a>
                </li>
                <li>
                  <a href="#news" className="smoothScroll">
                    News
                  </a>
                </li>
                <li>
                  <a href="#google-map" className="smoothScroll">
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
        <section
          id="home"
          className="slider"
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row">
              <div className="owl-carousel owl-theme">
                <div className="item item-first">
                  <div className="caption">
                    <div className="col-md-offset-1 col-md-10">
                      <h3>Let's make your life happier</h3>
                      <h1>Healthy Living</h1>
                      <a
                        href="#team"
                        className="section-btn btn btn-default smoothScroll"
                      >
                        Meet Our Doctors
                      </a>
                    </div>
                  </div>
                </div>

                <div className="item item-second">
                  <div className="caption">
                    <div className="col-md-offset-1 col-md-10">
                      <h3>Aenean luctus lobortis tellus</h3>
                      <h1>New Lifestyle</h1>
                      <a
                        href="#about"
                        className="section-btn btn btn-default btn-gray smoothScroll"
                      >
                        More About Us
                      </a>
                    </div>
                  </div>
                </div>

                <div className="item item-third">
                  <div className="caption">
                    <div className="col-md-offset-1 col-md-10">
                      <h3>Pellentesque nec libero nisi</h3>
                      <h1>Your Health Benefits</h1>
                      <a
                        href="#news"
                        className="section-btn btn btn-default btn-blue smoothScroll"
                      >
                        Read Stories
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="about-info">
                  <h2 className="wow fadeInUp" data-wow-delay="0.6s">
                    Welcome to Your ABC Laboratories' Online Lab Appointment
                    System
                  </h2>
                  <div className="wow fadeInUp" data-wow-delay="0.8s">
                    <p>
                      Welcome to ABC Laboratories' Lab Appointment System, where
                      ease meets efficiency. Register and receive a unique ID
                      for seamless appointment scheduling. Enjoy hassle-free
                      navigation and personalized service for all your medical
                      test requirements.
                    </p>
                    <p>
                      Our system ensures secure payment options and instant
                      access to your test reports. With user-friendly
                      interfaces, managing your health diagnostics has never
                      been easier. Trust us for a smooth and reliable experience
                      every step of the way.
                    </p>
                  </div>
                  <figure className="profile wow fadeInUp" data-wow-delay="1s">
                    <img
                      src="images/author-image.jpg"
                      className="img-responsive"
                      alt=""
                    />
                    <figcaption>
                      <h3>Dr. Akila Bandara</h3>
                      <p>General Principal</p>
                    </figcaption>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="team" data-stellar-background-ratio="1">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="about-info">
                  <h2 className="wow fadeInUp" data-wow-delay="0.1s">
                    Our Doctors
                  </h2>
                </div>
              </div>

              <div className="clearfix"></div>

              <div className="col-md-4 col-sm-6">
                <div className="team-thumb wow fadeInUp" data-wow-delay="0.2s">
                  <img
                    src="images/team-image1.jpg"
                    className="img-responsive"
                    alt=""
                  />

                  <div className="team-info">
                    <h3>Dr.Nihal Jayasekara</h3>
                    <p>General Lab Principal</p>
                    <div className="team-contact-info">
                      <p>
                        <i className="fa fa-phone"></i> 011-3729222
                      </p>
                      <p>
                        <i className="fa fa-envelope-o"></i>{" "}
                        <a href="#">general@company.com</a>
                      </p>
                    </div>
                    <ul className="social-icon">
                      <li>
                        <a href="#" className="fa fa-linkedin-square"></a>
                      </li>
                      <li>
                        <a href="#" className="fa fa-envelope-o"></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="team-thumb wow fadeInUp" data-wow-delay="0.4s">
                  <img
                    src="images/team-image2.jpg"
                    className="img-responsive"
                    alt=""
                  />

                  <div className="team-info">
                    <h3>Dr. Ruwanthi Silva</h3>
                    <p>Pregnancy</p>
                    <div className="team-contact-info">
                      <p>
                        <i className="fa fa-phone"></i> 011-2132321
                      </p>
                      <p>
                        <i className="fa fa-envelope-o"></i>{" "}
                        <a href="#">pregnancy@company.com</a>
                      </p>
                    </div>
                    <ul className="social-icon">
                      <li>
                        <a href="#" className="fa fa-facebook-square"></a>
                      </li>
                      <li>
                        <a href="#" className="fa fa-envelope-o"></a>
                      </li>
                      <li>
                        <a href="#" className="fa fa-flickr"></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="team-thumb wow fadeInUp" data-wow-delay="0.6s">
                  <img
                    src="images/team-image3.jpg"
                    className="img-responsive"
                    alt=""
                  />

                  <div className="team-info">
                    <h3>Dr.Chamari Korala</h3>
                    <p>Cardiology</p>
                    <div className="team-contact-info">
                      <p>
                        <i className="fa fa-phone"></i> 011-8728299
                      </p>
                      <p>
                        <i className="fa fa-envelope-o"></i>{" "}
                        <a href="#">cardio@company.com</a>
                      </p>
                    </div>
                    <ul className="social-icon">
                      <li>
                        <a href="#" className="fa fa-twitter"></a>
                      </li>
                      <li>
                        <a href="#" className="fa fa-envelope-o"></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="news" data-stellar-background-ratio="2.5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div
                  className="section-title wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <h2>Latest News</h2>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="news-thumb wow fadeInUp" data-wow-delay="0.4s">
                  <a href="news-detail.html">
                    <img
                      src="images/news-image1.jpg"
                      className="img-responsive"
                      alt=""
                    />
                  </a>
                  <div className="news-info">
                    <span>March 08, 2024</span>
                    <h3>
                      <a href="news-detail.html">About Amazing Technology</a>
                    </h3>
                    <p>
                      Intordce to new latest amazing Technology for ABC Labs.
                    </p>
                    <div className="author">
                      <img
                        src="images/author-image.jpg"
                        className="img-responsive"
                        alt=""
                      />
                      <div className="author-info">
                        <h5>Mr.Harin Perera</h5>
                        <p>CEO / Founder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="news-thumb wow fadeInUp" data-wow-delay="0.6s">
                  <a href="news-detail.html">
                    <img
                      src="images/news-image2.jpg"
                      className="img-responsive"
                      alt=""
                    />
                  </a>
                  <div className="news-info">
                    <span>February 20, 2024</span>
                    <h3>
                      <a href="news-detail.html">
                        Introducing a new healing process
                      </a>
                    </h3>
                    <p>
                      Intordce to new latest amazing healing process for ABC
                      Labs.
                    </p>
                    <div className="author">
                      <img
                        src="images/author-image.jpg"
                        className="img-responsive"
                        alt=""
                      />
                      <div className="author-info">
                        <h5>Mr.Sunil Narayana</h5>
                        <p>General Director</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="news-thumb wow fadeInUp" data-wow-delay="0.8s">
                  <a href="news-detail.html">
                    <img
                      src="images/news-image3.jpg"
                      className="img-responsive"
                      alt=""
                    />
                  </a>
                  <div className="news-info">
                    <span>January 27, 2024</span>
                    <h3>
                      <a href="news-detail.html">
                        Review Annual Medical Research in Our Labs
                      </a>
                    </h3>
                    <p>
                      Intordce to Review Annual Medical Research in Our Labs
                    </p>
                    <div className="author">
                      <img
                        src="images/author-image.jpg"
                        className="img-responsive"
                        alt=""
                      />
                      <div className="author-info">
                        <h5>Mr.Akil Karunanayaka</h5>
                        <p>Lab Director</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                  <p>ABC Laboratories</p>

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
                        href="https://www.facebook.com/EmloxY"
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

export default HomePage;
