const AppLoader = () => {
  return (
    <div className="h-[100vh] bg-gray-300 flex justify-center items-center">
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="relative">
          <div className="w-[90px] h-[90px] border-t-8 border-b-8 border-white rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default AppLoader;
