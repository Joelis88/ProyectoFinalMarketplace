import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { useState } from 'react'




const CardProducto = () => {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => setLiked(!liked)
  
  return (
    <> 
      <div className="card-container" style={{ position: 'relative', width: '18rem' }}>
       <div className="heart-icon" onClick={toggleLike}>
        <i className={`fa${liked ? 's' : 'r'} fa-heart`}></i>
      </div>
     <Card>
      <Card.Img variant="top" src="https://cl-dam-resizer.ecomm.cencosud.com/unsafe/adaptive-fit-in/640x0/filters:quality(75)/cl/paris/798066/variant/6842f169c87db81cfd0183ed/images/4f528dc8-1ed5-487f-9c4e-cd0c1fc211e9/798066-0401-001.jpg" />
      <Card.Body>
        <Card.Title>$Precio</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the carrds content.
        </Card.Text>
           <ListGroup className="list-group-flush">
             <ListGroup.Item>Estado</ListGroup.Item>
           </ListGroup>
        <div className="d-flex justify-content-center mt-3">
      <Button variant="outline-danger" className="rounded-pill px-4 shadow-sm">
        Contactar
      </Button>
    </div>
      </Card.Body>
    </Card>
     </div>
    </>
  )
}

export default CardProducto