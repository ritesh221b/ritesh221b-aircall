interface IAppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  return (
    <div className="flex mx-0 items-end justify-center text-center sm:block sm:px-4 sm:pt-4 sm:pb-32 bg-gradient-to-tr from-indigo-800 to-indigo-500 w-full h-screen">
      <div className="inline-block w-full sm:w-fit overflow-hidden transition-all transform bg-white sm:m-16 sm:align-middle sm:max-w-xl">
        {children}
      </div>
      <div className="absolute left-0 top-0 hidden sm:block text-indigo-300 font-bold tracking-wide transform px-4 p-2 justify-center">
        @ritesh221b
      </div>
    </div>
  );
};
