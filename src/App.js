import PageSize from "./components/PageSize";
import UploadImages from "./components/UploadImages";
import Collections from './components/StickersCollection';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles/style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<PageSize />} />
          <Route path="UploadImages" element={<UploadImages />} />
          <Route path="Collections" element={<Collections />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
