import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-dark pb-4 min-vh-100">
      <Outlet />
    </div>
  );
};

export default App;
