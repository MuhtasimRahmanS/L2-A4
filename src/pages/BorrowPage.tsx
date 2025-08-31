import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams, useNavigate } from "react-router"
import { useCreateBorrowMutation } from "../redux/features/borrow/borrowSlice"

export default function BorrowPage() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const [borrow, { isLoading }] = useCreateBorrowMutation()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      book: bookId!,
      quantity: Number(fd.get("quantity")),
      dueDate: String(fd.get("dueDate")),
    }
    const res = await borrow(payload).unwrap()
    if (res.success) navigate("/borrow-summary")
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Borrow Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input id="quantity" name="quantity" type="number" min={1} required />
          </div>
          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" name="dueDate" type="date" required />
          </div>
          <Button variant="secondary"  disabled={isLoading} type="submit" className="w-full">Borrow</Button>
        </form>
      </CardContent>
    </Card>
  )
}
