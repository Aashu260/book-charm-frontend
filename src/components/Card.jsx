import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <>
      <Link to={`/book-details/${data._id}`}>
        <div className="bg-neutral-50 rounded p-4 shadow-md hover:shadow-xl hover:shadow-black/50 hover:scale-105 transition-transform duration-300 min-h-[360px]">
          <div className="bg-amber-50 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="w-full h-[26vh]" />
          </div>
          <h2 className="mt-4 text-xl text-amber-950 font-bold">
            {data.title}
          </h2>
          <p className="mt-4 text-amber-950 font-semibold">by {data.author}</p>
          <p className="mt-2 text-amber-950 font-semibold">${data.price}</p>
        </div>
      </Link>
    </>
  );
};

export default Card;
