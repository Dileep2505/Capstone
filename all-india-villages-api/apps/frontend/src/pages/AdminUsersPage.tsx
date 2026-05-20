import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {

  getUsers,

  suspendUser,

  activateUser,

} from "../services/adminUsersApi";

function AdminUsersPage() {

  const queryClient =
    useQueryClient();

  const {
    data,
    isLoading,
  } = useQuery({

    queryKey:
      ["admin-users"],

    queryFn:
      getUsers,
  });

  const suspendMutation =
    useMutation({

      mutationFn:
        suspendUser,

      onSuccess: () => {

        queryClient.invalidateQueries({

          queryKey:
            ["admin-users"],
        });
      },
    });

  const activateMutation =
    useMutation({

      mutationFn:
        activateUser,

      onSuccess: () => {

        queryClient.invalidateQueries({

          queryKey:
            ["admin-users"],
        });
      },
    });

  if (isLoading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  return (

    <div>

      <h1 className="text-4xl font-bold mb-8">

        User Management

      </h1>

      <div className="space-y-4">

        {data.data.map(
          (user: any) => (

            <div
              key={user.id}
              className="bg-white rounded-xl shadow p-6 flex items-center justify-between"
            >

              <div>

                <h2 className="text-xl font-bold">

                  {user.email}

                </h2>

                <p className="text-gray-500">

                  {user.plan}
                  {" • "}
                  {user.status}

                </p>

                <p className="text-sm text-gray-400 mt-1">

                  Usage:
                  {" "}
                  {user.monthlyUsage}
                  /
                  {user.monthlyQuota}

                </p>

              </div>

              {user.status ===
              "ACTIVE" ? (

                <button
                  onClick={() =>
                    suspendMutation.mutate(
                      user.id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Suspend
                </button>

              ) : (

                <button
                  onClick={() =>
                    activateMutation.mutate(
                      user.id
                    )
                  }
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Activate
                </button>

              )}

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default AdminUsersPage;