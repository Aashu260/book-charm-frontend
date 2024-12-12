import { useEffect, useState } from "react";
import Card from "./Card";

const AllBooks = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/get-all-books");
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
    <div className="bg-amber-100 h-auto px-12 py-8">
      <h4 className="text-3xl text-amber-950 text-center mb-10">All Books</h4>
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
