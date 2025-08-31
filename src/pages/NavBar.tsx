
import { Link } from "react-router"

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 ">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
            {/* Left Side - Brand */}
      <div className="text-xl font-bold">
        <Link to={"/"} > 📚 My Library</Link>
        
      </div>

      {/* Right Side - Navigation */}
      <div className="flex items-center gap-6">
        <Link to={"/books"}>Books</Link>
        <Link to={"/borrow-summary"}>Borrow Summary</Link>
        <Link to={"/create-book"}>Add Book</Link>
      </div>

        </div>
      
    </nav>
  )
}