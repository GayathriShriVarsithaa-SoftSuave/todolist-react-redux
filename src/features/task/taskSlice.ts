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
}

const initialState: TaskState = {
  taskitems: {},
  editId: null,
};

const taskSlice = createSlice({name: "task",initialState,reducers: {
    addTask: (state,action: PayloadAction<{ id: string; task: Task }>) => {
      state.taskitems[action.payload.id] = action.payload.task;
    },

    deleteTask: (state, action: PayloadAction<string>) => {
      delete state.taskitems[action.payload];
    },

    setEditId: (state,action: PayloadAction<string | null>) => {
      state.editId = action.payload;
    },

    clearTasks: (state) => {
      state.taskitems = {};
    },
  },
});

export const {addTask,deleteTask,setEditId,clearTasks,} = taskSlice.actions;
export default taskSlice.reducer;