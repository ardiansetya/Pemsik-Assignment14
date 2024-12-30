import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          {/* Use flex-1 and min-w-0 for proper flex behavior */}
          <Header />
          <div className="p-5 ">
            <div className="mx-auto w-full ">
              {/* Use max-w-[1536px] for 2xl breakpoint */}
              <div className="min-w-0 w-full ">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
