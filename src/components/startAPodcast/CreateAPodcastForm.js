import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import InputComponent from "../commonComponents/Input"
import Button from "../commonComponents/Button"
import { toast } from "react-toastify"
import FileInput from "../commonComponents/Input/FileInput"
import {storage,auth,db} from "../../firebase"
import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { addDoc ,collection } from "firebase/firestore"



function CreateAPodacstForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [bannerImage, setBannerImage] = useState(null)
    const [displayImage, setDisplayImage] = useState(null)
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit=async ()=>{
        setLoading(true)
        if(title&&description&&displayImage&&bannerImage){

            try{
                const bannerImageRef = ref(storage, `/podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(bannerImageRef, bannerImage)
                const bannerImageUrl= await getDownloadURL(bannerImageRef)

                const displayImageRef = ref(storage, `/podcasts/${auth.currentUser.uid}/${Date.now()}`);
                await uploadBytes(displayImageRef, bannerImage)
                const displayImageImageUrl= await getDownloadURL(bannerImageRef)
               
                const podcastData={
                    title:title,
                    description:description,
                    bannerImage:bannerImageUrl,
                    displayImage:displayImageImageUrl,
                    createdBy:auth.currentUser.uid,
                }
               

                const docRef= await addDoc(collection(db,"podcasts"),podcastData)
                setTitle("")
                setBannerImage("")
                setDisplayImage("")
                setDescription("")
                toast.success("Podcast created Successfully")
                setLoading(false)

            }

            catch(err){
                toast.error(err.message)
                setLoading(false)
            }
            
        }
        else{
            toast.error("Please fill all the fields")
            setLoading(false)
        }
    }

    function bannerImageHandleFn(file){
        setBannerImage(file)
    }

    function displayImageHandleFn(file){
         setDisplayImage(file)
    }

    return (
        <>

            <InputComponent type="text" state={title} setState={setTitle} placeholder="Title" />

            <InputComponent type="text" state={description} setState={setDescription} placeholder="Description" />

            <FileInput accept={"image/*"} id="banner-image" fileHandleFn={bannerImageHandleFn} text="Upload Banner Image"/>

            <FileInput accept={"image/*"} id="display-image" fileHandleFn={displayImageHandleFn} text="Upload Display Image"/>

            <Button text={loading?"Loading...": "Create Podcast"}  disabled={loading} onClick={handleSubmit}></Button>



        </>
    )

}

export default CreateAPodacstForm