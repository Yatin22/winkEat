import React, {useState} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import "../../src/styles/VendorLogin.css";

const VendorLogin = () => {

    const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [allEntry, setAllEntry] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    const newEntry = { phone: phone, password: password };
    setAllEntry([...allEntry, newEntry]);
  };

  return (
    <>
      <div className="content-box-vendor">
        <div className="logo-box">
          <img
            className="form-img-vendor"
            src="/images/mini-img3.png"
            alt="not available"
          />
        </div>
        <div className="form-box-vendor">
          <div className="form-nav-vendor">
            <div className="arrow-icon">
              <Link to="/">
                <ArrowBackIcon className="arrow" />
              </Link>
            </div>
            <div>
              <img
                className="winkeat-logo-form-vendor"
                src="/images/winkeat-logo2.png"
                alt="not available"
              />
            </div>
          </div>

          <form action="" onSubmit={submitForm}>
            <div className="input-form-vendor">
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="input-form-vendor">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="submit-btn-vendor" type="submit">
              Sign In
            </button>
          </form>

          <div className="form-footer-vendor">
            <div className="footer-top">
              <span>
                <Link>Forgot Your Password?</Link>
              </span>
              <br />
              <span>
                <Link>Contact Us</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorLogin;
