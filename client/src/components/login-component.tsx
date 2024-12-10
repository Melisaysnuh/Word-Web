import '../styles/modal.css'

function LoginComponent () {




    return (
        <>
            <div className="modal-background">
                <form className="modal-form">
                    Log In
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

export default LoginComponent
