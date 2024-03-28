import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import Loading from "./components/Loading";
import axios from "axios";
import { BASE_URL } from "../config";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function App() {
  const [loading, setLoading] = useState(false);

  const isServerWorking = async () => {
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL);

      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isServerWorking();
  }, []);

  return (
    <>
      {loading ? <Loading /> : ""}
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/editor/:room_id"} element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
