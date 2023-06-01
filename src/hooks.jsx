import React, { useReducer } from 'react';

const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1, showText: state.showText }
        case "toggleShowText":
            return { count: state.count, showText: !state.showText }
        default:
            return state;
    }    
}

function HooksMethod() {
     const [state, dispatch] = useReducer(reducer,{count:0,showText:true})
  return (
      <div>
          <h1>{state.count}</h1>
          <button
              onClick={() => {
                  dispatch({ type: "INCREMENT" }) 
                  dispatch({ type: "toggleShowText" }) 
              }}>save</button>
          {state.showText && <p>hai</p>}
    </div>
  )
}

export default HooksMethod