import { NavLink, useLocation } from "react-router-dom";
import {
  CallOutlined,
  DialpadOutlined,
  ContactsOutlined,
  RadioButtonCheckedOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";

const BOTTOM_NAV_TABS = [
  { link: "/", label: "Call", icon: CallOutlined },
  { link: "/contacts", label: "Contacts", icon: ContactsOutlined },
  { link: "/dial-pad", label: "DialPad", icon: DialpadOutlined },
  { link: "/settings", label: "Settings", icon: SettingsOutlined },
  {
    link: "/recordings",
    label: "Recordings",
    icon: RadioButtonCheckedOutlined,
  },
];

const BottomNav = () => {
  const location = useLocation();

  const isActive = (link: string) => location.pathname === link;

  return (
    <div className="px-2 pt-1 bg-white shadow-lg rounded-2xl">
      <div className="flex justify-between">
        {BOTTOM_NAV_TABS.map((each) => (
          <div className="flex-1 group" key={each.label}>
            <NavLink
              to={each.link}
              className={`flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 ${
                isActive(each.link)
                  ? "text-indigo-500"
                  : "group-hover:text-indigo-500"
              }`}
            >
              <span className="px-1 pt-1 pb-1 flex flex-col gap-3">
                <Badge badgeContent={0} color="primary">
                  <each.icon color="action" />
                </Badge>
                <span
                  className={`block w-5 mx-auto h-1 ${
                    isActive(each.link)
                      ? "bg-indigo-500"
                      : "group-hover:bg-indigo-500"
                  } rounded-full`}
                />
              </span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
