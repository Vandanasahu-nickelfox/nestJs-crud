import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>

      <form action="">
        <label name="name" id="name">
          <input type="text" name="name" id="name" placeholder='Username' />
        </label>

        <label name="email" id="email">
          <input type="text" name="email" id="email" placeholder='Email' />
        </label>

        <label name="password" id="password">
          <input type="text" name="password" id="password" placeholder='Password' />
        </label>

        <button type="submit">Submit</button>
      </form>
      </div>
    </>
  )

}

export default App
