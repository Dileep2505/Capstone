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
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      active
        ? "bg-black text-white"
        : "hover:bg-gray-100 text-gray-700"
    }`;

  return (

    <aside className="w-72 bg-white border-r min-h-screen p-5">

      <div className="mb-8">

        <h1 className="text-2xl font-bold">

          VillageAPI

        </h1>

        <p className="text-sm text-gray-500 mt-1">

          Developer Platform
        </p>

      </div>

      <nav className="space-y-2">

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
            setTab("ai")
          }
          className={itemClass(
            tab === "ai"
          )}
        >
          ✨ AI Search
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

      </nav>

      <div className="mt-10 p-4 rounded-2xl bg-gray-100">

        <div className="flex items-center justify-between mb-2">

          <span className="font-medium">
            Pro Plan
          </span>

          <span className="text-sm text-gray-500">
            37%
          </span>

        </div>

        <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">

          <div className="w-[37%] h-full bg-black rounded-full" />

        </div>

        <p className="text-xs text-gray-500 mt-2">

          37,420 / 100k requests
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;