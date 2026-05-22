import { useState } from "react";
import { useAuthStore } from "../store/authStore";

function Topbar() {
  const logout =
    useAuthStore(
      (state) => state.logout
    );

  const [isOpen, setIsOpen] = useState(false);

  return (

    <header className="bg-white border-b px-8 py-4 flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold">

          Welcome back 

        </h2>

        <p className="text-gray-500 text-sm">

          Monitor your API platform
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="relative">
          <button
            onClick={() => setIsOpen((value) => !value)}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
          >
            Notifications
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border rounded-2xl shadow-lg z-10">
              <div className="p-4 border-b">
                <span className="font-semibold">Notifications</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  You have no new notifications.
                </p>
              </div>
            </div>
          )}
        </div>

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