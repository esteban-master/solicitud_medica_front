import { useAuth } from "../../state/context/auth"


const Admin = () => {
  const auth =  useAuth()
  return (
    <div>
      <button onClick={() => {
        auth.signUp({ email: 'correo1@gmail.com', password: 'esteban' })
      }}>Crear</button>
    </div>
  )
}

export default Admin