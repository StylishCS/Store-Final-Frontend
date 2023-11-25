import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {Link} from "react-router-dom"
import Image from "../assets/prodImage.png"

const AddCard = ({data})=>{
    
    return(
      <Card>
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src={Image}
            alt="card-image"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2 align-text-center">
            منتج جديد
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 m-auto">
          <Link to={`/add`}><Button>أضف منتج جديد</Button></Link>
        </CardFooter>
    </Card>
    )
}

export default AddCard