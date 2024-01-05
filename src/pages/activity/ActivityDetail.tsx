import { ArrowBackIos } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import TabLayout from "../../components/layouts/TabLayout";
import { AppLayout } from "../../components/layouts/appLayout";
import { IActivity } from "../../models/activity.model";
import { getActivityById } from "../../services/activity.service";
import { formatTime, secondsToTime } from "../../utils";

const ImageShimmer = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-400 h-24 w-24"></div>
    </div>
  );
};

const ActivityDetail = () => {
  const { id } = useParams();

  const [activity, setActivity] = useState<IActivity | null>(null);

  const fetchActivity = async (id: string) => {
    const res = await getActivityById(id);
    setActivity(res?.data);
  };

  useEffect(() => {
    id && fetchActivity(id);
  }, [id]);

  return (
    <AppLayout>
      <TabLayout title="Details" description="">
        <div className="bg-white w-full">
          <NavLink to={"/"} className="flex p-4 gap-1">
            <ArrowBackIos />
            <span>Back</span>
          </NavLink>
          <div className="flex justify-center mt-4">
            {!activity?.id ? (
              <ImageShimmer />
            ) : (
              <img
                className="mx-auto object-cover rounded-full h-24 w-24"
                src={`https://i.pravatar.cc/150?u=${activity?.id}`}
                alt={`User ${activity?.from}`}
              />
            )}
          </div>
          <div className="mt-4">
            <h1 className="font-bold text-center text-3xl text-gray-900">
              {activity?.from}
            </h1>

            <div className="my-5 px-6">
              <span className="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-indigo-600 hover:bg-black hover:text-white">
                Call <span className="font-bold"></span>
              </span>
            </div>

            <div className="w-full">
              <h3 className="font-medium text-gray-900 text-left px-6">
                More details
              </h3>
              <div className="mt-5 w-full flex flex-col gap-2 items-center overflow-hidden text-sm">
                <span className="w-full gap-2 border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 block hover:bg-gray-100 transition duration-150">
                  <div className="flex gap-2 items-center">
                    ID:
                    <span className="text-gray-500 text-xs">
                      {activity?.id}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    Via:
                    <span className="text-gray-500 text-xs">
                      {activity?.via}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    Phone:
                    <span className="text-gray-500 text-xs">
                      {activity?.from}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    Time:
                    <span className="text-gray-500 text-xs">
                      {activity?.created_at && formatTime(activity?.created_at)}
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    Duration:
                    <span className="text-gray-500 text-xs">
                      {activity?.duration && secondsToTime(activity?.duration)}
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </TabLayout>
    </AppLayout>
  );
};

export default ActivityDetail;
