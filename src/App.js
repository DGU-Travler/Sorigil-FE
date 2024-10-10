import { MemoryRouter, Routes, Route } from "react-router-dom";
import Popup from "./popup/Popup";

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Popup />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
