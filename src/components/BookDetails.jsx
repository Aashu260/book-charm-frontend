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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  console.log(isLoggedIn);
  console.log(role);

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

  const submitFavourite = async () => {
    try {
      const response = await fetch(
        "https://book-charm-backend.onrender.com/api/v1/add-book-to-fav",
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
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add to favorites.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("An error occurred while adding to favorites.");
    }
  };

  const submitCart = async () => {
    try {
      const response = await fetch("https://book-charm-backend.onrender.com/api/v1/add-to-cart", {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({}), 
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred while adding to cart.");
    }
  };

  return (
    <>
      {Data ? (
        <div className="px-8 md:px-12 py-20 bg-amber-100 flex flex-col md:flex-row gap-8">
          <div className="bg-amber-100 rounded p-4 h-[70vh] lg-h-[88vh] w-full lg:w-3/6 flex flex-col items-center justify-center gap-8">
            <img
              src={Data.url}
              alt={Data.title || "Book cover"}
              className="h-[70vh] lg-h-[88vh] rounded shadow shadow-black/50 flex items-center justify-center"
            />
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-amber-950 font-semibold">
              {Data.title}
            </h1>
            <p className="text-amber-950 mt-4">by {Data.author}</p>
            <p className="text-amber-950 mt-8 text-xl">{Data.desc}</p>

            {/* Price and Icons Row */}
            <div className="mt-10 flex items-center gap-4">
              <p className="text-amber-950 text-3xl font-semibold">
                ${Data.price}
              </p>

              {/* User Icons */}
              {isLoggedIn === true && role === "user" && (
                <div className="flex items-center gap-4">
                  <button
                    className="text-amber-950 hover:text-green-600 hover:scale-110 transition-transform ml-10"
                    onClick={submitFavourite}
                  >
                    <FaHeart size={25} />
                  </button>
                  <button
                    className="text-amber-950 hover:text-green-600 hover:scale-110 transition-transform"
                    onClick={submitCart}
                  >
                    <FaShoppingCart size={25} />
                  </button>
                </div>
              )}

              {/* Admin Icons */}
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
