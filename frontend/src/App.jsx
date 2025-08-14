import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routing from "./lib/Routing";
import ScrollToTop from "./lib/ScrollToTop";

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/auth/authThunk";

import { Toaster } from "sonner";
import Loader from "./components/Loader";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const { authUser, isCheckingAuth, onlineUsers } = useSelector(
    (state) => state.auth
  );
  const { theme } = useSelector((state) => state.theme);

  // const location = useLocation();
  // console.log(location.pathname);

  useEffect(() => {
    if (!isCheckingAuth) return;
    dispatch(checkAuth());
  }, [authUser]);

  // console.log({ authUser });
  // console.log({ onlineUsers });

  if (isCheckingAuth && !authUser) {
    return <Loader />;
  }

  return (
    <div
      data-theme={theme}
      className="w-full min-h-screen relative pt-[0.01px]"
    >
      <ScrollToTop />
      <Navbar />
      <Routing />
      {location.pathname !== "/" && <Footer />}
      <Toaster />
    </div>
  );
};

export default App;
