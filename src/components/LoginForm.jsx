import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);

            // Check if email is verified
            if (!auth.currentUser.emailVerified) {
                setError('Please verify your email before logging in.');
                await signOut(auth);
                setIsLoading(false);
                return;
            }

            // Redirect to home page if verified
            window.location.href = "/home";
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="main">
            <div className="container a-container">
                <div className="form">
                    <div className="title">Welcome Back</div>
                    <div className="description">Sign in to your account to continue</div>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            className="form__input"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            className="form__input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="button" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                        {error && <div className="error">{error}</div>}
                    </form>
                    <div className="navigation-link">
                        Don't have an account? <a href="/signup">Sign up</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;