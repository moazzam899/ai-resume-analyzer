import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-950 text-white">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-10 py-6 border-b border-red-900">

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
        <div className="flex gap-4">

          <Link
            to="/login"
            className="hover:scale-105 transition-all duration-300 px-5 py-2 rounded-lg border border-red-700 hover:bg-red-700 transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hover:scale-105
transition-all
duration-300  px-5 py-2 rounded-lg bg-red-700 hover:bg-red-800 transition"
          >
            Signup
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-10 py-24 grid md:grid-cols-2 gap-16 items-center">

        <div>

          <h1 className="text-6xl font-extrabold leading-tight">

            Analyze Your Resume

            <span className="text-red-500">

              {" "}Using AI

            </span>

          </h1>


          <p className="text-gray-300 text-xl mt-8">

            Upload your resume and instantly get ATS Score,
            AI Suggestions, Missing Skills and Interview Questions.

          </p>

          <div className="mt-10 flex gap-5">

            <Link
              to="/signup"
              className="hover:-translate-y-1
transition-all
duration-300
shadow-xl  bg-gradient-to-r from-red-700 to-red-900 px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="hover:-translate-y-1
transition-all
duration-300
shadow-xl  border border-red-700 hover:border-red-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl hover:bg-red-700"
            >
              Login
            </Link>

          </div>

        </div>

        <div>

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            className="rounded-3xl shadow-2xl"
            alt=""
          />

        </div>

      </section>


    <section className="py-20">

<h2 className="text-4xl font-bold text-center mb-12">
Features
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-zinc-900 border border-red-900 rounded-3xl p-8">
<h3 className="text-xl font-bold mb-4">
ATS Score
</h3>

<p className="text-gray-400">
Get instant ATS score for your resume.
</p>

</div>

<div className="bg-zinc-900 border border-red-900 rounded-3xl p-8">
<h3 className="text-xl font-bold mb-4">
AI Suggestions
</h3>

<p className="text-gray-400">
Receive AI-powered improvements.
</p>

</div>

<div className="bg-zinc-900 border border-red-900 rounded-3xl p-8">
<h3 className="text-xl font-bold mb-4">
Interview Questions
</h3>

<p className="text-gray-400">
Generate interview questions instantly.
</p>

</div>

</div>

</section>


{/* Features */}

<section className="max-w-7xl mx-auto px-10 py-20">

  <h2 className="text-5xl font-bold text-center mb-16">
    Powerful Features
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300">

      <div className="text-5xl mb-5">
        📄
      </div>

      <h3 className="hover:scale-105
hover:border-red-500
transition-all
duration-300 text-2xl font-bold mb-3">
        Resume Upload
      </h3>

      <p className="hover:scale-105
hover:border-red-500
transition-all
duration-300 text-gray-400">
        Upload your PDF resume securely using AWS S3 Storage.
      </p>

    </div>

    <div className="hover:scale-105
hover:border-red-500
transition-all
duration-300  bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300">

      <div className="text-5xl mb-5">
        🤖
      </div>

      <h3 className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-2xl font-bold mb-3">
        AI Analysis
      </h3>

      <p className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-gray-400">
        Get ATS Score, strengths, weaknesses and missing skills.
      </p>

    </div>

    <div className="hover:scale-105
hover:border-red-500
transition-all
duration-300  bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300">

      <div className="text-5xl mb-5">
        🎯
      </div>

      <h3 className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-2xl font-bold mb-3">
        ATS Score
      </h3>

      <p className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-gray-400">
        Improve your resume with AI-powered ATS recommendations.
      </p>

    </div>

    <div className="hover:scale-105
hover:border-red-500
transition-all
duration-300  bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300">

      <div className="text-5xl mb-5">
        💼
      </div>

      <h3 className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-2xl font-bold mb-3">
        Interview Prep
      </h3>

      <p className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-gray-400">
        Generate HR, Technical and Project interview questions instantly.
      </p>

    </div>

  </div>

</section>


<section className="py-20">

<h2 className="text-4xl font-bold text-center mb-12">
How It Works
</h2>

<div className="grid md:grid-cols-4 gap-6">

<div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300">
<h3>1</h3>
<p>Upload Resume</p>
</div>

<div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300">
<h3>2</h3>
<p>AI Analysis</p>
</div>

<div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300"><h3>3</h3>
<p>ATS Score</p>
</div>

<div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8 hover:scale-105 duration-300"><h3>4</h3>
<p>Interview Questions</p>
</div>

</div>

</section>


{/* Stats */}

<section className="max-w-7xl mx-auto px-10 py-20">

  <div className="grid md:grid-cols-4 gap-8 text-center">

    <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8">
      <h2 className="text-5xl font-bold text-red-500">95%</h2>
      <p className="text-gray-400 mt-3">ATS Accuracy</p>
    </div>

    <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8">
      <h2 className="text-5xl font-bold text-red-500">AI</h2>
      <p className="text-gray-400 mt-3">Resume Analysis</p>
    </div>

    <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8">
      <h2 className="text-5xl font-bold text-red-500">24/7</h2>
      <p className="text-gray-400 mt-3">Available</p>
    </div>

    <div className="bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8">
      <h2 className="text-5xl font-bold text-red-500">100%</h2>
      <p className="text-gray-400 mt-3">Secure Upload</p>
    </div>

  </div>

</section>

{/* Why Choose Us */}

<section className="max-w-6xl mx-auto px-10 py-20">

  <h2 className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-5xl font-bold text-center mb-16">
    Why Choose AI Resume Analyzer?
  </h2>

  <div className="grid md:grid-cols-2 gap-12">

    <div className="hover:scale-105
hover:border-red-500
transition-all
duration-300  bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8">

      <h3 className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-3xl font-bold mb-5">
        🚀 Faster Hiring
      </h3>

      <p className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-gray-400">
        Optimize your resume for ATS systems and improve your chances of getting shortlisted.
      </p>

    </div>

    <div className="hover:scale-105
hover:border-red-500
transition-all
duration-300  bg-zinc-900/70 backdrop-blur-xl border border-red-900 rounded-3xl p-8">

      <h3 className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-3xl font-bold mb-5">
        🤖 AI Powered
      </h3>

      <p className="hover:scale-105
hover:border-red-500
transition-all
duration-300  text-gray-400">
        Get AI-generated resume analysis, missing skills and interview preparation in seconds.
      </p>

    </div>

  </div>

</section>

{/* CTA */}

<section className="py-24 text-center">

  <h2 className="text-5xl font-bold">
    Ready To Improve Your Resume?
  </h2>

  <p className="text-gray-400 mt-6 text-xl">
    Upload your resume and let AI help you land your dream job.
  </p>

  <Link
    to="/signup"
    className="inline-block mt-10 bg-gradient-to-r from-red-700 to-red-900 px-10 py-4 rounded-xl hover:scale-105 transition-all duration-300"
  >
    Get Started Now
  </Link>

</section>

<footer className="border-t border-red-900 py-8 text-center text-gray-500">

<p>
© 2026 AI Resume Analyzer
</p>

<p className="mt-2">
Built with MERN + Groq + AWS S3 
</p>
<p className="mt-3">
📧 moazzamabbasi2002@gmail.com
</p>
<p className="mt-3">
📱 +91-6307733596
</p>


</footer>

    </div>
  );
};

export default Home;