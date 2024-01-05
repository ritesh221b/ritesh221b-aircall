import IconButton from "@mui/material/IconButton";
import { HTMLAttributes, useEffect, useState } from "react";
import ActivityItem from "../../components/Activity/ActivityItem";
import TabLayout from "../../components/layouts/TabLayout";
import { AppLayout } from "../../components/layouts/appLayout";
import { IActivity } from "../../models/activity.model";
import {
  getActivities,
  setActivityArchiveStatus,
} from "../../services/activity.service";

import { ArchiveOutlined } from "@mui/icons-material";

const ACTIVITY_TABS = ["inbox", "archieved"] as const;

const ActivityFeed = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  const [activeTab, setActiveTab] = useState<(typeof ACTIVITY_TABS)[number]>(
    ACTIVITY_TABS[0],
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const res = await getActivities();
      setActivities(res?.data.filter((each) => each.direction) || []);
      console.log(res?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const archiveAllActivities = async (status: boolean) => {
    setIsLoading(true);
    await Promise.all(
      activities
        .filter((each) => each.is_archived === !status)
        .map((activity) => setActivityArchiveStatus(activity.id, true)),
    );
    fetchActivities();
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredList = activities.filter(
    (activity) => activity.is_archived === (activeTab === ACTIVITY_TABS[1]),
  );

  return (
    <AppLayout>
      <TabLayout
        title="Activity"
        description="nice"
        topBarButtons={
          <ArchieveButton
            onClick={() => {
              archiveAllActivities(activeTab === "inbox");
            }}
            title={activeTab === "inbox" ? "Archieve All" : "Un-archieve"}
          />
        }
      >
        <>
          <div className="">
            {/* Tabs */}
            <div className="flex justify-start gap-2 sticky top-0 px-4 py-2 items-center font-semibold text-sm text-slate-900 bg-slate-50/90  backdrop-blur-sm ring-1 ring-slate-900/10 ">
              {ACTIVITY_TABS.map((each) => {
                return (
                  <span
                    key={each}
                    onClick={() => {
                      setActiveTab(each);
                    }}
                    className={`cursor-pointer inline-flex gap-2 items-center justify-center rounded-full  px-2.5 py-0.5  ${
                      each === activeTab
                        ? "text-indigo-700 bg-indigo-100"
                        : "text-black bg-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-sm">
                      {each[0].toUpperCase() + each.slice(1)}
                    </p>
                  </span>
                );
              })}
            </div>

            {/* Tabs */}

            {filteredList.length < 1 && (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-400 mt-6">No activities yet</p>
              </div>
            )}

            {isLoading
              ? "Loading"
              : filteredList.map((activity) => {
                  return (
                    <ActivityItem
                      ActionButtons={
                        <IconButton
                          className="invisible group-hover:visible"
                          onClick={() => {
                            setIsLoading(true);
                            setActivityArchiveStatus(activity.id, true);
                            fetchActivities();
                          }}
                          aria-label="delete"
                        >
                          <ArchiveOutlined />
                        </IconButton>
                      }
                      key={activity.id}
                      {...activity}
                    ></ActivityItem>
                  );
                })}
          </div>
        </>
      </TabLayout>
    </AppLayout>
  );
};

interface IArchieveButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title?: string;
}

const ArchieveButton = (props: IArchieveButtonProps) => {
  return (
    <button
      className="inline-flex gap-1 hover:bg-indigo-50 rounded-full p-2"
      type="button"
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
      {props.title}
    </button>
  );
};

export default ActivityFeed;
