import "./App.css";
//import Form from "./components/Form/Form";
import {Route,Routes} from "react-router-dom";
//import Table from "./components/Table/Table";
//import Notfound from "./components/Notfound/Notfound";
import { lazy,Suspense } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Greet from "./components/Greet";
const LazyForm = lazy(() => import("./components/Form/Form"));
const LazyTable = lazy(() => import("./components/Table/Table"));
const Notfound = lazy(() => import("./components/Notfound/Notfound"));
const Login = lazy(() => import("./components/Login/Login"));
function App() {
  const {login } = useSelector((state: RootState) => state.task);
  return (
    // <div className="appbody">
    //   {/* <Form/> */}
    //   <Routes>
    //     <Route path="/" element={<Form />} />
    //     <Route path="/table" element={<Table/>}/>
    //     {/* fallback route - non existing routes */}
    //     <Route path="*" element={<Notfound/>} />  
    //   </Routes>
    //   {/* <Table/> */}
    // </div>

    // <div>
    //   <Suspense fallback={<div className="load"><h1>Loading...</h1></div>}>
    //     <Routes>
    //       <Route path="/" element={login ? <LazyForm /> : <Login />} />
    //       <Route path="/form" element={login ? <LazyForm /> : <Login />} />
    //       <Route path="/table" element={login ? <LazyTable /> : <Login />} />
    //       <Route path="*" element={<Notfound />} />
    //     </Routes>
    //   </Suspense>
    // </div>
    <div>
      <Suspense fallback={<div className="load"><h1>Loading...</h1></div>}>
      <Routes>
        <Route path="/login" element={login ? <LazyForm /> : <Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LazyForm />} />
          <Route path="/form" element={<LazyForm />} />
          <Route path="/table" element={<LazyTable />} />
        </Route>
        <Route path="*" element={<Notfound />} />
        <Route path="/greet/:name" element={<Greet />} />
      </Routes>
      </Suspense>
    </div>
  );
}
export default App;