import Layout from "@/page/Layout";
import Year from "@/page/Year";
import Month from "@/page/Month";
import New from "@/page/New";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'year',
        element: <Year />
      },
      {
        path: 'month',
        element: <Month />
      }
    ]
  },
  {
    path: '/new',
    element: <New />
  }

])

export default router