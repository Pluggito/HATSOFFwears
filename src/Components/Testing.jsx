
import axios from 'axios'
import PropTypes from 'prop-types';

const Testing = ({newModel, setNewModel}) => {

    const uploadImageToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "model_uploads");
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        // from Cloudinary
      
        try {
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, );
            if (res.status !== 200) {
              throw new Error("Upload failed");
            }
      
          const data = res.data;
          console.log("Uploaded image URL:", data.secure_url);
          return data.secure_url; // return the URL of the uploaded image so you can save to newModel.image 
        } catch (error) {
          console.error("Upload failed:", error);
          return null;
        }
      };

      
      const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const imageUrl = await uploadImageToCloudinary(file);
          if (file) {
            const preview = document.getElementById('image-preview');
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
          }

            if (!imageUrl) {
                console.error("Image upload failed");
                return;
            }
            
          console.log("Image URL:", imageUrl);
          
          setNewModel({ ...newModel, image: imageUrl });
          // you can now save imageUrl to your backend with other form data
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
          style={{ display: 'none', marginTop: '10px', maxWidth: '100%', maxHeight: '150px' }} 
        />
      
    </div>
      );      
}
Testing.propTypes = {
  newModel: PropTypes.object.isRequired,
  setNewModel: PropTypes.func.isRequired,
};

export default Testing


