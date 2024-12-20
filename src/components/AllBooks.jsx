import { useEffect, useState } from "react";
import Card from "./Card";

const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    // fetch book data from backend api
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://book-charm-backend.onrender.com/api/get-all-books"
        );
        const result = await response.json();
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-amber-100 h-auto px-12 py-16">
      <h4 className="text-3xl font-bold text-amber-950 text-center mb-16">
        Discover the Joy of Reading
      </h4>
      <div className="my-4 grid gap-8 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <Card data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
