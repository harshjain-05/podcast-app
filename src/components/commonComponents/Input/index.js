import "./style.css"

function InputComponent({type, state, placeholder, setState , required}){
     return(
        <input type={type} value={state} placeholder={placeholder} onChange={(e)=>{setState(e.target.value)}} required={required} className="custom-input"/>
     )
}

export default InputComponent