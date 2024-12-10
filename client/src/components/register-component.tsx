import '../styles/modal.css'

function RegisterComponent () {




    return (
        <>
            <div className="modal-background">
                <form className='modal-form'>
                    Register
                    <label htmlFor='first-name'>First Name (Optional)</label>
                        <input id='first-name'></input>
                    <label htmlFor='email'>Email</label>
                        <input id='email'></input>
                    <label htmlFor='password'>Password</label>
                        <input id='password'></input>
                        <button>Submit</button>
                </form>
            </div>
        </>
    )
}

export default RegisterComponent
