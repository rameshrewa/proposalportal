import React from "react";

const RadioField = ({radioFields}) => {  
    
    return(
        <>
            {radioFields.map((list, index) => {

                return(
                    <div className="col" key={index}>                        
                        <div className="form-group">   
                            <div className="Inputgender">
                                <input
                                    type="radio"
                                    className="form-control"
                                    name={list.value}
                                    value={list.name}
                                /> {list.name}
                            </div>  
                        </div>            
                    </div>
                )
            })}    
        </>
    )
}

export default RadioField;