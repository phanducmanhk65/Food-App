import React, { useState } from 'react';
import Avatar from '../assets/Avatar';
import UserInfoList from './UserInfoList';
import { userInfo } from '../constants';
import '../styles/UserProfile.scss';

const UserProfile = () => {
    const [showUpdateUser, setShowUpdateUser] = useState(false);
  
    // Initialize userProfileData state with default values
    const [userProfileData, setUserProfileData] = useState({
      fullName: '',
      email: '',
      password: '',
      phone: '',
      address: '',
    });
  
    const handleEditButtonClick = () => {
      setShowUpdateUser(!showUpdateUser);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserProfileData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // fetch('/api/updateUserProfile', {
      //   method: 'POST',
      //   body: JSON.stringify(userProfileData),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
    };
  
  return (
    <section className="profile-section">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <Avatar />
                <p className="text-muted mb-1 mt-3 d-flex justify-content-center">Bùi Công Tuấn</p>
                <p className="text-muted mb-4 d-flex justify-content-center">Bay Area, San Francisco, CA</p>
                <div className="d-flex justify-content-center mb-4">
                  <button className="btn btn-outline-primary ms-1" onClick={handleEditButtonClick}>
                    Chỉnh sửa thông tin
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <UserInfoList userInfo={userInfo} />
              </div>
            </div>
          </div>
          {showUpdateUser && (
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-body">
                  {/* Form to update user info */}
                  <form id="userInfoForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        required
                        value={userProfileData.fullName}
                        onChange={handleChange}
                        />
                       </div>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input type="email" className="form-control" id="email" name="email"  />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input type="password" className="form-control" id="password" name="password"  />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone:</label>
                      <input type="tel" className="form-control" id="phone" name="phone"  />
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Address:</label>
                      <input type="text" className="form-control" id="address" name="address"  />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
