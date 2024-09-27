import { BrowserRouter, Route, Routes } from "react-router-dom";
import Expense from "./components/Expense";
import UseEffectTest from "./components/Others/UseEffectTest";
import AsyncUseEffect from "./components/Others/AsyncUseEffect";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Expense />} />
          <Route path="/test" element={<UseEffectTest />} />
          <Route path="/test2" element={<AsyncUseEffect />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
