const LogIn = () => {
  return (
    <div className="h-auto bg-amber-100 px-12 py-24 flex items-center justify-center">
      <div className="bg-neutral-50 shadow-lg shadow-black/50 rounded-lg px-16 py-10">
        <p className="mb-10 text-amber-950 font-semibold text-3xl flex justify-center">
          Log In
        </p>
        <div className="mt-4">
          <div>
            <label>Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-amber-100 text-amber-950 p-2 border-2 border-gray-500 outline-amber-800 outline-offset-2"
              placeholder="username"
              name="username"
              required
            />
          </div>
          <div className="mt-8">
            <label>Password</label>
            <input
              type="text"
              className="w-full mt-2 bg-amber-100 text-amber-950 p-2 border-2 border-gray-500 outline-amber-800 outline-offset-2"
              placeholder="password"
              name="password"
              required
            />
          </div>
          <div className="mt-12 flex justify-center items-center">
            <button className="text-amber-950 bg-amber-100 shadow shadow-amber-950 rounded-3xl text-xl font-semibold px-6 py-2 text-center hover:text-white hover:bg-amber-950 hover:scale-110 transition-transform focus:ring-2 focus:ring-gray-200">
              LogIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
