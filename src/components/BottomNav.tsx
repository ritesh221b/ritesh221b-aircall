import { Link } from "react-router-dom";
import {
  CallOutlined,
  DialpadOutlined,
  ContactsOutlined,
  RadioButtonCheckedOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

import Badge from "@mui/material/Badge";
const BOTTOM_NAV = [
  { link: "/", label: "", icon: CallOutlined },
  { link: "/contacts", label: "Contacts", icon: ContactsOutlined },
  { link: "/dial-pad", label: "", icon: DialpadOutlined },
  { link: "/settings", label: "Settings", icon: SettingsOutlined },
  {
    link: "/recordings",
    label: "Recordings",
    icon: RadioButtonCheckedOutlined,
  },
];

const BottomNav = () => {
  return (
    <div className="px-2 pt-1 bg-white shadow-lg rounded-2xl">
      <div className="flex justify-between">
        {BOTTOM_NAV.map((each) => {
          return (
            <div className="flex-1 group">
              <Link to={each.link}>
                <a
                  href="#"
                  className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
                >
                  <span className="px-1 pt-1 pb-1 flex flex-col gap-3">
                    {/* <i className="far fa-home text-2xl pt-1 mb-1 block" /> */}
                    {/* {each.icon && <each.icon></each.icon>} */}
                    <Badge badgeContent={0} color="primary">
                      <each.icon color="action" />
                    </Badge>
                    {/* <span className="block text-xs pb-2">{each.label}</span> */}
                    <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full" />
                  </span>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
