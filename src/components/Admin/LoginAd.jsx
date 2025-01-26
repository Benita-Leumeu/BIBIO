import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import"../../styles/Admin/loginAd.css"


const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const loginData = {
            email: email,
            password: password
        };
    
        try {
            const response = await fetch('/api/connexion_admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Rediriger selon le rôle de l'admin
                const role = data.admin.Role;
    
                switch (role) {
                    case 'préposé':
                        navigate('/dashboard/prepose');
                        break;
                    case 'bibliothécaire':
                        navigate('/dashboard/bibliothecaire');
                        break;
                    case 'gérant':
                        navigate('/dashboard/gerant');
                        break;
                    case 'comptabilité':
                        navigate('/dashboard/comptabilite');
                        break;
                    default:
                        setErrorMessage('Rôle non reconnu');
                        break;
                }
            } else {
                setErrorMessage(data.message || 'Erreur lors de la connexion');
            }
        } catch (error) {
            console.error("Erreur lors de la requête:", error);
            setErrorMessage('Une erreur interne s\'est produite lors de la connexion. Veuillez réessayer.');
        }
    };
    

    return (
        <div className="login-container">
            <h2>Connexion Administrateur</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email :</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default AdminLogin;
