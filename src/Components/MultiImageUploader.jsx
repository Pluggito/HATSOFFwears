import { useRef } from "react";
import PropTypes from "prop-types";
import { X, Plus } from "lucide-react";

/**
 * MultiImageUploader
 *
 * Props:
 *  - newFiles      File[]       — newly selected files (not yet uploaded)
 *  - setNewFiles   fn           — setter for newFiles
 *  - existingUrls  string[]     — already-uploaded URLs (for edit mode)
 *  - setExistingUrls fn         — setter for existingUrls (so user can remove saved images)
 */
const MultiImageUploader = ({
  newFiles = [],
  setNewFiles,
  existingUrls = [],
  setExistingUrls,
}) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (!selected.length) return;
    setNewFiles((prev) => [...prev, ...selected]);
    // Reset input so the same file can be re-added if needed
    e.target.value = "";
  };

  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingUrl = (index) => {
    setExistingUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const totalCount = existingUrls.length + newFiles.length;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Preview grid */}
      {totalCount > 0 && (
        <div className="flex flex-wrap gap-3">
          {/* Existing uploaded images */}
          {existingUrls.map((url, i) => (
            <div
              key={`existing-${i}`}
              className="relative w-20 h-20 rounded overflow-hidden border border-gray-200 group"
            >
              <img
                src={url}
                alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeExistingUrl(i)}
                className="absolute top-0.5 right-0.5 bg-black bg-opacity-60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* New (locally selected, not yet uploaded) images */}
          {newFiles.map((file, i) => (
            <div
              key={`new-${i}`}
              className="relative w-20 h-20 rounded overflow-hidden border border-dashed border-blue-300 group"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`New photo ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeNewFile(i)}
                className="absolute top-0.5 right-0.5 bg-black bg-opacity-60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add more button */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 w-fit text-sm border border-dashed border-gray-400 rounded-md px-3 py-2 hover:bg-gray-50 transition"
      >
        <Plus className="h-4 w-4" />
        {totalCount === 0 ? "Select photos" : "Add more photos"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

MultiImageUploader.propTypes = {
  newFiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNewFiles: PropTypes.func.isRequired,
  existingUrls: PropTypes.arrayOf(PropTypes.string),
  setExistingUrls: PropTypes.func,
};

MultiImageUploader.defaultProps = {
  existingUrls: [],
  setExistingUrls: () => {},
};

export default MultiImageUploader;
