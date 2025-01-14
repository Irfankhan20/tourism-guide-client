const TourGuideCard = ({ guide }) => {
  const { photo, name, specialty, contact } = guide;

  return (
    <div className="flex flex-col items-center text-center p-4">
      {/* Profile Image */}
      <div className="relative w-36 h-36">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover rounded-full border-4 border-blue-400"
        />
      </div>
      {/* Name and Specialty */}
      <h3 className="mt-4 text-xl font-semibold">{name}</h3>
      <p className="text-gray-500">{specialty}</p>
      {/* Contact */}
      <p className="mt-2 text-gray-400 text-sm">{contact}</p>
    </div>
  );
};

export default TourGuideCard;
