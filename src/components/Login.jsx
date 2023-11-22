import React, { useState } from 'react';
import './login.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();

        // Assuming you have an authentication API endpoint
        const apiUrl = 'https://silent257-001-site1.etempurl.com/api/Customers/Login';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Login failed with status ${response.status}`);
            }
            const userData = await response.json();
            const { storeId } = userData;
            nav('/ecommerce')
            if (storeId) {
                localStorage.setItem('storeId', storeId);
                nav('/ecommerce')
            }
        } catch (error) {
            // Handle login error
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
