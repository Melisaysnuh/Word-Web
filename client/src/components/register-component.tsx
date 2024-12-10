import { useState, FormEvent } from 'react';
import '../styles/modal.css'
import { register } from '../services/authService';

interface RegisterProps {
    setRegisterModal: (view: boolean) => void
 }

const RegisterComponent: React.FC<RegisterProps> = ({setRegisterModal}) => {
    const [message, setMessage] = useState("");
const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const password = formData.password;
        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        try {
           await register(formData);
            setRegisterModal(false)
        } catch (error) {
            setMessage("Error registering. Please try again. " + error);
        }
    };

    return (
        <>
            <div className="modal-background">
                <form className='modal-form'
                onSubmit={handleSubmit}>
                    <h3>Register</h3>
                    <label htmlFor='first-name'>First Name (Optional)</label>
                        <input id='first-name'
                        type='text'
                        name='firstName'
                        onChange={handleChange}></input>
                    <label htmlFor='email'>Email</label>
                        <input id='email'
                        type='email'
                        name='email'
                        onChange={handleChange}></input>
                    <label htmlFor='password'>Password</label>
                        <input id='password'
                        type='password'
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
