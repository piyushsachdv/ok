import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
  sendEmailVerification,
  signOut
} from 'firebase/auth';
import { validatePassword } from './PasswordValidation';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setEmailError('');
    setError('');
    
    if (!fullName || !email) {
      setEmailError('Please enter full name and email.');
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must have at least 1 capital letter, 1 symbol, 1 number, and be at least 8 characters.');
      return;
    }
    if (password !== rePassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        setEmailError('Email already exists');
        setLoading(false);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
      await sendEmailVerification(userCredential.user);
      setVerificationSent(true);
      setError('');
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="main">
      <div className="container a-container">
        <div className="form">
          <div className="title">Create Account</div>
          <div className="description">Join us today! Create your account to get started.</div>
          {!verificationSent ? (
            <form onSubmit={handleSignup}>
              <input
                type="text"
                className="form__input"
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form__input"
                placeholder="Email"
                value={email}
                onChange={e => { setEmail(e.target.value); setEmailError(''); }}
                required
              />
              {emailError && <div className="error">{emailError}</div>}
              <input
                type="password"
                className="form__input"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="form__input"
                placeholder="Confirm Password"
                value={rePassword}
                onChange={e => setRePassword(e.target.value)}
                required
              />
              <button type="submit" className="button" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
              {error && <div className="error">{error}</div>}
              <div className="navigation-link">
                Already have an account? <a href="/login">Login</a>
              </div>
            </form>
          ) : (
            <div>
              <div className="success">
                Verification email sent! Please check your inbox and click the link to verify your email before logging in.
              </div>
              <div className="navigation-link">
                Already have an account? <a href="/login">Login</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupForm;