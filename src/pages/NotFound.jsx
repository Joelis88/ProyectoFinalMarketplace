import { Link } from "react-router-dom"
const NotFound = () => {
  return (
    <>
    <h2>Lo siento, esta ruta no existe</h2>
    <Link to="/">
    <img src="src/assets/NotFound.png" alt="carita triste" className="mx-auto d-block"  style={{ width: "32rem" }}/>
    </Link>
    </>
  )
}

export default NotFound