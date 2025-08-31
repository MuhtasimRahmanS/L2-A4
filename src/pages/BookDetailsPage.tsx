import { useParams, Link } from "react-router";
import { useGetBookByIdQuery } from "../redux/features/book/bookSlice";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id!);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !data) return <div className="text-center text-red-500 py-10">Book not found</div>;

  const b = data.data;

  return (
    <div className="max-w-3xl mt-10 mx-auto p-6 bg-white shadow-md rounded-2xl space-y-6">
      {/* Title & Author */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{b.title}</h1>
        <p className="text-gray-600">by <span className="font-medium">{b.author}</span></p>
      </div>

      {/* Book Info */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
        <p><span className="font-semibold">Genre:</span> {b.genre}</p>
        <p><span className="font-semibold">ISBN:</span> {b.isbn}</p>
        <p><span className="font-semibold">Copies:</span> {b.copies}</p>
        <p>
          <span className="font-semibold">Available:</span>{" "}
          <span className={b.available ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            {b.available ? "Yes" : "No"}
          </span>
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{b.description}</p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          to={`/edit-book/${b._id}`}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Edit
        </Link>
        <Link
          to={`/borrow/${b._id}`}
          className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Borrow
        </Link>
      </div>
    </div>
  );
}
