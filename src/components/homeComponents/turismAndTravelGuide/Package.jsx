import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Package = ({ tour }) => {
  const { _id, photo, type, title, price, description } = tour;

  return (
    <div className="">
      <div className="group border border-gray-300 w-full md:w-[90%] relative rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* badge */}
        <span className="bg-red-500 rounded-md px-3 py-1 z-10 text-[0.9rem] text-white absolute top-3 left-3">
          {type}
        </span>

        {/* product image */}
        <div className="relative overflow-hidden cursor-pointer">
          <img
            alt="product/image"
            src={photo}
            className="w-[90%] h-48 object-cover rounded-md mx-auto mt-5"
          />

          {/* action buttons */}
          <div className="absolute bg-[rgb(0,0,0,0.3)] z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bottom-0 left-0 flex items-center justify-center w-full h-full">
            <div className="flex items-center gap-[15px] justify-center">
              <div className="relative w-max opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Link
                  to={`/packageDetails/${_id}`}
                  className="flex rounded-full bg-white p-2 hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <IoEyeOutline className="text-2xl" />
                </Link>

                {/* tooltip */}
                <p
                  className={`absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}
                >
                  View Details
                  {/* arrow */}
                  <span className="w-2 h-2 bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* product details */}
        <div className="p-4 pt-4 flex-col">
          <div className="flex-grow h-[180px]">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">
              {description.slice(0, 150)}
              <span className="font-semibold cursor-pointer"> more...</span>
            </p>
          </div>
          <p className="text-lg font-medium text-primary mt-1">৳ {price}</p>
        </div>
      </div>
    </div>
  );
};

export default Package;
