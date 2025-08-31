import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetBorrowSummaryQuery } from "../redux/features/borrow/borrowSlice"

export default function BorrowSummaryPage() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery()

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>Failed to load summary</div>

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Borrow Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border-r">Title</th>
                <th className="text-left p-2 border-r">ISBN</th>
                <th className="text-left p-2">Total Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 border-r">{row.book.title}</td>
                  <td className="p-2 border-r">{row.book.isbn}</td>
                  <td className="p-2">{row.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}