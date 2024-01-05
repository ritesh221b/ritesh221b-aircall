import TabLayout from "../components/layouts/TabLayout";
import { AppLayout } from "../components/layouts/appLayout";

const Settings = () => {
  return (
    <AppLayout>
      <TabLayout title="Settings" description="">
        <div className="bg-white px-4 flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-5xl font-black text-gray-500">Settings</h1>
          </div>
        </div>
      </TabLayout>
    </AppLayout>
  );
};

export default Settings;
