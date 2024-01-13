import React, { useState } from "react";
import { createUser } from "../../../service/user.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateMatch from "../createMatch/CreateMatch";
import MatchResults from "../matchResults/MatchResults";

const Admin = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
  });

  const [selected, setselected] = useState(false);
  const [selectedMatch, setselectedMatch] = useState(false);
  const [matchResult, setmatchResult] = useState(false);

  const handleinputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setuser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createUser(user, toast);
    if (res.message === "User created successfully") {
      setuser({ name: "", email: "" });
    }
  };

  // handle create user button
  const handleCreateUserBtn = () => {
    setselected(true);
    setselectedMatch(false);
    setmatchResult(false);
  };

  // handle create match button
  const handleCreateMatchBtn = () => {
    setselected(false);
    setselectedMatch(true);
    setmatchResult(false);
  };

  // handle match result button
  const handleMatchResultBtn = () => {
    setselected(false);
    setselectedMatch(false);
    setmatchResult(true);
  };

  return (
    <section className="max-w-3xl p-4 space-y-6">
      <ToastContainer />
      <div className="d-flex align-items-center mb-4">
        <div className="">
          <button
            onClick={handleCreateUserBtn}
            className="btn btn-primary mt-4 mx-3"
          >
            Create User
          </button>
        </div>
        <div>
          <button
            onClick={handleCreateMatchBtn}
            className="btn btn-primary mt-4"
          >
            Create Match
          </button>
        </div>
        <div>
          <button
            onClick={handleMatchResultBtn}
            className="btn btn-primary mt-4 mx-3"
          >
            Match Result
          </button>
        </div>
      </div>
      {selected && (
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="d-flex flex-column">
                <label className="text-dark" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form-control"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleinputchange}
                />
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                Create User
              </button>
            </form>
          </div>
        </div>
      )}

      {selectedMatch && <CreateMatch />}
      {matchResult && <MatchResults />}
    </section>
  );
};

export default Admin;
