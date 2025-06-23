import { useNavigate } from "react-router-dom";

export default function StartingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-12 w-full max-w-md text-center border border-gray-100">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-5xl font-light text-gray-800 tracking-tight">
            Welcome
          </h1>
          <p className="text-gray-700 font-light mt-5 text-base">Begin your experience</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-normal text-base py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </div>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div> 
          </div>
        </div>
      </div>
    </div>
  );
}
