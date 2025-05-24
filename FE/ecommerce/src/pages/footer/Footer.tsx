import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import './footer.css';
const Footer = () => {
  return (
     <footer className="mt-5 pt-4 border-top bg-light text-dark">
      <div className="container">
        <div className="row text-center text-md-left align-items-center">
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-decoration-none footer-icon"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="text-decoration-none footer-icon"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-decoration-none footer-icon"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="col-md-4 mb-3 text-center text-md-start">
            <small className="text-muted d-block">© 2025 Tulip Cart</small>
            <small className="text-muted">
              All rights reserved. | Privacy Policy | Terms of Service    
              </small>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
