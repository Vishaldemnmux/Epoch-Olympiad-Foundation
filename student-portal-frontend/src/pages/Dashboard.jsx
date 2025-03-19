// import React, { useEffect, useState } from 'react';
// import { Menu, X, FileText, Award, BookOpen, AlignCenterVertical as Certificate, Target, MessageSquare, Layout, LogOut, ChevronRight } from 'lucide-react';
// import { motion } from 'framer-motion';

// function Dashboard() {
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const menuItems = [
//     { icon: FileText, label: 'Admit Card', path: '/admit-card' },
//     { icon: Award, label: 'Results', path: '/results' },
//     { icon: BookOpen, label: 'Study Materials', path: '/study-materials' },
//     { icon: Certificate, label: 'Certificates', path: '/certificates' },
//     { icon: Target, label: 'Answer Keys', path: '/answer-key' },
//     { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
//     { icon: Layout, label: 'Practice OMR', path: '/practice-omr' },
//   ];

//   useEffect(() => {
//     setTimeout(() => {
//       setStudent({
//         "Student's name": "John Doe",
//         "Roll no": "2024001",
//         "Class": "X",
//         "Section": "A",
//         "Father's Name": "Robert Doe",
//         "Mother's Name": "Sarah Doe",
//         "School": "Modern High School",
//         "School Code": "MHS001",
//         "Mob No": "1234567890",
//         "City": "New York"
//       });
//       setLoading(false);
//     }, 1000);
//   }, []);

//   const StudentInfoCard = ({ label, value }) => (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="bg-white/60 backdrop-blur-md p-5 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
//     >
//       <p className="text-gray-500 text-sm">{label}</p>
//       <p className="text-gray-900 font-semibold mt-1">{value}</p>
//     </motion.div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex">
      
//       {/* Sidebar */}
//       <aside 
//         className={`fixed lg:static lg:translate-x-0 z-50 h-full w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 transition-transform duration-300
//           ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="p-6">
//           <div className="flex items-center justify-between">
//             <h3 className="text-2xl font-bold text-gray-800">Student Portal</h3>
//             <button 
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden text-gray-500 hover:text-gray-700"
//             >
//               <X size={24} />
//             </button>
//           </div>
//           <nav className="mt-8 space-y-2">
//             {menuItems.map((item) => (
//               <motion.button
//                 key={item.path}
//                 whileHover={{ scale: 1.05 }}
//                 className="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-100 transition-all"
//               >
//                 <item.icon className="w-5 h-5" />
//                 <span className="ml-3">{item.label}</span>
//                 <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
//               </motion.button>
//             ))}
//             <button className="flex items-center w-full px-4 py-3 text-red-600 rounded-lg hover:bg-red-100 transition-colors mt-6">
//               <LogOut className="w-5 h-5" />
//               <span className="ml-3">Logout</span>
//             </button>
//           </nav>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-h-screen p-6">
//         <div className="flex items-center justify-between mb-6">
//           <button 
//             onClick={() => setSidebarOpen(true)}
//             className="lg:hidden text-gray-600 hover:text-gray-800"
//           >
//             <Menu size={28} />
//           </button>
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shadow-lg">
//               {student?.["Student's name"]?.charAt(0) || 'S'}
//             </div>
//             <div>
//               <h2 className="text-2xl font-semibold text-gray-900">
//                 {loading ? 'Loading...' : `Welcome, ${student?.["Student's name"]}`}
//               </h2>
//               <p className="text-gray-600">Your Dashboard Overview</p>
//             </div>
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center h-[400px]">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500"></div>
//           </div>
//         ) : student ? (
//           <motion.div 
//             initial={{ opacity: 0, y: 10 }} 
//             animate={{ opacity: 1, y: 0 }} 
//             transition={{ duration: 0.5 }} 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             <StudentInfoCard label="Roll No" value={student["Roll no"]} />
//             <StudentInfoCard label="Class" value={`${student["Class"]} - ${student["Section"]}`} />
//             <StudentInfoCard label="Father's Name" value={student["Father's Name"]} />
//             <StudentInfoCard label="Mother's Name" value={student["Mother's Name"]} />
//             <StudentInfoCard label="School" value={student["School"]} />
//             <StudentInfoCard label="School Code" value={student["School Code"]} />
//             <StudentInfoCard label="Mobile No" value={student["Mob No"]} />
//             <StudentInfoCard label="City" value={student["City"]} />
//           </motion.div>
//         ) : (
//           <div className="text-center text-gray-500">No student details found.</div>
//         )}
//       </main>

//       {/* Overlay */}
//       {isSidebarOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, FileText, Award, BookOpen, AlignCenterVertical as Certificate, Target, MessageSquare, Layout, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: FileText, label: 'Admit Card', path: '/admit-card' },
    { icon: Award, label: 'Results', path: '/results' },
    { icon: BookOpen, label: 'Study Materials', path: '/study-materials' },
    { icon: Certificate, label: 'Certificates', path: '/certificates' },
    { icon: Target, label: 'Answer Keys', path: '/answer-key' },
    { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
    { icon: Layout, label: 'Practice OMR', path: '/practice-omr' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setStudent({
        "Student's name": "John Doe",
        "Roll no": "2024001",
        "Class": "X",
        "Section": "A",
        "Father's Name": "Robert Doe",
        "Mother's Name": "Sarah Doe",
        "School": "Modern High School",
        "School Code": "MHS001",
        "Mob No": "1234567890",
        "City": "New York"
      });
      setLoading(false);
    }, 1000);
  }, []);

  const StudentInfoCard = ({ label, value }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300"
    >
      <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
      <p className="text-gray-900 text-lg font-semibold">{value}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-50 flex">
      
      {/* Sidebar */}
      <aside 
        className={`fixed lg:static lg:translate-x-0 z-50 h-screen w-72 bg-white/90 backdrop-blur-xl border-r border-white/20 transition-transform duration-300 shadow-md
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
            >
              Student Portal
            </motion.h3>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <nav className="mt-6 space-y-6">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(item.path)}
                className="flex items-center w-full px-4 py-3.5 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 group"
              >
                <item.icon className="w-5 h-5 text-blue-600" />
                <span className="ml-3 font-medium group-hover:text-blue-600 transition-colors">{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 text-blue-600" />
              </motion.button>
            ))}
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: menuItems.length * 0.1 }}
              onClick={() => navigate('/')}
              className="flex items-center w-full px-4 py-3.5 mt-6 text-red-500 rounded-xl hover:bg-red-50/50 transition-all duration-300 group"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3 font-medium">Logout</span>
            </motion.button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen p-8">
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <Menu size={28} />
          </button>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-semibold shadow-lg ring-4 ring-white/50">
              {student?.["Student's name"]?.charAt(0) || 'S'}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loading ? 'Loading...' : `Welcome, ${student?.["Student's name"]}`}
              </h2>
              <p className="text-gray-600 mt-1">Your Dashboard Overview</p>
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-500"></div>
          </div>
        ) : student ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Object.entries(student).map(([label, value]) => (
              <StudentInfoCard key={label} label={label} value={value} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-500">No student details found.</div>
        )}
      </main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;
