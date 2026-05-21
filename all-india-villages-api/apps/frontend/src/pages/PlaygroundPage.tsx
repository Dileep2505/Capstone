import {
  useState,
} from "react";

import {
  runApiRequest,
} from "../services/playgroundApi";

function PlaygroundPage() {

  const [endpoint, setEndpoint] =
    useState("/v1/states");

  const [apiKey, setApiKey] =
    useState("");

  const [apiSecret, setApiSecret] =
    useState("");

  const [response, setResponse] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const runRequest =
    async () => {

      try {

        setLoading(true);

        const data =
          await runApiRequest(

            endpoint,

            apiKey,

            apiSecret
          );

        setResponse(data);

      } catch (error: any) {

        setResponse({

          error:
            error.response?.data
            || error.message,
        });

      } finally {

        setLoading(false);
      }
    };

  return (

  <div className="space-y-8">

    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold mb-2">

          API Playground

        </h1>

        <p className="text-gray-500">

          Test endpoints in real time

        </p>

      </div>

      <div className="bg-black text-white px-4 py-2 rounded-xl text-sm">

        Live API Console

      </div>

    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      <div className="xl:col-span-1">

        <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">

          <div>

            <label className="block mb-2 font-semibold">

              Endpoint

            </label>

            <input
              value={endpoint}
              onChange={(e) =>
                setEndpoint(e.target.value)
              }
              className="w-full border rounded-xl p-3"
              placeholder="/v1/states"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">

              API Key

            </label>

            <input
              value={apiKey}
              onChange={(e) =>
                setApiKey(e.target.value)
              }
              className="w-full border rounded-xl p-3"
              placeholder="Enter API key"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">

              API Secret

            </label>

            <input
              value={apiSecret}
              onChange={(e) =>
                setApiSecret(e.target.value)
              }
              className="w-full border rounded-xl p-3"
              placeholder="Enter API secret"
            />

          </div>

          <button
            onClick={runRequest}
            disabled={loading}
            className="w-full bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl transition"
          >

            {
              loading
                ? "Running Request..."
                : "Send Request"
            }

          </button>

          <div className="pt-4 border-t">

            <h3 className="font-semibold mb-3">

              Quick Endpoints

            </h3>

            <div className="space-y-2">

              {[
                "/v1/states",
                "/v1/districts",
                "/v1/subdistricts",
                "/v1/villages",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    setEndpoint(item)
                  }
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm font-mono"
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        </div>

      </div>

      <div className="xl:col-span-2">

        <div className="bg-black rounded-2xl shadow-lg overflow-hidden">

          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">

            <div className="flex items-center gap-2">

              <div className="w-3 h-3 bg-red-500 rounded-full" />

              <div className="w-3 h-3 bg-yellow-500 rounded-full" />

              <div className="w-3 h-3 bg-green-500 rounded-full" />

            </div>

            <span className="text-gray-400 text-sm">

              JSON Response

            </span>

          </div>

          <div className="p-6 overflow-auto max-h-[600px]">

            <pre className="text-green-400 text-sm whitespace-pre-wrap">

              {
                response
                  ? JSON.stringify(
                      response,
                      null,
                      2
                    )
                  : "Response will appear here..."
              }

            </pre>

          </div>

        </div>

      </div>

    </div>

  </div>
);
}

export default PlaygroundPage;