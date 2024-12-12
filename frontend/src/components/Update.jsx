import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Update = ({ id }) => {
  const [student, setStudent] = useState({ name: "", phonenum: "" });

  useEffect(() => {
    const fetchStudent = async () => {
      const res = await axios.get(`http://127.0.0.1:8000/api/student/${id}`);
      setStudent({
        name: res.data.name,
        phonenum: res.data.phonenum,
      });
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/updatestudent/${id}`, {
        student,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="bg-[#FF2D20] text-white px-2 py-1 rounded-sm text-xs"
        >
          Cancel
        </button>
        <h1 className="text-sm font-bold text-gray-700">Update student {id}</h1>
      </div>
      <form className="flex justify-center items-center gap-5">
        <input
          type="text"
          name="name"
          value={student.name}
          placeholder="Name"
          onChange={handleChange}
          className="border-[1px] border-gray-500 rounded-sm px-2 py-1 w-[250px] outline-none text-sm"
        />{" "}
        <input
          type="number"
          name="phonenum"
          value={student.phonenum}
          placeholder="Phone Number"
          onChange={handleChange}
          className="border-[1px] border-gray-500 rounded-sm px-2 py-1 w-[250px] outline-none text-sm"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-black text-white rounded-sm px-8 py-1 text-sm"
        >
          Update
        </button>
      </form>
    </div>
  );
};

Update.propTypes = {
  id: PropTypes.string.isRequired, // Add this line
};

export default Update;
