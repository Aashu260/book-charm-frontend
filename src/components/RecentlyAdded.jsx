import { useEffect, useState } from "react";
import Card from "./Card";

const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://book-charm-backend.onrender.com/api/v1/get-recent-books"
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching recently added books:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-amber-950 text-center mb-12">
        New Arrivals
      </h4>
      <div className="my-20 grid gap-8 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
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

export default RecentlyAdded;
