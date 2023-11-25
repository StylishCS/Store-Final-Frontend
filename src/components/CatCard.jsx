import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {Link} from "react-router-dom"


const CatCard = ({data})=>{
    return(
      <Card>
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 align-text-center">
            {data}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 m-auto">
          <Link to={`/products/${data}`}><Button>المنتجات</Button></Link>
        </CardFooter>
    </Card>
    )
}

export default CatCard