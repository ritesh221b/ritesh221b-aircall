import { NavLink } from "react-router-dom";
import TabLayout from "../components/layouts/TabLayout";
import { AppLayout } from "../components/layouts/appLayout";

const Error404 = () => {
  return (
    <AppLayout>
      <TabLayout title="404" description="nice">
        <div className="bg-white px-4 flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <h1 className="text-5xl font-black text-gray-500">404</h1>

            <p className="mt-4 text-gray-500">We can't find that page.</p>
            <NavLink
              to="/"
              className="mt-6 inline-block rounded bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring"
            >
              Go Back Home
            </NavLink>
          </div>
        </div>
      </TabLayout>
    </AppLayout>
  );
};

export default Error404;
