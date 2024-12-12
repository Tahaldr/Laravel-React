import { useEffect, useState } from "react";
import axios from "axios";
import Add from "./Add";
import Update from "./Update";

const Select = () => {
  const [students, setStudents] = useState([]);
  const [checkStudents, setCheckStudents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [idStudent, setIdStudent] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/students");
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [refresh]); // Re-fetch when refresh changes

  const handleChecked = (id) => {
    setCheckStudents((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id]
    );
  };

  const handleDelete = async (ids) => {
    try {
      await axios.post("http://127.0.0.1:8000/api/deletemultiple", { ids });
      setCheckStudents([]);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-9">
      {updateClicked ? (
        <Update id={idStudent} />
      ) : (
        <div>
          <Add setRefresh={setRefresh} />
          <div className="mt-5">
            <button
              onClick={() => handleDelete(checkStudents)}
              className="border-[1px] border-gray-500 rounded-md px-2 py-1 text-xs mb-3"
            >
              Delete selected
            </button>
            <table className="w-full text-left text-sm border border-gray-500">
              <thead className="text-white bg-gray-600">
                <tr>
                  <th className="py-2"></th>
                  <th className="py-2">Id</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Phone number</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-500 hover:bg-gray-100"
                  >
                    <td className="py-2 px-3">
                      <input
                        type="checkbox"
                        name="id"
                        value={student.id}
                        checked={checkStudents.includes(student.id)}
                        onChange={() => handleChecked(student.id)}
                      />
                    </td>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.phonenum}</td>
                    <td className=" px-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium">
                      <button
                        onClick={() => {
                          setIdStudent(student.id);
                          setUpdateClicked(true);
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
