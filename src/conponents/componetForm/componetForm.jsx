import './styleCompForm.css'

export const ComponentForm = ({ objDate }) => {
    return (
        Object.keys(objDate).map((info, index) =>{
        return(
          <input className="inputForm" key={{info} + index} name={info} placeholder={objDate[info]}></input>
        )
      })
      )
}

