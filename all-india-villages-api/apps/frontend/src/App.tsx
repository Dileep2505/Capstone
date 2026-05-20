import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import {
  useAuthStore,
} from "./store/authStore";

function App() {

  const token =
    useAuthStore(
      (state) => state.token
    );

  if (!token) {

    return <LoginPage />;
  }

  return <DashboardPage />;
}

export default App;