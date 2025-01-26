import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import NavbarAcceuil from '../components/NavbarAcceuil'
// import { loginAdmin, get_nb_command, get_nb_book, get_nb_Users, get_nb_Emprunt } from '../Controllers/ControllAdmin'
 import { loginUser } from '../controllers/Controller_user'
import '../styles/Register.css'
// import Footer from '../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faGitlab, faLinkedin } from '@fortawesome/free-brands-svg-icons';
function LoginUser() {
    const [role, setRole] = useState('user'); // Par défaut, c'est un utilisateur
    // const id_admin = sessionStorage.getItem('id_Admin')
    const id_user = sessionStorage.getItem('id_user')
    const handleRoleChange = (selectedRole, event) => {
        event.preventDefault()
        setRole(selectedRole);
    };
    const navigate = useNavigate();
    //creation d'un usestate pour chaque attribut d'un user
    const [email, setemail] = useState('')
    const [pswd, setpswd] = useState('')
    const [matricule, setmatricule] = useState('')
    const [msg, setmsg] = useState('')
    const [loading, setLoading] = useState(false); // Ajout du state pour le chargement
    //fonction qui permet de modifier la valeur du email
    const emailchange = (e) => {
        setemail(e.target.value)
    }
    //fonction qui permet de modifier la valeur du mot de passe
    const pswdchange = (e) => {
        setpswd(e.target.value)
    }
    const matriculechange = (e) => {
        setmatricule(e.target.value)
    }
    const login = async (e) => {
        try {
            e.preventDefault()
 
 
            // ... (Votre code de connexion)
 
 
 
            if (role === "user") {
                if (email === "") return setmsg("email invalid"), setLoading(false); // Arrêter le chargemen
                if (pswd === "") return setmsg("mot de passe invalid"), setLoading(false); // Arrêter le chargemen
                const response = await loginUser(email, pswd)
                if (response === true) {
                    setLoading(true); // Déclencher le chargement
                    setTimeout(async () => {
                        await nb_command()
                        await getall_nb_emprunt_User()
                        navigate(`/user/dashb/:${id_user}`)
                        setLoading(false); // Arrêter le chargemen
                        return
                    }, 2000);
                }
                else {
                    setmsg('email ou mot de passe invalid');//message d'erreur en cas de bad authentification
                }
            }
            if (role === "admin") {
                if (pswd === "") return setmsg("mot de passe invalid"), setLoading(false); // Arrêter le chargemen
                if (matricule === "") return setmsg("matricule invalid"), setLoading(false); // Arrêter le chargemen
                const response = await loginAdmin(matricule, pswd)
                if (response === true) {
                    setLoading(true); // Déclencher le chargement
                    setTimeout(async () => {
                        await get_nb_command()
                        await get_nb_book()
                        await get_nb_Users()
                        await get_nb_Emprunt()
                        navigate(`/Admin/dashb/:${id_admin}`)
                        setLoading(false); // Arrêter le chargemen
                        return
                    }, 2000);
                } else {
                    setmsg('matricule ou mot de passe invalid');//message d'erreur en cas de bad authentification
                }
            }
 
 
        } catch (error) {
            setmsg('invalid informations');//message d'erreur en cas de bad authentification
        }
    }
    return (
        <div className='bodyRegister'>
            <header className="header">
 
                <h1>Bibliotèque en Ligne</h1>
                <nav className="navigation">
                    <ul className="nav-list">
                        <li><a href="/">Acceuil</a></li>
                        <li><a href="/login">Se Connecter</a></li>
                        <li><a href="#testimonials">Contact</a></li>
                        <li><a href="#contact">À Propos</a></li>
                    </ul>
                </nav>
            </header>
            <br></br>
            <br></br>
            <br></br>
            <div className="container">
                <div className="register-form" style={{ width: '800px', margin: 'auto' }}>
                    <form >
                        <h1>Login.</h1>
                        <h2 style={{ color: '#F61304 ', fontSize: '15px' }}>{msg}</h2>
                        <div className="role-selector">
                            <button
                                className={`role-button ${role === 'user' ? 'selected' : ''}`}
                                onClick={(e) => handleRoleChange('user', e)}
                            >
                                Utilisateur
                            </button>
                            <button
                                className={`role-button ${role === 'admin' ? 'selected' : ''}`}
                                onClick={(e) => handleRoleChange('admin', e)}
                            >
                                Bibliotécaire
                            </button>
                        </div>
                        {/* Afficher les champs en fonction du rôle sélectionné */}
                        {role === 'user' && (
                            <>
                                <label style={{ marginBottom: '5px', display: 'block' }} htmlFor="email">Email</label>
                                <input type="email" onChange={emailchange} />
                            </>
                        )}
                        {role === 'admin' && (
                            <>
                                <label style={{ marginBottom: '5px', display: 'block' }} htmlFor="matricule">Matricule</label>
                                <input type="text" onChange={matriculechange} />
                            </>
                        )}
                        <label style={{ marginBottom: '5px', display: 'block' }} htmlFor="password">Mot de passe</label>
                        <input type="password" onChange={pswdchange} /><br></br>
                        <a class="btn btn-primary" onClick={login} style={{ marginLeft: '80px', width: '300px', marginTop: '5px', borderRadius: '10px' }} disabled={loading}> {loading ? (
                            // Afficher le spinner pendant le chargement
                            <div>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                &nbsp; Connexion...
                            </div>
                        ) : (
                            // Afficher le texte normal quand il n'y a pas de chargement
                            'Se Connecter'
                        )}</a>
                        &nbsp; &nbsp;
                        <a href='/register' style={{ textDecoration: 'none' }}>S'inscrire?</a>
                    </form>
                </div>
 
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <footer className="footer">
                <FontAwesomeIcon icon={faInstagram} style={{ color: '#E4405F', fontSize: '30px', marginRight: '20px' }} />
                <a href='https://gitlab.com/henrikondjo/'><FontAwesomeIcon icon={faGitlab} style={{ color: '#FCA326', fontSize: '30px', marginRight: '20px' }} /></a>
                <a href='https://www.linkedin.com/in/henri-kondjo'><FontAwesomeIcon icon={faLinkedin} style={{ color: '#0077B5', fontSize: '30px', marginRight: '20px' }} /></a>
                <FontAwesomeIcon icon={faFacebook} style={{ color: '#3b5998', fontSize: '30px', marginRight: '20px' }} />
                <FontAwesomeIcon icon={faTwitter} style={{ color: '#1da1f2', fontSize: '30px', marginRight: '20px' }} />
                <p>Droits d'auteur &copy; {new Date().getFullYear()}</p>
                <ul>
                    <li><a href="/">Accueil</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </footer>
        </div>
    )
}
 
export default LoginUser