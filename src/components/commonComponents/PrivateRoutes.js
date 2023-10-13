import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../firebase"
import { Outlet, Navigate } from "react-router-dom"

function PrivateRoutes(){
const [user,loading,error]=useAuthState(auth)

if(loading){

    return <p>Loaidng.....</p>
}

else if(!user||error){
    return <Navigate to ="/" replace/>
}
 else{
     return <Outlet/>
 }

}

export default PrivateRoutes