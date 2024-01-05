import { NavLink } from "react-router-dom";
import { IActivity } from "../../models/activity.model";

import {
  CallMade,
  CallReceived,
  QuestionMarkOutlined,
} from "@mui/icons-material";

interface IActivityItemProps extends IActivity {
  ActionButtons?: React.ReactNode;
}

const ActivityItem = ({
  id,
  from,
  to,
  via,
  direction,
  is_archived,
  duration,
  call_type,
  ActionButtons,
}: IActivityItemProps) => {
  return (
    <li className="p-3 flex justify-between items-center user-card mx-3 group">
      <div className="flex items-center gap-2">
        <img
          className="mx-auto object-cover rounded-full h-10 w-10"
          src={`https://i.pravatar.cc/150?u=${id}`}
          alt={`User ${from}`}
        />

        {direction ? (
          direction === "inbound" ? (
            <CallReceived />
          ) : (
            <CallMade />
          )
        ) : (
          <QuestionMarkOutlined />
        )}
        <div className="flex flex-col text-left align-top">
          <NavLink to={`/activity-details/${id}`} className="font-medium">
            {from ?? "Unknown"}
          </NavLink>
          <div className="text-xs text-gray-600 ">
            <span className="hidden">{call_type || "Unknown"}</span>{" "}
            <span className="hidden">
              {is_archived ? "Archived" : "Active"}
            </span>{" "}
            <span className="hidden">{to ? `To: ${to}` : "Unknown"}</span>{" "}
            <span className="hidden">{from ? `From: ${from}` : "Unknown"}</span>{" "}
            <span className="">{via ? `Via: ${via}` : "Unknown"}</span>{" "}
            <span className="hidden">{duration && ` | ${duration} min`}</span>
            <i className="text-xs text-gray-600 ml-2 hidden">{"6:00 AM"}</i>
          </div>
        </div>
      </div>

      <div>{ActionButtons}</div>
    </li>
  );
};

export default ActivityItem;
