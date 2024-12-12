import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
const RecentlyAdded = () => {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-amber-950 text-center mb-12">Recently Added Books</h4>
      <div className="my-20 grid gap-8 mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <Card data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
