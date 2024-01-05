interface ITabLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  topBarButtons?: React.ReactNode;
  bottomBarBottons?: React.ReactNode;
}

const TabLayout = ({
  children,
  title,
  description,
  topBarButtons,
}: ITabLayoutProps) => {
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

        <div>{topBarButtons && topBarButtons}</div>
        {/* end chat box action */}
      </div>

      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
};
export default TabLayout;
