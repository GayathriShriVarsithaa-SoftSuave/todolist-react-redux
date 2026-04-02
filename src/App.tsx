import "./App.css";
//import Form from "./components/Form/Form";
import {Route,Routes} from "react-router-dom";
//import Table from "./components/Table/Table";
//import Notfound from "./components/Notfound/Notfound";
import { lazy,Suspense } from "react";
const LazyForm = lazy(() => import("./components/Form/Form"));
const LazyTable = lazy(() => import("./components/Table/Table"));
const Notfound = lazy(() => import("./components/Notfound/Notfound"));
function App() {
  return (
    // <div className="appbody">
    //   {/* <Form/> */}
    //   <Routes>
    //     <Route path="/" element={<Form />} />
    //     <Route path="/table" element={<Table/>}/>
    //     {/* fallback route - non existing routes */}
    //     <Route path="*" element={<Notfound/>} />  
    //     //dynamic routes - user can give the endpoints like 1,2,3(article number)

    //   </Routes>
    //   {/* <Table/> */}
    // </div>

    <div>
      <Suspense fallback={<div className="load"><h1>Loading...</h1></div>}>
        <Routes>
          <Route path="/" element={<LazyForm />} />
          <Route path="/table" element={<LazyTable />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
export default App;