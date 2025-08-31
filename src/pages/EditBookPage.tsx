import { useNavigate, useParams } from "react-router";
import { useGetBookByIdQuery, useUpdateBookMutation } from "../redux/features/book/bookSlice";
import type { Genre } from "../redux/features/book/books.types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const GENRES: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function EditBookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const book = data?.data;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = Object.fromEntries(fd.entries());
    const res = await updateBook({
      id: id!,
      body: {
        title: body.title as string,
        author: body.author as string,
        genre: body.genre as Genre,
        isbn: body.isbn as string,
        description: (body.description as string) || undefined,
        copies: Number(body.copies),
        available: body.available === "on",
      },
    }).unwrap();
    if (res.success) navigate(`/books/${id}`);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">✏️ Edit Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input name="title" id="title" defaultValue={book.title} />
            </div>

            <div>
              <Label htmlFor="author">Author</Label>
              <Input name="author" id="author" defaultValue={book.author} />
            </div>

            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select name="genre" defaultValue={book.genre}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="isbn">ISBN</Label>
              <Input name="isbn" id="isbn" defaultValue={book.isbn} />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                name="description"
                id="description"
                defaultValue={book.description}
                className="w-full border rounded-md p-2 h-24"
              />
            </div>

            <div>
              <Label htmlFor="copies">Copies</Label>
              <Input
                name="copies"
                id="copies"
                type="number"
                min={0}
                defaultValue={book.copies}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="available"
                defaultChecked={book.available}
                className="h-4 w-4"
              />
              <Label>Available</Label>
            </div>

            <Button variant="secondary" type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Saving..." : "💾 Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
