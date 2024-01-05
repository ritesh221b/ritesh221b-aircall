interface ITabLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const TabLayout = ({ children, title, description }: ITabLayoutProps) => {
  return (
    <div className="w-full h-screen sm:w-[26rem] sm:h-[32rem] flex flex-col border shadow-md bg-white">
      <div className="flex items-center justify-between border-b p-2">
        {/* Tab Info */}
        <div className="flex items-center">
          <div className="pl-2">
            <div className="font-semibold">
              <a className="hover:underline" href="#">
                {title}
              </a>
            </div>
            <div className="text-xs text-gray-600 text-left">{description}</div>
          </div>
        </div>
        {/* Tab Info */}

        <div>
          <button
            className="inline-flex hover:bg-indigo-50 rounded-full p-2"
            type="button"
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
        </div>
        {/* end chat box action */}
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">{children}</div>

      <div className="flex items-center border-t p-2">
        <div>
          <button
            className="inline-flex hover:bg-indigo-50 rounded-full p-2"
            type="button"
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
          </button>
        </div>
      </div>
    </div>
  );
};
export default TabLayout;
