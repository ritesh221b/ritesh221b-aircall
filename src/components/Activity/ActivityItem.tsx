import { NavLink } from "react-router-dom";
import { IActivity } from "../../models/activity.model";

import {
  CallMade,
  CallMissed,
  CallReceived,
  Voicemail,
} from "@mui/icons-material";
import { secondsToTime } from "../../utils";
interface IActivityItemProps extends IActivity {
  ActionButtons?: React.ReactNode;
}

const ActivityItem = ({
  id,
  from,
  via,
  direction,
  duration,
  call_type,
  ActionButtons,
}: IActivityItemProps) => {
  return (
    <li className="p-3 flex justify-between items-center user-card mx-3 group">
      <NavLink
        to={`/activity-details/${id}`}
        className="flex items-center gap-2"
      >
        <img
          className="mx-auto object-cover rounded-full h-10 w-10"
          src={`https://i.pravatar.cc/150?u=${id}`}
          alt={`User ${from}`}
        />

        <CallDirection direction={direction} />
        <div className="flex flex-col text-left align-top">
          <div className="font-medium">{from ?? "Unknown"}</div>
          <div className="text-xs text-gray-600 ">
            <CallType call_type={call_type} />
            <span className="">{via ? ` | via: ${via}` : "Unknown"}</span>{" "}
          </div>
        </div>
      </NavLink>

      <div className="flex justify-center">
        <span className="">{`${secondsToTime(duration)}`}</span>
      </div>

      <div>{ActionButtons}</div>
    </li>
  );
};

const CallType = ({ call_type }: { call_type: string }) => {
  switch (call_type) {
    case "missed":
      return (
        <>
          {" "}
          <CallMissed color={"error"} fontSize="small" /> missed call
        </>
      );
    case "voicemail":
      return (
        <>
          {" "}
          <Voicemail color={"info"} fontSize="small" /> voicemail
        </>
      );
    case "answered":
      return <>received</>;
    default:
      return null;
  }
};

const CallDirection = ({ direction }: { direction: string }) => {
  switch (direction) {
    case "inbound":
      return <CallReceived color={"success"} fontSize="small" />;
    case "outbound":
      return <CallMade color={"info"} fontSize="small" />;
    default:
      return null;
  }
};

export default ActivityItem;
