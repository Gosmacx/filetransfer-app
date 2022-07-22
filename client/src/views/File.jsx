import { useState } from 'react'
import axios from 'axios'
import next from '../assets/next.svg'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function App() {

  const [file, setFile] = useState(null)
  const [size, setSize] = useState(null)
  const param = useParams()
  const navigate = useNavigate()

  const download = () => {
    axios.post("http://localhost:3030/download", { name: param.name })
      .then(() => {
        navigate("/")
      })
  }


  useEffect(() => {

    if (param) {
      axios.post("http://localhost:3030/getFile", { name: param.name })
        .then(response => {
          setFile(response.data)

          if (response.data.size.length > 6) setSize(`${Math.floor(response.data.size / 1000000)}MB`);
          else if (response.data.size.length > 5) setSize(`${Math.floor(response.data.size / 1000)}KB`);
        })
    }

  }, [param])

  return (
    <div className='w-full h-screen flex items-center justify-center' >
      {file ?
        <div className='w-96 h-96 relative flex flex-col justify-center gap-10 items-center rounded-3xl' style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} >
          <h1 className='text-lg text-white ' >{file?.name} - {size} </h1>
          {file ?
            <a onClick={download} href={`http://localhost:3030/file/${file?.path}`} target="_blank" className='text-white w-60 h-12 transition-all bg-emerald-500 flex items-center justify-center'>
              <span>Download File</span>
            </a> : false
          }

        </div> :
        <div className='w-16 h-16 rounded-full border-4 border-white border-t-black animate-spin' ></div>
      }

    </div>
  )
}

export default App