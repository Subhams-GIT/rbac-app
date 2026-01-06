import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Home/Dashboard";
// import useSession from "./components/Hooks/useSession";
import Private from "./Private";
import Public from "./Public";
function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Public><Login/></Public>} />
              <Route path="/dashboard" element={<Private><Dashboard/></Private>} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
