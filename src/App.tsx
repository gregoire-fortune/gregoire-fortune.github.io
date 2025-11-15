import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/Home/HomePage";
import { AboutPage } from "./pages/About/AboutPage";
import { CurriculumPage } from "./pages/Curriculum/CurriculumPage";
import { SkillsPage } from "./pages/Skills/SkillsPage";
import { ProjectsPage } from "./pages/Projects/ProjectsPage";
import { HobbiesPage } from "./pages/Hobbies/HobbiesPage";
import { ContactPage } from "./pages/Contact/ContactPage";
import { ResumePage } from "./pages/Resume/ResumePage";

const router = createBrowserRouter([
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
