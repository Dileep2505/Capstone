interface SidebarProps {

  tab: string;

  setTab: (
    tab: string
  ) => void;
}

function Sidebar({
  tab,
  setTab,
}: SidebarProps) {

  const itemClass = (
    active: boolean
  ) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition font-medium ${
      active
        ? "bg-black text-white shadow"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (

    <aside className="w-72 bg-white border-r min-h-screen p-6 flex flex-col justify-between">

      <div>

        <div className="mb-10">

          <h1 className="text-3xl font-bold tracking-tight">

            VillageAPI

          </h1>

          <p className="text-sm text-gray-500 mt-2">

            Developer Platform
          </p>

        </div>

        <nav className="space-y-3">

          <button
            onClick={() =>
              setTab("dashboard")
            }
            className={itemClass(
              tab === "dashboard"
            )}
          >
            📊 Dashboard
          </button>

          <button
            onClick={() =>
              setTab("playground")
            }
            className={itemClass(
              tab === "playground"
            )}
          >
            ⚡ API Playground
          </button>

          <button
            onClick={() =>
              setTab("logs")
            }
            className={itemClass(
              tab === "logs"
            )}
          >
            📡 Live Logs
          </button>

          <button
            onClick={() =>
              setTab("apiKeys")
            }
            className={itemClass(
              tab === "apiKeys"
            )}
          >
            🔑 API Keys
          </button>

          <button
            onClick={() =>
              setTab("subscription")
            }
            className={itemClass(
              tab === "subscription"
            )}
          >
            💳 Plans
          </button>

          <button
            onClick={() =>
              setTab("docs")
            }
            className={itemClass(
              tab === "docs"
            )}
          >
            📘 API Docs
          </button>

          <button
            onClick={() =>
              setTab("users")
            }
            className={itemClass(
              tab === "users"
            )}
          >
            👥 Users
          </button>

        </nav>

      </div>

      <div className="mt-10 p-5 rounded-3xl bg-gradient-to-br from-black to-gray-800 text-white">

        <div className="flex items-center justify-between mb-3">

          <span className="font-semibold">

            Pro Plan

          </span>

          <span className="text-sm opacity-80">

            37%

          </span>

        </div>

        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">

          <div className="w-[37%] h-full bg-white rounded-full" />

        </div>

        <p className="text-xs opacity-80 mt-3">

          37,420 / 100k requests

        </p>

        <button className="mt-5 w-full bg-white text-black py-2 rounded-xl font-medium hover:bg-gray-200 transition">

          Upgrade Plan

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;