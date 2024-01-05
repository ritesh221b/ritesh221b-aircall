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
          <div className="font-medium">{from ?? "Unknown"}</div>
          <div className="text-xs text-gray-600 ">
            {call_type ? call_type : "Unknown"}
            {is_archived ? "Archived" : "Active"}
            {to ? "Archived" : "Active"}
            {from ? "Archived" : "Active"}
            {via ? "Archived" : "Active"}

            {duration && ` | ${duration} min`}
            <i className="text-xs text-gray-600 ml-2">{"6:00 AM"}</i>
          </div>
        </div>
      </div>

      <div>{ActionButtons}</div>
    </li>
  );
};

export default ActivityItem;
