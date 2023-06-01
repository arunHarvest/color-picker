import React,{useRef}  from 'react'

function RefCase() {
    const inputRef = useRef(null)
    const onClick = () => {
        inputRef.current.focus()
    }
  return (
      <div>
          <input type="text" placeholder='Ex' ref={inputRef} />
          <button onClick={onClick}>Change Name</button>
    </div>
  )
}

export default RefCase