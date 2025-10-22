import React from "react";
import { useNavigate } from "react-router-dom";

const TaskData = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: "➕",
      title: "Add Quiz",
      description: "Create new quiz questions",
      path: "/quiz_form",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-r from-green-500/10 to-emerald-600/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: "📑",
      title: "Table Quiz",
      description: "View and manage all quizzes",
      path: "/quiz_table",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-gradient-to-r from-blue-500/10 to-cyan-600/10",
      borderColor: "border-blue-500/30"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 shadow-2xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">
            📊 Task Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">Manage your quiz content and data</p>
        </div>
        
        <div className="bg-[#1f1f1f] rounded-xl px-4 py-2 border border-gray-700">
          <span className="text-violet-400 font-semibold">{menuItems.length}</span>
          <span className="text-gray-400 ml-2">Sections</span>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`${item.bgColor} border ${item.borderColor} rounded-2xl p-6 text-left hover:scale-105 transition-all duration-300 transform hover:shadow-2xl group cursor-pointer`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className={`text-xl font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-2`}>
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                <span className="text-white text-lg">→</span>
              </div>
            </div>
            
            {/* Progress bar effect on hover */}
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${item.color} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
              ></div>
            </div>
          </button>
        ))}
      </div>



      {/* Footer Note */}
      <div className="mt-20 text-center">
        <p className="text-gray-500 text-xs">
          Manage your quiz content efficiently with these tools
        </p>
      </div>
    </div>
  );
};

export default TaskData;