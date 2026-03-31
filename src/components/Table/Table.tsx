import "./Table.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setEditId } from "../../features/task/taskSlice";
import type { RootState } from "../../app/store";

import Editbtn from "../../assets/edit.svg";
import Deletebtn from "../../assets/delete.svg";

const Table = () => {
  const dispatch = useDispatch();

  const { taskitems, editId } = useSelector((state: RootState) => state.task);

  const deletetask = (id: string) => {
    return () => {
      localStorage.removeItem(id);
      dispatch(deleteTask(id));
      dispatch(setEditId(null));
    };
  };

  useEffect(() => {
    if (editId) {
      console.log("edit clicked for " + localStorage.getItem(editId));

      const task = taskitems[editId];

      if (task) {
        (document.getElementById("taskname") as HTMLInputElement).value =task.taskname;

        (document.getElementById("date") as HTMLInputElement).value = task.date;

        (document.getElementById("time") as HTMLInputElement).value = task.time;

        (document.getElementById("status") as HTMLSelectElement).value =task.status;

        (document.getElementById("description") as HTMLTextAreaElement).value =task.description;
      }
    }
  }, [editId, taskitems]);

  return (
    <div className="tablebody">
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
                  <button className="editbtn"onClick={() => dispatch(setEditId(id))}>
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
