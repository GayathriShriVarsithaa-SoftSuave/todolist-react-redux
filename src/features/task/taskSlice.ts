import  { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type Task = {
  taskname: string;
  date: string;
  time: string;
  status: string;
  description: string;
};

type TaskMap = {
  [key: string]: Task;
};

interface TaskState {
  taskitems: TaskMap;
  editId: string | null;
  login:boolean;
}
const existingTask: TaskMap = {};
Object.keys(localStorage).map((key)=>{
    existingTask[key] = JSON.parse(localStorage.getItem(key) || "{}");
});
const existingLogin: boolean = sessionStorage.getItem("loginvalue") === "true";

const initialState: TaskState = {
  taskitems: existingTask,
  editId: null,
  login:existingLogin}
 
const taskSlice = createSlice({name: "task",initialState,reducers: {
    addTask: (state,action:PayloadAction<{ id: string; task: Task }>) => {
      state.taskitems[action.payload.id] = action.payload.task;
    },

    deleteTask: (state, action:PayloadAction<string>) => {
      delete state.taskitems[action.payload];
    },

    setEditId: (state,action:PayloadAction<string | null>) => {
      state.editId = action.payload;  
    },

    clearTasks: (state) => {
      state.taskitems = {};
    },

    loginval:(state) => {
      sessionStorage.setItem("loginvalue",(!state.login).toString());
      state.login=!(state.login);
    }
  },
});

export const {addTask,deleteTask,setEditId,clearTasks,loginval} = taskSlice.actions;
export default taskSlice.reducer;