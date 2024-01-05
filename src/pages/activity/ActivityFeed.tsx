import { useEffect, useState } from "react";
import TabLayout from "../../components/layouts/TabLayout";
import { IActivity } from "../../models/activity.model";
import { getActivities } from "../../services/activity.service";
import { AppLayout } from "../../components/layouts/appLayout";
import ActivityItem from "../../components/Activity/ActivityItem";

const ActivityFeed = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
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

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <AppLayout>
      <TabLayout title="Activity" description="nice">
        <>
          {isLoading
            ? "Loading"
            : activities.map((activity) => {
                return <ActivityItem {...activity}></ActivityItem>;
              })}
        </>
      </TabLayout>
    </AppLayout>
  );
};

export default ActivityFeed;
