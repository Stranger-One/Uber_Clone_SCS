import React from "react";
import { Link } from "react-router-dom";
import { UberLogo } from "../components";

const Start = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-between ">
      <div
        className="bg-red-400 w-full h-full px-6 pt-10 bg-cover"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1647424825116-fbf8b9415fc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRyYWZmaWMlMjBsaWdodHxlbnwwfHwwfHx8MA%3D%3D)",
        }}
      >
       <UberLogo size={20} />
      </div>
      <div className="w-full bg-white p-4 flex flex-col justify-between gap-4">
        <h1 className="text-2xl font-bold capitalize">Get's Start With Uber</h1>
        <Link to={"/auth/user-login"} className="w-full py-2 bg-black text-white flex justify-center items-center rounded-md">Continue</Link>
      </div>
    </section>
  );
};

export default Start;
