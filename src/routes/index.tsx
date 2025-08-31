import Book from "@/pages/Book";
import BookDetailsPage from "@/pages/BookDetailsPage";
import BorrowBook from "@/pages/BorrowPage";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import CreateBookPage from "@/pages/CreateBookPage";
import EditBookPage from "@/pages/EditBookPage";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
        children: [
            {
                index: true,
                element: <Book/>
            },
            {
                path: "books",
                element: <Book/>
            },
            {
                path: "/create-book",
                element: <CreateBookPage/>
            },
            {
                path: "books/:id",
                element: <BookDetailsPage/>
            },
            {
                path: "edit-book/:id",
                element: <EditBookPage/>
            },
            {
                path: "borrow/:bookId",
                element: <BorrowBook/>
            },
            {
                path: "/borrow-summary",
                element: <BorrowSummaryPage/>
            }
        ]
    }
])

export default router;