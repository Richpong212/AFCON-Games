import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../service/user.service";

const Leaderboard = () => {
  const [user, setuser] = useState([]);

  // get all users
  useEffect(() => {
    const getUsers = async () => {
      const res = await getAllUsers();
      setuser(res.data);
    };

    getUsers();
  }, []);

  return (
    <section className="w-full max-w-3xl p-4 space-y-6">
      <h2 className="text-2xl font-bold text-dark">Leaderboard</h2>
      <div className="row">
        {user.length === 0 && <div className="ml-3">awaiting data</div>}
        {user.length > 0 &&
          user.map((user: any) => (
            <div className="col-md-6" key={user._id}>
              <div className="bg-white p-4 rounded shadow d-flex align-items-center gap-4">
                <img
                  alt="@user1"
                  className="w-10 h-10 rounded-full"
                  style={{
                    height: "50px",
                  }}
                  src="https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man3-512.png"
                />
                <div>
                  <h3 className="text-lg font-bold">@{user.name}</h3>
                  {/*<p>Correct Predictions: 5</p> */}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Leaderboard;
