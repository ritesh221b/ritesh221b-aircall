import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error404 from "./pages/404";
import Contacts from "./pages/Contacts";
import DialPad from "./pages/DialPad";
import Settings from "./pages/Settings";
import ActivityFeed from "./pages/activity/ActivityFeed";
import Recordings from "./pages/Recordings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ActivityFeed />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="dial-pad" element={<DialPad />} />
        <Route path="settings" element={<Settings />} />
        <Route path="recordings" element={<Recordings />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
