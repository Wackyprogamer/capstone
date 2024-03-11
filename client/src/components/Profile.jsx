import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Footer from "./Footer";
import UserInfo from './userInformation';

function Profile() {
  const [info, setInfo] = useState({
    courses: [],
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    city: '',
    country: '',
    status: 'loading...'
  });


  useEffect(() => {
    try {
      let status = 'loading...'
      fetch("http://localhost:3001/api/profileInfo", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      })
        .then((res) => {
          console.log(Math.floor(res.status / 100))
          if (Math.floor(res.status / 100) === 4) {
            status = 'unauthorized';
          } else if (res.status === 200) {
            status = 'ok';
            return res.json();
          } else {
            status = 'internal server error'
          }
          return
        })
        .then((data) => {
          setInfo({
            ...data,
            status: status
          });
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  console.log(info)
  return (
    <div className="Courses">
      {info.status === 'ok' ?
        <div>
          <ResponsiveAppBar />
          <UserInfo courses={info.courses} username={info.username} email={info.email} firstName={info.first_name} lastName={info.last_name} phoneNum={info.phone_number} address={info.address} city={info.city} country={info.country} />
          <Footer />
        </div>
        :
        <div>{info.status}</div>
      }
    </div>
  );
}

export default Profile;