import '../styles/Footer.css';

const Footer = () => {
  return (
    <div id="contactUs">
      <div className="footer">
        <div>
          <div>
            <h1 className="text-2xl mt-1">Let's Proctor</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing</p>
          </div>
          <div></div>
        </div>
        <div>
          <h4>Useful Links</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/#shop">Shop</a>
          <a href="/profile">Add Product</a>
        </div>
        <div>
          <h4>Follow Us</h4>
          <a href="https://www.instagram.com/_.witch3r/" target="_blank">
            <i className="ri-instagram-line text-xl"> Instagram</i>
          </a>
          <a
            href="https://www.linkedin.com/in/praveen-shankar-ba289a212/"
            target="_blank"
          >
            <i className="ri-linkedin-fill text-xl"> Linkedin</i>
          </a>
          <a href="https://github.com/SinghAnkit1010/Online-test-Proctoring-2.0" target="_blank">
            <i className="ri-github-fill text-xl"> GitHub</i>
          </a>
        </div>
        <div>
          <h4>Contact Us</h4>
          <i className="ri-map-pin-line">
            <span>
              {' '}
              IIIT Ranchi, <br />
              Science & Technology Campus <br /> Ranchi, Jharkhand 834004
            </span>
          </i>
          <a href="mailto:praveen01.ugec20@iiitranchi.ac.in">
            <i className="ri-mail-line text-xl mr-1">
              {' '}
              vivek65.ugcs20@iiitranchi.ac.in
            </i>
          </a>
          <i className="ri-phone-line text-xl mr-1"> +91-725 048 9572</i>
        </div>
      </div>
      <div className="subFooter">
        <div className="copyright">
          <p>
            Copyright © <span>{new Date().getFullYear()}</span> Proctorer.
            All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
