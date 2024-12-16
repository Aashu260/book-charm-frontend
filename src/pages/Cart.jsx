import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Cart = () => {
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Quantities, setQuantities] = useState({});

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          "https://book-charm-backend.onrender.com/api/v1/get-user-cart",
          {
            method: "GET",
            headers: {
              ...headers,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCart(data.data);

          const initialQuantities = {};
          data.data.forEach((item) => {
            initialQuantities[item._id] = 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const increaseQuantity = (bookid) => {
    setQuantities((prev) => ({
      ...prev,
      [bookid]: (prev[bookid] || 1) + 1,
    }));
  };

  const decreaseQuantity = (bookid) => {
    setQuantities((prev) => ({
      ...prev,
      [bookid]: Math.max((prev[bookid] || 1) - 1, 1),
    }));
  };

  const deleteItem = async (bookid) => {
    try {
      const response = await fetch(
        `https://book-charm-backend.onrender.com/api/v1/remove-from-cart/${bookid}`,
        {
          method: "PUT",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setCart((prev) => prev.filter((item) => item._id !== bookid));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    if (Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price * (Quantities[item._id] || 1);
      });
      setTotal(total);
    }
  }, [Cart, Quantities]);

  return (
    <div className="bg-amber-100 px-4 md:px-12 min-h-screen py-8 flex flex-col items-center">
      {!Cart && (
        <p className="text-center text-2xl text-amber-950">Loading...</p>
      )}
      {Cart && Cart.length === 0 && (
        <div className="flex-grow flex items-center justify-center flex-col">
          <h1 className="sm:text-5xl lg:text-4xl font-semibold text-amber-950">
            Your cart is empty
          </h1>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl md:text-5xl font-semibold text-amber-950 text-center mb-8">
            Your Cart
          </h1>
          <div className="w-full max-w-4xl flex flex-col gap-4">
            {Cart.map((items, i) => (
              <div
                className="w-full flex flex-col md:flex-row p-4 bg-neutral-50 shadow-md rounded-lg items-center justify-between"
                key={i}
              >
                <img
                  src={items.url}
                  alt="/"
                  className="h-32 w-32 object-cover rounded"
                />
                <div className="text-center md:text-left md:ml-4 flex-1">
                  <h1 className="text-xl md:text-2xl text-amber-950 font-semibold">
                    {items.title}
                  </h1>
                  <p className="text-sm text-amber-800 mt-2 hidden md:block">
                    {items.desc.slice(0, 70)}...
                  </p>
                </div>

                <div className="flex flex-row items-center justify-between gap-2 md:gap-4">
                  <h2 className="text-2xl font-semibold text-amber-950">
                    ${(items.price * (Quantities[items._id] || 1)).toFixed(2)}
                  </h2>

                  <button
                    className="text-green-600 hover:text-black hover:scale-110 transition-transform"
                    onClick={() => decreaseQuantity(items._id)}
                  >
                    <IoIosArrowDropdownCircle size={30} />
                  </button>

                  <button
                    className="text-green-600 hover:text-black hover:scale-110 transition-transform"
                    onClick={() => increaseQuantity(items._id)}
                  >
                    <IoIosArrowDropupCircle size={30} />
                  </button>

                  <button
                    className="bg-red-100 text-red-700 border border-red-700 rounded p-1 hover:bg-red-700 hover:text-white hover:scale-110 transition-transform"
                    onClick={() => deleteItem(items._id)}
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {Cart && Cart.length > 0 && (
        <div className="mt-8 mx-auto w-full max-w-sm bg-neutral-50 rounded-lg shadow-md p-6">
          <div className="flex justify-center mb-5 text-lg md:text-xl text-amber-950">
            <h2>
              Order Quantity :{" "}
              {Object.values(Quantities).reduce((a, b) => a + b, 0)}
            </h2>
          </div>
          <div className="flex justify-center text-lg md:text-xl text-amber-950">
            <h2>Order Total : ${Total.toFixed(2)}</h2>
          </div>
          <div className="mt-10 flex justify-center">
            <button className="w-40 py-3 bg-amber-100 text-amber-950 shadow shadow-amber-950 rounded-3xl text-lg font-semibold hover:bg-amber-950 hover:text-white transition">
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
