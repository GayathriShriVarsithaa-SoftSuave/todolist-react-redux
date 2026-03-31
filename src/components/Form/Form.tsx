import "./Form.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setEditId, clearTasks } from "../../features/task/taskSlice";
import type { RootState } from "../../app/store";

// type alias
type mystr = string;

// interfaces
interface Task {
  taskname: mystr;
  date: string;
  time: string;
  status: string;
  description: string;
}

const Form = () => {
  const dispatch = useDispatch();

  const { taskitems, editId } = useSelector((state: RootState) => state.task);

  useEffect(() => {
    const form = document.getElementsByClassName("formcls",)[0] as HTMLFormElement;
    form.reset();
    const statusSelect = document.getElementById("status") as HTMLSelectElement;
    statusSelect.value = "Select";
  }, [taskitems]);

  const clear = () => {
    localStorage.clear();
    dispatch(clearTasks());
  };

  const savetask = (e: React.FormEvent) => {
    e.preventDefault();

    const taskname = (document.getElementById("taskname") as HTMLInputElement).value;

    const date = (document.getElementById("date") as HTMLInputElement).value;

    const time = (document.getElementById("time") as HTMLInputElement).value;

    const status = (document.getElementById("status") as HTMLSelectElement).value;

    const description = (document.getElementById("description") as HTMLTextAreaElement).value;

    if (!taskname || !date || !time || status === "Select") {
      alert("Please fill all the fields");
      return;
    }

    const taskdate = new Date(date + "T" + time);
    const currentdate = new Date();

    if (taskdate < currentdate && status !== "completed") {
      alert("Please select a future date and time");
      return;
    }

    let id: string;

    if (editId == null) {
      id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0;
          const v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        },
      );
    } 
    else {
      id = editId;
    }

    const newtask: Task = {
      taskname,
      date,
      time,
      status,
      description,
    };

    localStorage.setItem(id, JSON.stringify(newtask));

    dispatch(addTask({ id, task: newtask }));
    dispatch(setEditId(null));
  };

  return (
   <div className="formbody">
    <p className="form-title">Add Task</p>

    <form className="formcls" onSubmit={savetask}>
      <label htmlFor="taskname">Task:</label>
      <input type="text" id="taskname" placeholder="Add task" />
      <br />

      <label htmlFor="date">Date:</label>
      <input type="date" id="date" />
      <br />

      <label htmlFor="time">Time:</label>
      <input type="time" id="time" />
      <br />

      <label htmlFor="status">Status:</label>
      <select id="status">
        <option value="Select" disabled>Select</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br />

      <label htmlFor="description">Description:</label>
      <textarea id="description" placeholder="Add description.." />
      <br />
    </form>
      <button  className="savebtn" onClick={savetask}>
        Save
      </button>

      <button  className="clearbtn" onClick={clear}>
        Clear all
      </button>
      
   
    </div>
  );
};

export default Form;
