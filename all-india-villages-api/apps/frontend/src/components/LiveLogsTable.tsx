import { useState } from "react";

import { saveAs } from "file-saver";

interface Log {

  endpoint: string;

  method: string;

  responseTime: number;

  statusCode: number;

  createdAt: string;
}

interface LiveLogsTableProps {

  logs: Log[];
}

function LiveLogsTable({
  logs,
}: LiveLogsTableProps) {

  const [search, setSearch] =
    useState("");

  const filteredLogs =
    logs.filter((log: Log) =>
      log.endpoint
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const exportCSV = () => {

    const headers = [
      "Endpoint",
      "Method",
      "Status",
      "Response Time",
      "Created At",
    ];

    const rows =
      filteredLogs.map(
        (log: Log) => [

          log.endpoint,

          log.method,

          log.statusCode,

          log.responseTime,

          new Date(
            log.createdAt
          ).toLocaleString(),
        ]
      );

    const csvContent = [

      headers.join(","),

      ...rows.map(
        (row: any[]) =>
          row.join(",")
      ),
    ].join("\n");

    const blob =
      new Blob(
        [csvContent],
        {
          type:
            "text/csv;charset=utf-8;",
        }
      );

    saveAs(
      blob,
      "api-logs.csv"
    );
  };

  return (

    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <div className="px-6 py-5 border-b flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">

            Live API Logs

          </h2>

          <p className="text-gray-500 text-sm mt-1">

            Real-time API activity

          </p>

        </div>

        <div className="flex items-center gap-3">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search endpoint..."
            className="border rounded-xl px-4 py-2 text-sm w-64"
          />

          <button
            onClick={exportCSV}
            className="bg-black text-white px-4 py-2 rounded-xl text-sm"
          >

            Export CSV

          </button>

        </div>

      </div>

      {filteredLogs.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-24">

          <div className="text-6xl mb-4">

          </div>

          <h3 className="text-2xl font-bold mb-2">

            No Logs Found

          </h3>

          <p className="text-gray-500">

            Try another search term.

          </p>

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="text-left px-6 py-4 text-sm font-semibold">

                  Endpoint

                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">

                  Method

                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">

                  Status

                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">

                  Response

                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold">

                  Time

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredLogs.map(
                (
                  log: Log,
                  index: number
                ) => (

                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50"
                  >

                    <td className="px-6 py-4 font-mono text-sm">

                      {log.endpoint}

                    </td>

                    <td className="px-6 py-4">

                      <span className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 text-xs font-medium">

                        {log.method}

                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          log.statusCode >= 200 &&
                          log.statusCode < 300
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {log.statusCode}

                      </span>

                    </td>

                    <td className="px-6 py-4">

                      {log.responseTime} ms

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">

                      {new Date(
                        log.createdAt
                      ).toLocaleString()}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default LiveLogsTable;