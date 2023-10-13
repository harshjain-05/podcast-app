import React from "react";
import { useState } from "react";
import Header from "../components/commonComponents/Header";
import SignUpForm from "../components/signUpComponents/SignUpForm";
import LoginForm from "../components/signUpComponents/LoginForm";
function SignUpLoginPage() {

    const [flag, setFlag] = useState(false)

    return (
        <div>
            <Header />
            <div className="input-wrapper">
                {!flag ? <h1>SignUp</h1> : <h1>Login</h1>}
                {!flag ? <SignUpForm /> : <LoginForm/>}
                {!flag ? <p onClick={()=>{setFlag(!flag)}}>Already have an Account? Click to login</p> : <p onClick={()=>{setFlag(!flag)}}>Dont Have an have an Account? Click to SignUp</p>}
            </div>
        </div>
    )
}

export default SignUpLoginPage