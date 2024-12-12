import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://book-charm-backend.onrender.com/api/v1/get-book-by-id/${id}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchData();
  }, [id]); 

  return (
    <>
      {Data ? (
        <div className="px-8 md:px-12 py-20 bg-amber-100 flex flex-col md:flex-row gap-8">
          <div className="bg-amber-100 rounded p-4 h-[70vh] lg-h-[88vh] w-full lg:w-3/6 flex items-center justify-center">
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
            <p className="mt-10 text-amber-950 text-3xl font-semibold">
              ${Data.price}
            </p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default BookDetails;
