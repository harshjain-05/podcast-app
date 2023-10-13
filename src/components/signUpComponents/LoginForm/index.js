import { useState } from "react";
import InputComponent from "../../commonComponents/Input";
import Button from "../../commonComponents/Button";
import {auth,db, storage } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc,doc} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../slices/userSlice";
import { toast } from "react-toastify";





function LoginForm(){

   
    const [email , setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [loading,setLoading]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
  
    const handlelogin=async()=>{
        setLoading(true)
        if(email&&password){

            try{
                const userCredentials= await signInWithEmailAndPassword(
                    auth,
                    email,
                    password,
                )
    
               const user=userCredentials.user
               const userDoc=  await getDoc(doc(db,"users",user.uid ))
               const userData=userDoc.data()
               console.log(userData)
    
               dispatch(setUser({
                name:userData.name,
                email:userData.email,
                uid:userData.uid,
               }))

               toast.success("User logged in successfully")
               setLoading(false)
               navigate("/profile")
    
    
    
            }
            catch(err){

            toast.error(err.message)
             setLoading(false)
        }

        }

        else if(email===""||password==""){
            toast.error("All the details should be filled")
        }
        setLoading(false)
   
    }

    return (

        <>
    
          
            <InputComponent type="email " state={email} setState={setEmail} placeholder="Email" required={true} />

            <InputComponent type="password" state={password} setState={setPassword} placeholder="Password"  />

    
    
            <Button text={loading?"Loaidng...":"Login"} disabled={loading} onClick={handlelogin}></Button>
        </>
    )
}

export default LoginForm




