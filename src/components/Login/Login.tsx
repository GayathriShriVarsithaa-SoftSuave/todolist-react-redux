import './Login.css';
import {loginval} from "../../features/task/taskSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Login=()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login_success=()=>{
        dispatch(loginval());
        navigate('/form');
    }
    return(
        <div>
            <button onClick={login_success} className='loginbtn'>Login</button>
        </div>
    );
}
export default Login;   