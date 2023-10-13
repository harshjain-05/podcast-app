import { useSelector } from "react-redux/es/hooks/useSelector"
import Header from "../components/commonComponents/Header"
import Button from "../components/commonComponents/Button"
import {auth} from "../firebase"
import { signOut } from "firebase/auth"
import { toast } from "react-toastify"
function ProfilePage(){
      const user= useSelector((state)=>(state.user.user))
      if(!user){
        return <p>Loading...</p>
      }

      function handlelogout(){
        signOut(auth).then(()=>{
             toast.success("User Signed out Successfully")
        }).catch((err)=>{
           toast.error(err.message)
        })
      }
    return(
        <div>
        <Header/>
        <div>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
            <h1>{user.uid}</h1>
            <Button text="logout" onClick={handlelogout} />
        </div>
        </div>
    )

}

export default ProfilePage