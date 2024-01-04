import { IActivity } from "../../models/activity.model";

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);
const ActivityItem = ({ id, from }: IActivity) => {
  return (
    <li className="p-3 flex justify-between items-center user-card">
      <div className="flex items-center gap-2">
        <img
          className="mx-auto object-cover rounded-full h-10 w-10"
          src={`https://i.pravatar.cc/150?u=${id}`}
          alt={`User ${from}`}
        />

        <div className="flex flex-col text-left align-top">
          <div className="font-medium">{from}</div>
          <div className="text-xs text-gray-600 ">
            "developer"
            <i className="text-xs text-gray-600 ml-2">{"6:00 AM"}</i>
          </div>
        </div>
      </div>

      <div>
        <button
          className="text-gray-500 hover:text-gray-700"
          aria-label="More options"
        >
          <Icon />
        </button>
      </div>
    </li>
  );
};

export default ActivityItem;
