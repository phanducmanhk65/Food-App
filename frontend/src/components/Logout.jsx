import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/action/authAction";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Gọi action logout để đăng xuất
    dispatch(logoutAction());
  }, [dispatch]);

  return <div>Đang đăng xuất...</div>;
};

export default Logout;
