import { useState } from 'react'
import axios from 'axios'
import next from '../assets/next.svg'
import { useNavigate } from 'react-router-dom'

function App() {

  const [haveFile, setFile] = useState(false)
  const [nextStep, setStep] = useState(false)
  const [name, setName] = useState(null)
  const navigate = useNavigate()

  const upload = () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("file", haveFile)

    axios.post("http://localhost:3030/upload", formData)
      .then((response) => navigate(response.data.name))
  }

  return (
    <div className='w-full h-screen flex items-center justify-center' >
      <div className='w-96 h-96 relative flex flex-col justify-center gap-10 items-center rounded-3xl' style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(0, 0, 0, 0.65)' }} >
        <h1 className='text-lg absolute top-2 text-white ' > { nextStep ? 'Name the file for url' : 'Upload a file' } </h1>

        {nextStep ?
          <div className='h-12 w-60 relative flex items-center justify-center rounded transition-all' style={{ backgroundColor: name ? '#10b981' : '#6b7280' }} >
            <div className='text-center justify-center px-1' >
              <span>http://localhost/</span>
            </div>
            <input onInput={e => setName(e.target.value)} type="text" className='w-full h-full outline-none px-1' />
          </div> :
          <div className='relative flex items-center justify-center cursor-pointer' >
            <button className='text-white w-60 h-12 transition-all' style={{ backgroundColor: haveFile ? '#10b981' : '#6b7280' }} >
              <span >Select File</span>
            </button>
            <input onInput={(e) => setFile(e.target.files[0])} className='absolute opacity-0 cursor-pointer w-full h-full' type="file" id="file" />
          </div>
        }

        <button
          onClick={() => nextStep ? upload() : setStep(haveFile ? true : false)}
          className='text-white rounded-full w-12 h-12 flex items-center justify-center transition-all active:scale-75 bg-emerald-500'
        >
          <img src={next} width="30" />
        </button>
      </div>


    </div>
  )
}

export default App
