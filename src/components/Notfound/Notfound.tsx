import './Notfound.css';
import { useNavigate } from 'react-router-dom';
const Notfound=()=>{
    const navigate = useNavigate();

    return(<div className="notfound">
        <h1>Not Found!!</h1>
        <button className='homebtn' onClick={() => navigate("/")}>Go to Form Page</button></div>);
}
export default Notfound;