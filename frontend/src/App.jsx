import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/data/')
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>Backend Status: {data ? data.status : 'Loading...'}</h1>
    </div>
  )
}