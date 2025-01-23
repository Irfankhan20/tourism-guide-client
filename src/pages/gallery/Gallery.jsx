import { useEffect, useState } from "react";

import useAxiosPublic from "../../hooks/useAxiosPublic";

const Gallery = () => {
  // fetch tour guides data
  const [guides, setGuides] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("allGuides").then((res) => setGuides(res.data));
  }, [axiosPublic]);

  return (
    <div>
      <h1>gallery: {guides.length}</h1>
    </div>
  );
};

export default Gallery;
