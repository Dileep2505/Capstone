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

  return (

    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <div className="px-6 py-4 border-b">

        <h2 className="text-xl font-bold">

          Live API Logs

        </h2>

        <p className="text-sm text-gray-500">

          Real-time API activity
        </p>

      </div>

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

            {logs.map(
              (log, index) => (

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

    </div>
  );
}

export default LiveLogsTable;