import "./Table.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setEditId,loginval } from "../../features/task/taskSlice";
import type { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";

import Editbtn from "../../assets/edit.svg";
import Deletebtn from "../../assets/delete.svg";

const Table = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();

  const { taskitems} = useSelector((state: RootState) => state.task);

  const deletetask = (id: string) => {
    return () => {
      
      dispatch(deleteTask(id));
      dispatch(setEditId(null));
    };
  };

  const backpage = () => {
    navigate("/");
    //navigate(-1);
  }
const logout=()=>{
  dispatch(loginval());
  navigate('/');
}
  return (
    <div className="tablebody">
      <div className="buttons">
      <button className="backbtn" onClick={backpage}>
        Back
      </button>
      <button className="logout" onClick={logout}>Logout</button>
</div>
      <table className="tablecls">
        <thead>
          <tr className="headrow">
            <th>Task</th>
            <th>Date and Time</th>
            <th>Status</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(taskitems).map((id) => {
            let description_txt;

            if (taskitems[id].description.length > 30) {
              description_txt =taskitems[id].description.substring(0, 30) + "...";
            } else {
              description_txt = taskitems[id].description;
            }

            return (
              <tr key={id}>
                <td>{taskitems[id].taskname}</td>

                <td>{taskitems[id].date} {taskitems[id].time}</td>

                <td className={taskitems[id].status}>{taskitems[id].status}</td>

                <td className="tooltip">{description_txt}
                  <span className="tooltiptext">{taskitems[id].description}</span>
                </td>

                <td>
                  <button className="editbtn"onClick={() => {dispatch(setEditId(id));navigate("/");}}>
                    <img src={Editbtn} alt="edit"
                      style={{height: "20px",width: "20px"}}
                    />
                  </button>
                 
                  <button className="deletebtn" onClick={deletetask(id)}>
                    <img src={Deletebtn} alt="delete"
                      style={{height: "20px",width: "20px"}}
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
