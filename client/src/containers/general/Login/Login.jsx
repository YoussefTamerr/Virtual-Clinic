import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import CurrUserContext from '../../../contexts/CurrUser'
const Login = () => {
    const {setUserType} = useContext(CurrUserContext)
    const navigate = useNavigate()
    const [Username, setUsername] = useState('')
    const handleLogin = (event) => {
        event.preventDefault()
        setUserType(Username)
        navigate(`/${Username}`)
    }
    const handleRegister = () => {
        navigate('/register')
    }
    return (
        <div style={{ height: '100px', textAlign: 'center', fontSize: '4rem' }}>
            <form onSubmit={handleLogin}>
                <input
                    style={{ fontSize: '2rem' }}
                    type='text'
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button style={{ fontSize: '2rem' }} type='submit'>
                    Login
                </button>
            </form>
            <button style={{ fontSize: '2rem' }} onClick={handleRegister}>
                Register
            </button>
        </div>
    )
}

export default Login