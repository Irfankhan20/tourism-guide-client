import { useState } from "react";
import useTouristStories from "../../../hooks/useTouristStories";

const TouristStory = () => {
  const [stories] = useTouristStories();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
  };

  const renderImages = (images) => {
    const displayImages = images.slice(0, 6);
    const extraCount = images.length - 6;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "5px",
        }}
      >
        {displayImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "5px",
            }}
          >
            <img
              src={image}
              alt={`Story Image ${index + 1}`}
              style={{ width: "100%", height: "100px", objectFit: "cover" }}
            />
            {index === 5 && extraCount > 0 && (
              <div
                onClick={() => openModal(images)}
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  fontSize: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                +{extraCount}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>
        Tourist Stories: {stories.length}
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {stories.map((story, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
            }}
          >
            <h2 style={{ fontSize: "18px", color: "#555" }}>{story.title}</h2>
            <p style={{ fontSize: "14px", color: "#777", lineHeight: "1.5" }}>
              {story.description}
            </p>
            <p style={{ fontSize: "14px", color: "#333", fontWeight: "bold" }}>
              Tour Guide: {story.tourGuide}
            </p>
            {renderImages(story.images)}
          </div>
        ))}
      </div>

      {/* Modal for showing all images */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "20px",
              maxWidth: "90%",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              All Images
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "10px",
              }}
            >
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Modal Image ${index + 1}`}
                  style={{ width: "100%", borderRadius: "5px" }}
                />
              ))}
            </div>
            <button
              onClick={closeModal}
              style={{
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "10px 20px",
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TouristStory;
