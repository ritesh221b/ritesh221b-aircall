import { Route, Routes } from "react-router-dom";
import "./App.css";
import ActivityFeed from "./pages/activity/ActivityFeed";
import Error404 from "./pages/404";
import Archive from "./pages/activity/Archive";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ActivityFeed />} />
        <Route path="archieve" element={<Archive />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
