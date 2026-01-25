import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/Home";
import { AboutPage } from "./pages/About";
import { CurriculumPage } from "./pages/Curriculum";
import { SkillsPage } from "./pages/Skills";
import { ProjectsPage } from "./pages/Projects";
import { HobbiesPage } from "./pages/Hobbies";
import { ContactPage } from "./pages/Contact";
import { ResumePage } from "./pages/Resume";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "about", element: <AboutPage /> },
        { path: "curriculum", element: <CurriculumPage /> },
        { path: "skills", element: <SkillsPage /> },
        { path: "projects", element: <ProjectsPage /> },
        { path: "hobbies", element: <HobbiesPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "resume", element: <ResumePage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
