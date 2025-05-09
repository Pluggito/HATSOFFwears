const Testing = ({setFile}) => {
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file) {
        // const preview = document.getElementById("image-preview");
        // const fileSrc = URL.createObjectURL(file);
        // preview.src = fileSrc;
        // preview.style.display = "block";
        setFile(file)
      }
    }
    
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="mt-4"
        onChange={handleImageChange}
      />
      <img
        id="image-preview"
        alt="Preview"
        style={{
          display: "none",
          marginTop: "10px",
          maxWidth: "100%",
          maxHeight: "150px",
        }}
      />
    </div>
  );
};
export default Testing;
