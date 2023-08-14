import React from 'react';
import "../styles/UserProfile.scss"

const UserInfoList = ({ userInfo }) => {
  return (
    <>
      {userInfo.map((item, index) => (
        <div key={index} className="row">
          <div className="col-sm-3 mb-3">
            <p className="font-weight-bold">{item.label}</p>
          </div>
          <div className="col-sm-9 mb-3">
            <p className="text-muted">{item.value}</p>
          </div>
          {index !== userInfo.length - 1 && <hr className="custom-hr" />} {/* Di chuyển xuống đây */}
          
        </div>
      ))}
    </>
  );
};

export default UserInfoList;
