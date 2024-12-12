import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

const Add = ({ setRefresh }) => {
  const [student, setStudent] = useState({
    name: "",
    phonenum: "",
  });

  const handelChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/addstudent",
        student
      );
      console.log("Student added:", response.data);
      setRefresh((prev) => !prev);
      setStudent({ name: "", phonenum: "" });
    } catch (error) {
      console.error("Error adding student:", error.response || error.message);
    }
  };

  return (
    <div className="">
      <form className="flex justify-center items-center gap-5">
        <input
          type="text"
          name="name"
          value={student.name}
          placeholder="Name"
          onChange={handelChange}
          className="border-[1px] border-gray-500 rounded-sm px-2 py-1 w-[250px] outline-none text-sm"
        />
        <input
          type="number"
          name="phonenum"
          value={student.phonenum}
          placeholder="Phone Number"
          onChange={handelChange}
          className="border-[1px] border-gray-500 rounded-sm px-2 py-1 w-[250px] outline-none text-sm"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black text-white rounded-sm px-8 py-1 text-sm"
        >
          Add
        </button>
      </form>
    </div>
  );
};

Add.propTypes = {
  setRefresh: PropTypes.func.isRequired, // Add prop validation
};

export default Add;
