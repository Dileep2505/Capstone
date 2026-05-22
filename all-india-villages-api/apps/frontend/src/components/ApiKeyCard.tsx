interface Props {

  apiKey: {

    id: string;

    key: string;

    isActive: boolean;

    createdAt: string;
  };

  onRevoke: (
    id: string
  ) => void;
}

function ApiKeyCard({
  apiKey,
  onRevoke,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center justify-between">

        <div>

          <h3 className="font-bold">

            {apiKey.key}

          </h3>

          <p className="text-sm text-gray-500 mt-1">

            Created:
            {" "}
            {
              new Date(
                apiKey.createdAt
              ).toLocaleDateString()
            }

          </p>

          <p
            className={
              apiKey.isActive
                ? "text-green-600 mt-2"
                : "text-red-600 mt-2"
            }
          >

            {
              apiKey.isActive
                ? "Active"
                : "Revoked"
            }

          </p>

        </div>

        <button
          onClick={() =>
            onRevoke(apiKey.id)
          }
          disabled={!apiKey.isActive}
          className={`px-4 py-2 rounded font-medium ${apiKey.isActive ? "bg-red-500 text-white" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
        >
          {apiKey.isActive ? "Revoke" : "Revoked"}
        </button>

      </div>

    </div>
  );
}

export default ApiKeyCard;