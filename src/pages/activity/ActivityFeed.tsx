import { ArchiveOutlined, UnarchiveOutlined } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React, { HTMLAttributes, useEffect, useState } from "react";
import ActivityItem from "../../components/Activity/ActivityItem";
import TabLayout from "../../components/layouts/TabLayout";
import { AppLayout } from "../../components/layouts/appLayout";
import { IActivity } from "../../models/activity.model";
import {
  getActivities,
  setActivityArchiveStatus,
} from "../../services/activity.service";

const ACTIVITY_TABS = ["inbox", "archieved"] as const;

const Shimmer = () => (
  <>
    <div className="flex gap-2 flex-col p-4 bg-white rounded-md shadow-md">
      {Array.from({ length: 10 }).map(() => (
        <p className="leading-relaxed mb-3 w-full h-10 animate-pulse bg-gray-200" />
      ))}
    </div>
  </>
);

const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [activeTab, setActiveTab] = useState<(typeof ACTIVITY_TABS)[number]>(
    ACTIVITY_TABS[0],
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const res = await getActivities();
      setActivities(res?.data.filter((each) => each.direction) || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const archiveAllActivities = async (status: boolean) => {
    setIsLoading(true);
    await Promise.allSettled(
      activities
        .filter((each) => each.is_archived === !status)
        .map((activity) => setActivityArchiveStatus(activity.id, status)),
    );
    fetchActivities();
  };

  const filteredList = activities.filter(
    (activity) => activity.is_archived === (activeTab === ACTIVITY_TABS[1]),
  );

  const groupByDate = filteredList.reduce<{ [key: string]: IActivity[] }>(
    (acc, activity) => {
      const date = new Date(activity.created_at).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    },
    {},
  );

  return (
    <AppLayout>
      <TabLayout
        title="Activity"
        description="nice"
        topBarButtons={
          <ArchieveButton
            onClick={() => {
              console.log(activeTab === "inbox");
              archiveAllActivities(activeTab === "inbox");
            }}
            archive={activeTab === "inbox"}
          />
        }
      >
        <div>
          <div className="flex justify-start gap-2 sticky top-0 px-4 py-2 items-center font-semibold text-sm text-slate-900 bg-slate-50/90  backdrop-blur-sm ring-1 ring-slate-900/10 ">
            {ACTIVITY_TABS.map((each) => (
              <button
                key={each}
                onClick={() => setActiveTab(each)}
                className={`cursor-pointer inline-flex gap-2 items-center justify-center rounded-full  px-2.5 py-0.5  ${
                  each === activeTab
                    ? "text-indigo-700 bg-indigo-100"
                    : "text-black bg-white"
                }`}
                aria-label={`Switch to ${each} tab`}
              >
                <ArchiveOutlined className="w-4 h-4" />
                <p className="whitespace-nowrap text-sm">
                  {each[0].toUpperCase() + each.slice(1)}
                </p>
              </button>
            ))}
          </div>

          {filteredList.length < 1 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-400 mt-6">No activities yet</p>
            </div>
          ) : isLoading ? (
            <Shimmer />
          ) : (
            Object.entries(groupByDate)
              .sort(([a], [b]) => Number(new Date(b)) - Number(new Date(a)))
              .map(([date, activities]) => (
                <section key={date} aria-labelledby={date}>
                  <Divider id={date}>{date}</Divider>
                  {activities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      {...activity}
                      ActionButtons={
                        <Tooltip
                          placement="top"
                          title={activity.is_archived ? "Unarchive" : "Archive"}
                        >
                          <IconButton
                            className="sm:invisible sm:group-hover:visible"
                            onClick={() => {
                              (async () => {
                                setIsLoading(true);
                                await setActivityArchiveStatus(
                                  activity.id,
                                  !activity.is_archived,
                                );
                                await fetchActivities();
                              })();
                            }}
                            aria-label="archieve"
                          >
                            {activity.is_archived ? (
                              <UnarchiveOutlined />
                            ) : (
                              <ArchiveOutlined />
                            )}
                          </IconButton>
                        </Tooltip>
                      }
                    />
                  ))}
                </section>
              ))
          )}
        </div>
      </TabLayout>
    </AppLayout>
  );
};

interface ArchieveButtonProps extends HTMLAttributes<HTMLButtonElement> {
  archive: boolean;
}

const ArchieveButton: React.FC<ArchieveButtonProps> = ({
  archive,
  ...props
}) => {
  const title = archive ? "Archieve All" : "Un-Archieve All";
  return (
    <button
      className="inline-flex gap-1 hover:bg-indigo-50 rounded-full p-2"
      type="button"
      {...props}
      aria-label={title}
    >
      {!archive ? (
        <UnarchiveOutlined className="w-6 h-6" />
      ) : (
        <ArchiveOutlined className="w-6 h-6" />
      )}

      {title}
    </button>
  );
};

export default ActivityFeed;
