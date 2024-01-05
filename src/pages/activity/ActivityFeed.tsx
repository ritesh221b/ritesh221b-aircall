import { HTMLAttributes, useEffect, useState } from "react";
import ActivityItem from "../../components/Activity/ActivityItem";
import TabLayout from "../../components/layouts/TabLayout";
import { AppLayout } from "../../components/layouts/appLayout";
import { IActivity } from "../../models/activity.model";
import {
  getActivities,
  setActivityArchiveStatus,
} from "../../services/activity.service";

import Button from "@mui/material/Button";

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
      setActivities(res?.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const archiveAllActivities = async () => {
    setIsLoading(true);
    await Promise.all(
      activities
        .filter((each) => each.is_archived)
        .map((activity) => setActivityArchiveStatus(activity.id, true)),
    );
    fetchActivities();
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <AppLayout>
      <TabLayout
        title="Activity"
        description="nice"
        topBarButtons={<ArchieveButton onClick={archiveAllActivities} />}
        bottomBarBottons={
          <ArchieveAllButton
            disabled={activities.length > 0}
            onClick={archiveAllActivities}
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
            {isLoading
              ? "Loading"
              : activities
                  .filter(
                    (activity) =>
                      activity.is_archived === (activeTab === ACTIVITY_TABS[1]),
                  )
                  .map((activity) => {
                    return (
                      <ActivityItem
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

const ArchieveButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="inline-flex hover:bg-indigo-50 rounded-full p-2"
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
    </button>
  );
};

interface IArchieveAllButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled: boolean;
}

const ArchieveAllButton = (props: IArchieveAllButtonProps) => {
  return (
    <>
      <Button variant="text">Contained</Button>
      <button
        className="inline-flex hover:bg-indigo-50 rounded-full p-2"
        type="button"
        {...props}
        disabled={props.disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Archive All
      </button>
      <button
        className="inline-flex hover:bg-indigo-50 rounded-full p-2"
        type="button"
        {...props}
        disabled={props.disabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Archive All
      </button>
    </>
  );
};

export default ActivityFeed;
