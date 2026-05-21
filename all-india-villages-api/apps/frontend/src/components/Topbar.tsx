import { useAuthStore } from "../store/authStore";

function Topbar() {

  const logout =
    useAuthStore(
      (state) => state.logout
    );

  return (

    <header className="bg-white border-b px-8 py-4 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold">

          Welcome back 👋

        </h2>

        <p className="text-gray-500 text-sm">

          Monitor your API platform
        </p>

      </div>

      <div className="flex items-center gap-4">

        <button className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200">

          🔔 Notifications

        </button>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-black text-white"
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Topbar;