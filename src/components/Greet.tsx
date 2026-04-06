import { useParams } from "react-router-dom";
const Greet = () => {
    const { name } = useParams();
    return(<div> 
        <h1>Hello {name}!</h1>
    </div>)
}
export default Greet;