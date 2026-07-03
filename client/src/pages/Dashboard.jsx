import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useRef } from "react";
import logo from "../assets/logo.png";
import {
  FaFilePdf,
  FaHistory,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
} from "react-icons/fa";


const Dashboard = () => {
  const token = localStorage.getItem("token");

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedResume, setSelectedResume] = useState(null);
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState(null);
  const interviewRef = useRef(null);

  useEffect(() => {
  fetchHistory();
}, []);

useEffect(() => {
  if (questions && interviewRef.current) {
    interviewRef.current.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  }
}, [questions]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const fetchHistory = async () => {
  try {
    const res = await api.get("/resume/history");

    console.log(res.data.data);

    setHistory(res.data.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchResume = async (id) => {
  try {
    const res = await api.get(`/resume/${id}`);

    setSelectedResume(res.data.data);
  } catch (error) {
    toast.error("Failed to fetch resume");
  }
};

const handleInterview = async (id) => {
  try {
    const res = await api.get(`/resume/interview/${id}`);

    console.log("INTERVIEW DATA:", res.data.data);

    setQuestions(res.data.data);

  } catch (error) {
    console.log(error);
    toast.error("Failed to load interview questions");
  }
};

const handleViewAnalysis = async (id) => {
  try {
    const res = await api.get(`/resume/${id}`);

    setAnalysis(res.data.data);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  } catch (error) {
    console.log(error);

    toast.error("Failed to load analysis");
  }
};

const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this resume?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/resume/${id}`);

    toast.success("Resume Deleted Successfully");

    fetchHistory();

    setAnalysis(null);

  } catch (error) {
    console.log(error);

    toast.error("Delete Failed");
  }
};

const handleDownload = async (id) => {
  try {
    const res = await api.get(`/resume/download/${id}`);

    window.open(res.data.data.fileUrl, "_blank");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Download Failed"
    );
  }
};

  const handleUpload = async () => {
  if (!resume) {
    toast.error("Please select a resume");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();

    formData.append("resume", resume);

    const res = await api.post("/resume/upload", formData);

    console.log(res.data);

    setAnalysis(res.data.data);

    toast.success("Resume Uploaded Successfully");

    setResume(null);

    if (fileInputRef.current) {
    fileInputRef.current.value = "";
    }

    fetchHistory();
 } 
    catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Upload Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-900 to-red-950 text-white">

      {/* Navbar */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-red-900 text-white px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
  <img
    src={logo}
    alt="logo"
    className="w-10 h-10 rounded-lg"
  />

  <h1 className="text-2xl font-bold">
    AI Resume Analyzer
  </h1>
</div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="bg-gradient-to-r from-red-700 to-red-900 hover:scale-105 transition px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">

        <h2 className="text-3xl font-bold mb-8">
          Welcome 👋
        </h2>

        {/* Upload Card */}
        <div className="bg-zinc-900/70
backdrop-blur-xl
border
border-red-900
rounded-3xl
shadow-2xl p-8 mb-8">

          <h3 className="text-2xl font-semibold mb-4">
            Upload Resume
          </h3>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="w-full bg-black/30 border border-red-900 rounded-xl p-3 text-white file:bg-red-700 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:mr-4"

        />

        <button
  onClick={handleUpload}
  disabled={loading}
  className={`px-6 py-3 rounded-lg mt-4 text-white flex items-center gap-2 transition-all
    ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-red-800 hover:bg-red-800"
    }`}
>
  {loading ? (
    <>
      <FaSpinner className="animate-spin" />
      Uploading...
    </>
  ) : (
    "Upload Resume"
  )}
</button>

        </div>

        {/* Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">
           <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <FaChartLine className="text-blue-600" />
             ATS Score
          </h3>

            <div className="mt-4">

  <p className="text-5xl font-bold text-red-500">
    {analysis?.atsScore || "--"}%
  </p>

  <div className="w-full h-3 bg-zinc-700 rounded-full mt-5 overflow-hidden">

    <div
      className="h-full bg-gradient-to-r from-red-700 to-red-500 transition-all duration-700"
      style={{
        width: `${analysis?.atsScore || 0}%`,
      }}
    ></div>

  </div>

  <p className="mt-3 text-gray-300">

    {analysis?.atsScore >= 80
      ? "Excellent Resume ✅"
      : analysis?.atsScore >= 60
      ? "Good Resume 👍"
      : "Needs Improvement ⚠️"}

  </p>

</div>


          </div>

          <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
            <FaCheckCircle className="text-green-600" />
              Strengths
            </h3>

            <ul>
             {analysis?.strengths?.map((item, index) => (
             <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">
             <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
               <FaTimesCircle className="text-red-600" />
                 Weaknesses
             </h3>

            <ul>
             {analysis?.weaknesses?.map((item, index) => (
             <li key={index}>❌ {item}</li>
               ))}
            </ul>
          </div>

          <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl shadow-xl p-6 hover:scale-[1.02] transition-all duration-300">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
              <FaLightbulb className="text-yellow-500" />
               Suggestions
            </h3>

            <ul>
              {analysis?.suggestions?.map((item, index) => (
              <li key={index}>💡 {item}</li>
               ))}
            </ul>
          </div>

        </div>

        {/* Resume History */}

<div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl shadow-2xl p-6 mt-8">

  <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
  <FaHistory className="text-blue-600" />
  Resume History
  </h2>

  <input
  type="text"
  placeholder="Search Resume..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full bg-zinc-800 border border-red-900 rounded-xl p-3 mb-5 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-700"
/>

  {history.length === 0 ? (

    <p className="text-gray-500">
      No Resume Uploaded Yet
    </p>

  ) : (

   history
  .filter((item) =>
    item.fileName.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => (

      <div
  key={item._id}
  className="border rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition"
>

        <h3 className="font-bold text-lg flex items-center gap-2">
          <FaFilePdf className="text-red-600" />
          {item.fileName}
        </h3>

        <p className="mt-2">
          ATS Score :
          <span className="font-bold text-green-600 ml-2">
            {item.atsScore}
          </span>
        </p>

       <button
        onClick={(e)=>{
        e.stopPropagation();
        fetchResume(item._id);
      }}
        className="mt-4 bg-gradient-to-r
from-red-700
to-red-900
hover:scale-105
duration-300 text-white px-4 py-2 rounded hover:bg-blue-700"
       >
  View Details
</button>

        <p className="text-gray-500 mt-2">
          Uploaded :
          {new Date(item.createdAt).toLocaleString()}
        </p>

        <div className="flex gap-3 mt-4">

  <button
    onClick={(e)=>{
    e.stopPropagation();
    handleDownload(item._id);
   }}
    className="bg-emerald-700 hover:bg-emerald-700 border border-green-700 hover:scale-105 duration-300 text-white px-4 py-2 rounded-lg"
  >
    Download
  </button>

</div>

        <div className="flex gap-3 mt-4">

  <button
    onClick={(e)=>{
    e.stopPropagation();
    handleViewAnalysis(item._id);
  }}
    className="bg-indigo-800 hover:bg-indigo-980 border border-red-700 hover:scale-105 duration-300 text-white px-4 py-2 rounded-lg "
  >
    View Analysis
  </button>

<button
  onClick={() => handleInterview(item._id)}
  className="bg-amber-600 hover:bg-amber-700 border border-zinc-600 text-white px-4 py-2 rounded-lg"
>
  Interview Questions
</button>

  <button
    onClick={(e)=>{
    e.stopPropagation();
    handleDelete(item._id);
  }}
    className="bg-red-600 hover:bg-red-700 border border-red-700 hover:scale-105 duration-300 text-white px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>

      </div>

    ))

  )}

</div>


      </div>

      {questions && (
  <div 
  ref={interviewRef}
  className="bg-zinc-900 border border-red-900 rounded-2xl p-6 mt-6 text-white">

    <h2 className="text-2xl font-bold mb-4">
      Interview Questions
    </h2>

    <h3 className="font-bold text-green-400">HR Questions</h3>
    <ul className="mb-4 list-disc ml-5">
      {questions.hrQuestions?.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>

    <h3 className="font-bold text-blue-400">Technical Questions</h3>
    <ul className="mb-4 list-disc ml-5">
      {questions.technicalQuestions?.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>

    <h3 className="font-bold text-yellow-400">Project Questions</h3>
    <ul className="list-disc ml-5">
      {questions.projectQuestions?.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>

  </div>
)}

    {selectedResume && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-zinc-900 border border-red-900 rounded-3xl p-8 w-[700px] max-h-[90vh] overflow-y-auto text-white">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Resume Analysis
        </h2>

        <button
          onClick={() => setSelectedResume(null)}
          className="text-red-600 text-xl"
        >
          ✕
        </button>

      </div>

      <hr className="my-4"/>

      <h3 className="font-bold text-lg">
        ATS Score : {selectedResume.atsScore}
      </h3>

      <div className="mt-6">

        <h4 className="font-bold">
          Strengths
        </h4>

        <ul className="list-disc ml-6">
          {selectedResume.strengths?.map((item,index)=>(
            <li key={index}>{item}</li>
          ))}
        </ul>

      </div>

      <div className="mt-6">

        <h4 className="font-bold">
          Weaknesses
        </h4>

        <ul className="list-disc ml-6">
          {selectedResume.weaknesses?.map((item,index)=>(
            <li key={index}>{item}</li>
          ))}
        </ul>

      </div>

      <div className="mt-6">

        <h4 className="font-bold">
          Missing Skills
        </h4>

        <ul className="list-disc ml-6">
          {selectedResume.missingSkills?.map((item,index)=>(
            <li key={index}>{item}</li>
          ))}
        </ul>

      </div>

      <div className="mt-6">

        <h4 className="font-bold">
          Suggestions
        </h4>

        <ul className="list-disc ml-6">
          {selectedResume.suggestions?.map((item,index)=>(
            <li key={index}>{item}</li>
          ))}
        </ul>

      </div>

    </div>

  </div>
)}

    </div>
  );
};

export default Dashboard;