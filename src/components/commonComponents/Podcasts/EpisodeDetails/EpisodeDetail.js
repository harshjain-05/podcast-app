import Button from "../../Button"

function EpiosdeDetail({title,description,audio ,onclick,index }){
   
    return(
        <div style={{width: "100%" , marginBottom:"2rem",  padding:"1rem"}}>
            <h1 style={{textAlign:"left"}}>{index}. {title}</h1>
            <p className="podcast-description" style={{marginBottom:"1rem"}}>{description}</p>
            <Button text={"Play"} onClick={()=>{onclick(audio)} }  width={"100px"}/>
        </div>
    )

}


export default EpiosdeDetail