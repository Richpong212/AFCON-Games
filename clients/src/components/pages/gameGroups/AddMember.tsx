import React, { ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addUserGroupMember } from "../../../service/userGroup.service";

const AddMember = () => {
  const location = useLocation();
  const groupStateData = location?.state.group;

  // group id from the state
  const groupId = groupStateData?._id;

  const [groupData, setGroupData]: any = useState({
    name: "",
  });

  const handleInputChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setGroupData({ ...groupData, [name]: value });
  };

  const handlesubmit = async () => {
    // add user to group
    const res = await addUserGroupMember(groupId, groupData, toast);
    console.log(res);
  };

  return (
    <div className="container">
      <ToastContainer />
      <section className="mt-4">
        <h2 className="text-xl font-semibold">
          Add a member |{" "}
          <span
            style={{
              fontSize: "1rem",
            }}
          >
            {groupData?.name}
          </span>
        </h2>
        <form className="mt-4">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Member Name"
            name="name"
            value={groupData.name}
            onChange={handleInputChange}
          />

          <button
            onClick={handlesubmit}
            type="button"
            className="btn btn-primary"
          >
            Add Member
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddMember;
