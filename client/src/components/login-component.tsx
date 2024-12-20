import { useState, FormEvent } from 'react';
import '../styles/modal.css'
import { login } from '../services/authService';
import { UserI } from '../types/User';

interface LoginProps {
    setLoginModal: (view: boolean) => void;
    setUser: (user: UserI) => void;
 }

const RegisterComponent: React.FC<LoginProps> = ({setLoginModal, setUser}) => {
    const [message, setMessage] = useState("");
const [formData, setFormData] = useState({
    email: '',
    password: '',
});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleClose = () => {
        return setLoginModal(false);
    }
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
           const response = await login(formData);
           if (response && response.user) {
                setUser(response.user)
               setMessage('User logged in successfully!')
               setLoginModal(false)
           }
        } catch (error) {
            setMessage("Error logging in. Please try again. " + error);
        }
    };

    return (
        <>
            <div className="modal-background">

                <form className='modal-form'
                onSubmit={handleSubmit}>
                    <button className="btn" onClick={handleClose}><i className="fa fa-close"></i></button>
                    <h3>Welcome back!</h3>
                    <label htmlFor='email'>Email</label>
                        <input id='email'
                        type='text'
                        name='email'
                        onChange={handleChange}></input>
                    <label htmlFor='password'>Password</label>
                        <input id='password'
                        type='text'
                        name='password'
                        onChange={handleChange}></input>
                        <button
                        className='other-button'
                        type="submit">Submit</button>
                    {message && <p className="message">{message}</p>}
                </form>
            </div>
        </>
    )
}

export default RegisterComponent
