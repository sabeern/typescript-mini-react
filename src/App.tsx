import { BrowserRouter, Route, Routes } from "react-router-dom";
import Expense from "./components/Expense";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Expense />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
