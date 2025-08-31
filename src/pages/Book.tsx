import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery, useDeleteBookMutation } from "../redux/features/book/bookSlice";
import { Link, useNavigate } from "react-router";

export default function BooksPage() {
  const { data, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-4">
      {/* Top bar */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📚 Library Books</h1>
        
        <Link to={"/create-book"}>Add Book</Link>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data?.data.map((book) => (
          <Card key={book._id} className="shadow-md">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <p className="text-sm text-gray-500">{book.author}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
              <p>
                <span className="font-semibold">Copies:</span> {book.copies}
              </p>

              <div className="flex flex-wrap gap-2">
                {/* Details */}
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/books/${book._id}`)}
                >
                  Details
                </Button>

                {/* Edit */}
                <Button
                  
                  onClick={() => navigate(`/edit-book/${book._id}`)}
                >
                  Edit
                </Button>

                {/* Borrow */}
                <Button onClick={() => navigate(`/borrow/${book._id}`)}>
                  Borrow
                </Button>

                {/* Delete */}
                <Button
                  variant="destructive"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
