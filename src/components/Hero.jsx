import { Link } from "react-router-dom";
import { hero1 } from "../assets";

function Hero() {
  return (
    <div>
      <section className="bg-amber-100 text-amber-950">
        <div className="grid max-w-screen-xl px-6 mx-auto lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:text-left lg:items-start">
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl">
              Where Stories Come to Life
            </h1>
            <p className="max-w-2xl mb-6 font-medium text-amber-900 lg:mb-8 md:text-lg lg:text-xl ">
              Welcome to BookCharm, your go-to destination for discovering and
              owning captivating eBooks that inspire, entertain, and enlighten.
            </p>
            <Link
              to="/all-books"
              className="inline-flex items-center justify-center px-7 py-3 text-base font-medium text-amber-950 bg-amber-100 shadow shadow-amber-950 rounded-3xl text-center hover:text-white hover:bg-amber-950 hover:scale-110 transition-transform focus:ring-2 focus:ring-gray-200"
            >
              Explore
            </Link>
          </div>
          <div className="lg:col-span-5 flex justify-center items-center mt-6 lg:mt-0 ">
            <img
              src={hero1}
              alt="mockup"
              className="rounded-lg max-w-full h-auto max-h-[300px] sm:max-h-[400px] lg:max-h-[500px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
