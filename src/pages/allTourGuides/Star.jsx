import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <div key={index}>
        <span className="">
          {stars >= index + 1 ? (
            <FaStar className="text-xl  text-[#ffbf34]" />
          ) : stars >= number ? (
            <FaStarHalfAlt className="text-xl text-[#ffbf34]" />
          ) : (
            <AiOutlineStar className="text-xl text-[#ffbf34]" />
          )}
        </span>
      </div>
    );
  });

  return <div className="flex items-center gap-1">{ratingStar}</div>;
};

export default Star;
