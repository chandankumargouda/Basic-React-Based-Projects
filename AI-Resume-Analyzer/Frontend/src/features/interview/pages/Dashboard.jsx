const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#050507] text-white">

      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          <div className="flex items-center gap-3">
            <img
              src="/careerlens-logo.png"
              alt="CareerLens AI"
              className="h-10 w-10 object-contain"
            />

            <span className="text-xl font-bold">
              CareerLens{" "}
              <span className="text-blue-400">AI</span>
            </span>
          </div>

          <div className="hidden gap-7 text-sm text-gray-400 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#how" className="hover:text-white">
              How It Works
            </a>
            <a href="#about" className="hover:text-white">
              About
            </a>
          </div>

          <div className="flex gap-2">
            <a
              href="/login"
              className="rounded-lg px-4 py-2 text-sm hover:bg-white/10"
            >
              Login
            </a>

            <a
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold transition hover:bg-blue-500"
            >
              Register
            </a>
          </div>

        </div>
      </nav>


      {/* Hero */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24">

        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          {/* Hero text */}
          <div className="text-center lg:text-left">

            <span className="inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-semibold tracking-widest text-blue-400">
              AI-POWERED CAREER PLATFORM
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight sm:text-6xl">
              Build a resume
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                that gets noticed.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-gray-400 lg:mx-0">
              CareerLens AI analyzes your resume, finds missing skills,
              checks ATS compatibility, matches jobs and prepares you
              for interviews.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">

              <a
                href="/login"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-semibold shadow-lg shadow-blue-600/20 transition hover:-translate-y-1 hover:shadow-blue-500/40"
              >
                Analyze My Resume →
              </a>

              <a
                href="#how"
                className="rounded-xl border border-white/10 px-6 py-3 font-semibold text-gray-300 transition hover:bg-white/10"
              >
                How It Works
              </a>

            </div>

          </div>


          {/* Logo / Analysis Card */}
          <div className="relative mx-auto w-full max-w-md">

            <div className="absolute inset-0 rounded-full bg-blue-600/20 blur-[100px]" />

            <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">

              <img
                src="/careerlens-logo.png"
                alt="CareerLens AI"
                className="mx-auto h-64 w-64 object-contain"
              />

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-5">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      RESUME SCORE
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      Excellent
                    </p>
                  </div>

                  <div className="text-4xl font-black text-blue-400">
                    87<span className="text-sm text-gray-500">/100</span>
                  </div>
                </div>

                <div className="mt-5 h-2 rounded-full bg-gray-800">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
                </div>

                <div className="mt-5 grid grid-cols-3 gap-2 text-center">

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-gray-500">ATS</p>
                    <p className="font-bold">92%</p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-gray-500">Skills</p>
                    <p className="font-bold">88%</p>
                  </div>

                  <div className="rounded-xl bg-white/5 p-3">
                    <p className="text-xs text-gray-500">Match</p>
                    <p className="font-bold">84%</p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* How It Works */}
      <section
        id="how"
        className="border-y border-white/10 bg-white/[0.02] px-5 py-20"
      >
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-sm font-semibold text-blue-400">
              HOW IT WORKS
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From Resume to Career Insights
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-2 hover:border-blue-500/40">
              <span className="text-3xl">01</span>
              <h3 className="mt-5 text-xl font-bold">
                Upload
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Upload your resume and provide your target job details.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-2 hover:border-blue-500/40">
              <span className="text-3xl">02</span>
              <h3 className="mt-5 text-xl font-bold">
                AI Analysis
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Our AI analyzes your skills, experience and job compatibility.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-2 hover:border-blue-500/40">
              <span className="text-3xl">03</span>
              <h3 className="mt-5 text-xl font-bold">
                Improve
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Get personalized recommendations and interview preparation.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Features */}
      <section id="features" className="px-5 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <p className="text-sm font-semibold text-blue-400">
              POWERFUL FEATURES
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything You Need to Get Career Ready
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {[
              ["🎯", "ATS Score", "Check your resume compatibility with ATS systems."],
              ["🧠", "AI Analysis", "Get intelligent insights about your resume."],
              ["🔑", "Skill Gap", "Find skills you need for your target role."],
              ["💼", "Job Matching", "Discover jobs that match your profile."],
              ["🎤", "Interview Prep", "Generate technical and behavioral questions."],
              ["📊", "Career Report", "Get your complete career readiness report."],
            ].map(([icon, title, text]) => (

              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-500/30 hover:bg-blue-500/[0.05]"
              >

                <div className="text-3xl transition group-hover:scale-110">
                  {icon}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {text}
                </p>

              </div>

            ))}

          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="px-5 py-20">

        <div className="mx-auto max-w-5xl rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-600/10 to-violet-600/10 px-6 py-16 text-center">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to improve your career?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Let CareerLens AI analyze your resume and show you
            where you can improve.
          </p>

          <a
            href="/login"
            className="mt-7 inline-block rounded-xl bg-white px-7 py-3 font-bold text-black transition hover:-translate-y-1 hover:shadow-xl"
          >
            Get Started →
          </a>

        </div>

      </section>


      {/* Footer */}
      <footer className="border-t border-white/10 px-5 py-10">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-sm text-gray-500 md:flex-row">

          <div className="flex items-center gap-2">

            <img
              src="/careerlens-logo.png"
              alt="CareerLens AI"
              className="h-8 w-8 object-contain"
            />

            <span>
              © 2026 CareerLens AI
            </span>

          </div>

          <div className="flex gap-5">
            <a href="/about" className="hover:text-white">
              About
            </a>

            <a href="/terms" className="hover:text-white">
              Terms
            </a>

            <a href="/privacy" className="hover:text-white">
              Privacy
            </a>
          </div>

        </div>

      </footer>

    </div>
  );
};

export default Dashboard;