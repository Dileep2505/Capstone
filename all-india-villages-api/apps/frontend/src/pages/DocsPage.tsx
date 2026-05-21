
function DocsPage() {

  const endpoints = [

    {
      method: "GET",
      endpoint: "/v1/states",
      description:
        "Get all Indian states",
    },

    {
      method: "GET",
      endpoint:
        "/v1/states/1/districts",
      description:
        "Get districts for a state",
    },

    {
      method: "GET",
      endpoint:
        "/v1/districts/1/subdistricts",
      description:
        "Get subdistricts for a district",
    },

    {
      method: "GET",
      endpoint:
        "/v1/subdistricts/1/villages",
      description:
        "Get villages for a subdistrict",
    },
  ];

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold mb-2">

          API Documentation

        </h1>

        <p className="text-gray-500">

          Complete developer reference

        </p>

      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b">

          <h2 className="text-2xl font-bold">

            Authentication

          </h2>

        </div>

        <div className="p-6 space-y-4">

          <p className="text-gray-700">

            Include your API credentials
            in request headers.

          </p>

          <div className="bg-black text-green-400 rounded-xl p-4 overflow-auto">

            <pre>{`x-api-key: YOUR_API_KEY
x-api-secret: YOUR_API_SECRET`}</pre>

          </div>

        </div>

      </div>

      <div className="space-y-6">

        {endpoints.map(
          (api, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden"
            >

              <div className="flex items-center justify-between px-6 py-5 border-b">

                <div>

                  <h2 className="text-2xl font-bold">

                    {api.endpoint}

                  </h2>

                  <p className="text-gray-500 mt-1">

                    {api.description}

                  </p>

                </div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-xl text-sm font-semibold">

                  {api.method}

                </span>

              </div>

              <div className="p-6 space-y-5">

                <div>

                  <h3 className="font-semibold mb-2">

                    Example Request

                  </h3>

                  <div className="bg-black text-green-400 rounded-xl p-4 overflow-auto">
                    {(() => {
                      const base = import.meta.env.VITE_API_URL || window.location.origin;
                      return <pre>{`curl ${base}${api.endpoint}`}</pre>;
                    })()}
                  </div>

                </div>

                <div>

                  <h3 className="font-semibold mb-2">

                    Example Response

                  </h3>

                  <div className="bg-black text-green-400 rounded-xl p-4 overflow-auto">

                    <pre>{`{
  "success": true,
  "data": []
}`}</pre>

                  </div>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default DocsPage;