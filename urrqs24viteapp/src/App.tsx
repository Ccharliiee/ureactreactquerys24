import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./helper/httpRequest.tsx";
import AppHome from "./components/AppHome.tsx";
import Events from "./components/Events/Events.tsx";
import EventDetails from "./components/Events/EventDetails.tsx";
import NewEvent from "./components/Events/NewEvent.tsx";
import EditEvent, {
  eventDataLoader,
  uploadEditedEventAction,
} from "./components/Events/EditEvent.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppHome />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
        loader: eventDataLoader,
        action: uploadEditedEventAction,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
