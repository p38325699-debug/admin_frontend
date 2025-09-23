import React from "react";
import { useNavigate } from "react-router-dom";

const TaskData = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[76vw] p-6 bg-[#292828] text-amber-50 rounded shadow flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Task Data</h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate("/quiz_form")}
           className="cursor-pointer"
          
        >
          ➕ Add Quiz
        </button>

        <button
          onClick={() => navigate("/quiz_table")}
         className="cursor-pointer"
        >
          📑 Table Quiz
        </button>
      </div>
    </div>
  );
};

export default TaskData;
