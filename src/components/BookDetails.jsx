import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";

const BookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://book-charm-backend.onrender.com/api/v1/get-book-by-id/${id}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const submitCart = async () => {
    try {
      const response = await fetch(
        "https://book-charm-backend.onrender.com/api/v1/add-to-cart",
        {
          method: "PUT",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage("Added to cart");
      } else {
        const errorData = await response.json();
        if (errorData.message === "Book is already in cart") {
          setMessage("Book is already in cart");
        } else {
          setMessage("Failed to add book to cart");
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setMessage("An error occurred while adding to cart.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <>
      {Data ? (
        <div className="px-8 md:px-12 py-20 bg-amber-100 flex flex-col md:flex-row gap-8">
          <div className="bg-amber-100 rounded p-4 w-full lg:w-3/6 flex flex-col items-center justify-center gap-8">
            <img
              src={Data.url}
              alt={Data.title || "Book cover"}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl h-auto rounded shadow shadow-black/50"
            />
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-amber-950 font-semibold">
              {Data.title}
            </h1>
            <p className="text-amber-950 mt-4">by {Data.author}</p>
            <p className="text-amber-950 mt-8 text-xl">{Data.desc}</p>

            <div className="mt-10 flex items-center gap-4 relative">
              <p className="text-amber-950 text-3xl font-semibold">
                ${Data.price}
              </p>

              {isLoggedIn === true && role === "user" && (
                <div className="flex items-center gap-2">
                  <button
                    className="text-amber-950 hover:text-green-600 hover:scale-110 transition-transform"
                    onClick={submitCart}
                  >
                    <FaShoppingCart size={25} />
                  </button>

                  <span className="text-sm text-green-700">{message}</span>
                </div>
              )}

              {isLoggedIn === true && role === "admin" && (
                <div className="flex items-center gap-4">
                  <button className="text-amber-950 hover:text-green-600 hover:scale-110 transition-transform ml-10">
                    <MdModeEdit size={25} />
                  </button>
                  <button className="text-amber-950 hover:text-green-600 hover:scale-110 transition-transform">
                    <MdDeleteForever size={25} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BookDetails;
