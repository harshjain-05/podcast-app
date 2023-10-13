import "./style.css"
import { useState } from "react"

function FileInput({accept , id , fileHandleFn, text}){

    const [fileSelected,setFileSelected]=useState("")
    
    const uploadFile=(e)=>{
        setFileSelected(e.target.files[0].name)
        fileHandleFn(e.target.files[0])
    }

    return(
        <>
          <label htmlFor={id} className={`custom-input ${!fileSelected ? "lable-input":"active"} `} >{fileSelected?`${fileSelected}`:text}</label>
          <input type="file" accept={accept} id={id} style={{display:"none"}} onChange={uploadFile}  />
        </>
    )



}


export default FileInput