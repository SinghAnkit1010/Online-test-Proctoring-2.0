import '../styles/Footer.css';

const Footer = () => {
  return (
    <>
      <div className="footer">
            <p>You are invited for open source contribution <a style={{textDecoration:"underline"}} href="https://github.com/SinghAnkit1010/Online-test-Proctoring-2.0">GitHub</a></p>
      </div>
      <div className="subFooter">
          <p>
            Copyright © <span>{new Date().getFullYear()}</span>.
            All rights reserved
          </p>
      </div>
    </>
  );
};
export default Footer;
