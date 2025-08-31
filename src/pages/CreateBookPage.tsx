import { useNavigate } from "react-router";
import { useCreateBookMutation } from "../redux/features/book/bookSlice";
import type { CreateBookPayload, Genre } from "../redux/features/book/books.types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const GENRES: Genre[] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function CreateBookPage() {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: CreateBookPayload = {
      title: String(fd.get("title")),
      author: String(fd.get("author")),
      genre: fd.get("genre") as Genre,
      isbn: String(fd.get("isbn")),
      description: String(fd.get("description") || ""),
      copies: Number(fd.get("copies")),
      available: fd.get("available") === "on",
    };
    const res = await createBook(payload).unwrap();
    if (res.success) navigate("/books");
  };

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">➕ Add New Book</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter book title" required />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" placeholder="Enter author name" required />
            </div>

            {/* Genre */}
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select name="genre" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* ISBN */}
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input id="isbn" name="isbn" placeholder="Enter ISBN number" required />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Book description (optional)" />
            </div>

            {/* Copies */}
            <div className="space-y-2">
              <Label htmlFor="copies">Copies</Label>
              <Input id="copies" name="copies" type="number" min={0} placeholder="Number of copies" required />
            </div>

            {/* Available Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox id="available" name="available" defaultChecked />
              <Label htmlFor="available">Available</Label>
            </div>

            {/* Submit */}
            <Button variant="secondary" disabled={isLoading} className="w-full">
              {isLoading ? "Creating..." : "Create Book"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
