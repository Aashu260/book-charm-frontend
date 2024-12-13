import { about1, about2 } from "../assets";

function About() {
  return (
    <div className="bg-amber-100 text-amber-950">
      <h1 className="text-amber-950 py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-center">About Us</h1>
        </div>
      </h1>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Welcome to Book Charm
          </h2>
          <p className="text-lg mb-8 text-center">
            At <strong>Book Charm</strong>, we believe in the magic of books.
            Our store is dedicated to providing a carefully curated collection
            of titles that cater to every kind of reader—whether you're looking
            for gripping novels, inspiring non-fiction, or timeless classics.
          </p>
          <div className="flex justify-center">
            <img
              src={about1}
              alt="Bookshelf"
              className="w-2/3 sm:w-1/2 rounded-3xl shadow-md"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Mission</h2>
          <p className="text-lg mb-8 text-center">
            Our mission is to inspire a love of reading by connecting people
            with stories that entertain, educate, and transform. We strive to
            make books accessible to everyone, creating a space where readers
            can discover their next favorite title.
          </p>
          <div className="flex justify-center">
            <img
              src={about2}
              alt="Our Mission"
              className="w-2/3 sm:w-1/2 rounded-3xl shadow-md"
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-10">Stay Connected</h2>
          <p className="text-lg mb-4">
            Follow us on social media to explore more. Let's bring the charm of
            books into your life!
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
