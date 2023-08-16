import React from "react";

const UserInfoList = ({ userInfo }) => {
  return (
    <>
      {userInfo && (
        <div>
          <div className="row">
            <div className="col-sm-3 mb-3">
              <p className="font-weight-bold">Username</p>
            </div>
            <div className="col-sm-9 mb-3">
              <p className="text-muted">{userInfo.username}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3 mb-3">
              <p className="font-weight-bold">Name</p>
            </div>
            <div className="col-sm-9 mb-3">
              <p className="text-muted">{userInfo.name}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3 mb-3">
              <p className="font-weight-bold">Address</p>
            </div>
            <div className="col-sm-9 mb-3">
              <p className="text-muted">{userInfo.address}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3 mb-3">
              <p className="font-weight-bold">Phone Number</p>
            </div>
            <div className="col-sm-9 mb-3">
              <p className="text-muted">{userInfo.phoneNumber}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfoList;
