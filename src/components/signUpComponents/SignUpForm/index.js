import { useState } from "react";
import InputComponent from "../../commonComponents/Input";
import Button from "../../commonComponents/Button";
import {auth,db,storage} from "../../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
 



function SignUpForm() {
    const [fullName, setFullName]= useState("")
    const [email , setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmpassword,setConfirmPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const dispatch= useDispatch()
    const navigate=useNavigate()
    const handleSignup= async()=>{
    
        setLoading(true)
        if(password===confirmpassword && password.length>=8&&fullName&&email){
            try{
               const userCredentials= await createUserWithEmailAndPassword(auth,email,password)
                const user=userCredentials.user;
    
           
               await setDoc(doc(db,"users",user.uid),{
                   name:fullName,
                   email:user.email,
                   uid:user.uid
                })

                dispatch(setUser({
                    name:fullName,
                    email:user.email,
                    uid:user.uid
                 }))

                 toast.success("User Signed Up successfully")

                 setLoading(false)

                 navigate("/profile")

            }
            catch(err){
               console.log(err)
               toast.error(`${err}`)
               setLoading(false)

            }
        }

        else if(fullName===""||email===""||password===""||confirmpassword===""){
           toast.error("Pls make sure that all the details are filled")
        }
        else if(password.length<=8){
            toast.error("Password length must be greater than 8")
         }
         else if(password!==confirmpassword){
            toast.error("Password and Confirmed password doesnt maches ")
         }

         setLoading(false)
       
    }
    return (

        <>

            <InputComponent type="text" state={fullName} setState={setFullName} placeholder="Full Name"  />

            <InputComponent type="email " state={email} setState={setEmail} placeholder="Email"  />


            <InputComponent type="password" state={password} setState={setPassword} placeholder="Password"  />
           
            <InputComponent type="password" state={confirmpassword} setState={setConfirmPassword} placeholder="Confirm Password"  />


            <Button text={loading?"Loading...": "Sign Up"}  disabled={loading} onClick={handleSignup}></Button>
        </>



    )

}

    export default SignUpForm





















