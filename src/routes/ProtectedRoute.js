import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.mhs)

    useEffect(() => {
        if (!token) {
            navigate("/")
        }
    }, [token, navigate])
    return children
}


export default ProtectedRoute