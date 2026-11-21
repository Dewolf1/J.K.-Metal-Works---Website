import { createBrowserRouter, Navigate, Outlet } from "react-router";
import QuickContact from "../components/QuickContact";

function Root() {
  return (
    <>
      <Outlet />
      <QuickContact />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import("../HomePage")).default }),
      },
      {
        path: "index.html",
        lazy: async () => ({ Component: (await import("../HomePage")).default }),
      },
      {
        path: "contact",
        lazy: async () => ({ Component: (await import("../ContactPage")).default }),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
