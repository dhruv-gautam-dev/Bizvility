import { useState, useRef } from "react";
import {
  PhotoIcon,
  DocumentIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  PlusIcon,
  XMarkIcon,
  TrashIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from "sweetalert2";

const initialMediaItems = [
  {
    id: 1,
    name: "hero-image.jpg",
    type: "image",
    size: "2.4 MB",
    date: "2024-01-15",
    url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
  {
    id: 2,
    name: "product-demo.mp4",
    type: "video",
    size: "15.7 MB",
    date: "2024-01-14",
    url: "",
  },
  {
    id: 3,
    name: "company-logo.png",
    type: "image",
    size: "156 KB",
    date: "2024-01-13",
    url: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
  },
  {
    id: 4,
    name: "presentation.pdf",
    type: "document",
    size: "3.2 MB",
    date: "2024-01-12",
    url: "",
  },
  {
    id: 5,
    name: "background-music.mp3",
    type: "audio",
    size: "4.8 MB",
    date: "2024-01-11",
    url: "",
  },
  {
    id: 6,
    name: "team-photo.jpg",
    type: "image",
    size: "1.8 MB",
    date: "2024-01-10",
    url: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
];

export default function SuperMedia() {
  const [mediaItems, setMediaItems] = useState(initialMediaItems);
  const [viewMode, setViewMode] = useState("grid");
  const [filterType, setFilterType] = useState("all");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const [isUploadPreviewOpen, setIsUploadPreviewOpen] = useState(false);
  const [isReplacePreviewOpen, setIsReplacePreviewOpen] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [replaceMode, setReplaceMode] = useState(false);
  const [replaceId, setReplaceId] = useState(null);
  const fileInputRef = useRef(null);
  const replaceFileInputRef = useRef(null);
  const sliderRef = useRef(null);

  const filteredItems = mediaItems.filter(
    (item) => filterType === "all" || item.type === filterType
  );

  const getIcon = (type) => {
    switch (type) {
      case "image":
        return PhotoIcon;
      case "video":
        return VideoCameraIcon;
      case "audio":
        return MusicalNoteIcon;
      default:
        return DocumentIcon;
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type.split("/")[0];
    const type =
      fileType === "image"
        ? "image"
        : fileType === "video"
        ? "video"
        : fileType === "audio"
        ? "audio"
        : "document";
    const size = (file.size / 1024 / 1024).toFixed(2) + " MB";
    const url = URL.createObjectURL(file);
    const date = "2025-06-13"; // Current date

    setPreviewMedia({
      file,
      name: file.name,
      type,
      size,
      date,
      url,
    });
    setIsUploadPreviewOpen(true);
  };

  const handleReplaceFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type.split("/")[0];
    const type =
      fileType === "image"
        ? "image"
        : fileType === "video"
        ? "video"
        : fileType === "audio"
        ? "audio"
        : "document";
    const size = (file.size / 1024 / 1024).toFixed(2) + " MB";
    const url = URL.createObjectURL(file);
    const date = "2025-06-13"; // Current date

    setPreviewMedia({
      file,
      name: file.name,
      type,
      size,
      date,
      url,
    });
    setIsGalleryOpen(false); // Hide the slider popup
    setIsReplacePreviewOpen(true); // Show the replace preview popup
  };

  const handleSaveMedia = () => {
    if (replaceMode) {
      setMediaItems(
        mediaItems.map((item) =>
          item.id === replaceId ? { ...previewMedia, id: replaceId } : item
        )
      );
      setReplaceMode(false);
      setReplaceId(null);
      setIsReplacePreviewOpen(false);
      setIsGalleryOpen(true); // Reopen the slider after replacing
      Swal.fire({
        title: "Success",
        text: "Media has been replaced successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      const newId =
        mediaItems.length > 0
          ? Math.max(...mediaItems.map((item) => item.id)) + 1
          : 1;
      setMediaItems([...mediaItems, { ...previewMedia, id: newId }]);
      setIsUploadPreviewOpen(false);
      Swal.fire({
        title: "Success",
        text: "Media has been uploaded successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    setPreviewMedia(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (replaceFileInputRef.current) replaceFileInputRef.current.value = "";
  };

  const handleMediaClick = (index) => {
    setInitialSlide(index);
    setIsGalleryOpen(true);
  };

  const handleDeleteMedia = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${name}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = mediaItems.filter((item) => item.id !== id);
        setMediaItems(updatedItems);
        if (updatedItems.length === 0 || filteredItems.length === 1) {
          setIsGalleryOpen(false);
        } else {
          const currentIndex = filteredItems.findIndex(
            (item) => item.id === id
          );
          const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
          setInitialSlide(newIndex);
          if (sliderRef.current) {
            sliderRef.current.slickGoTo(newIndex);
          }
        }
        Swal.fire({
          title: "Deleted!",
          text: `"${name}" has been deleted successfully.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleReplaceMedia = (id) => {
    setReplaceMode(true);
    setReplaceId(id);
    replaceFileInputRef.current.click();
  };

  const sliderSettings = {
    dots: true,
    infinite: filteredItems.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: initialSlide,
    arrows: true,
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*,audio/*,application/pdf"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            Upload Media
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-2">
              {["all", "image", "video", "audio", "document"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded text-sm ${
                    filterType === type
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  {type === "all" ? "" : "s"}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === mode
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {filteredItems.map((item, index) => {
                const IconComponent = getIcon(item.type);
                return (
                  <div
                    key={item.id}
                    className="cursor-pointer group"
                    onClick={() => handleMediaClick(index)}
                  >
                    <div className="overflow-hidden transition-shadow bg-gray-100 rounded-lg aspect-square hover:shadow-md">
                      {item.type === "image" && item.url ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <IconComponent className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">{item.size}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      File
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Type
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Size
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredItems.map((item, index) => {
                    const IconComponent = getIcon(item.type);
                    return (
                      <tr
                        key={item.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleMediaClick(index)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              {item.type === "image" && item.url ? (
                                <img
                                  src={item.url}
                                  alt={item.name}
                                  className="object-cover w-10 h-10 rounded"
                                />
                              ) : (
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded">
                                  <IconComponent className="w-6 h-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 capitalize bg-gray-100 rounded-full">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {item.size}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {item.date}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add New Media Preview Popup */}
      {isUploadPreviewOpen && previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-6 bg-white border-2 border-blue-200 rounded-lg shadow-lg">
            <button
              onClick={() => setIsUploadPreviewOpen(false)}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Add New Media
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg aspect-video">
                {previewMedia.type === "image" ? (
                  <img
                    src={previewMedia.url}
                    alt={previewMedia.name}
                    className="object-contain w-full h-full"
                  />
                ) : previewMedia.type === "video" ? (
                  <video controls className="object-contain w-full h-full">
                    <source
                      src={previewMedia.url}
                      type={previewMedia.file.type}
                    />
                  </video>
                ) : previewMedia.type === "audio" ? (
                  <audio controls className="w-full">
                    <source
                      src={previewMedia.url}
                      type={previewMedia.file.type}
                    />
                  </audio>
                ) : (
                  <div className="flex flex-col items-center">
                    <DocumentIcon className="w-12 h-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Document Preview Not Available
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Name: {previewMedia.name}
                </p>
                <p className="text-sm text-gray-500">
                  Type: {previewMedia.type}
                </p>
                <p className="text-sm text-gray-500">
                  Size: {previewMedia.size}
                </p>
                <p className="text-sm text-gray-500">
                  Date: {previewMedia.date}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSaveMedia}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replace Media Preview Popup */}
      {isReplacePreviewOpen && previewMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-lg p-8 border-2 border-teal-300 rounded-lg shadow-lg bg-gray-50">
            <button
              onClick={() => setIsReplacePreviewOpen(false)}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-6 text-2xl font-bold text-teal-700">
              Replace Media Preview
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-center overflow-hidden bg-gray-200 shadow-inner aspect-video rounded-xl">
                {previewMedia.type === "image" ? (
                  <img
                    src={previewMedia.url}
                    alt={previewMedia.name}
                    className="object-contain w-full h-full"
                  />
                ) : previewMedia.type === "video" ? (
                  <video controls className="object-contain w-full h-full">
                    <source
                      src={previewMedia.url}
                      type={previewMedia.file.type}
                    />
                  </video>
                ) : previewMedia.type === "audio" ? (
                  <audio controls className="w-full">
                    <source
                      src={previewMedia.url}
                      type={previewMedia.file.type}
                    />
                  </audio>
                ) : (
                  <div className="flex flex-col items-center">
                    <DocumentIcon className="w-12 h-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Document Preview Not Available
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <p className="text-sm font-semibold text-gray-800">
                  Name: <span className="font-normal">{previewMedia.name}</span>
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Type: <span className="font-normal">{previewMedia.type}</span>
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Size: <span className="font-normal">{previewMedia.size}</span>
                </p>
                <p className="text-sm font-semibold text-gray-800">
                  Date: <span className="font-normal">{previewMedia.date}</span>
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSaveMedia}
                className="px-6 py-2 text-white transition-colors bg-teal-600 rounded-md hover:bg-teal-700"
              >
                Confirm Replace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Slider Popup */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsGalleryOpen(false)}
              className="absolute text-white top-4 right-4 hover:text-gray-300"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <Slider {...sliderSettings} ref={sliderRef}>
              {filteredItems.map((item) => {
                const IconComponent = getIcon(item.type);
                return (
                  <div key={item.id} className="p-4">
                    <div className="flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg aspect-video">
                      {item.type === "image" && item.url ? (
                        <img
                          src={item.url}
                          alt={item.name}
                          className="object-contain w-full h-full"
                        />
                      ) : item.type === "video" && item.url ? (
                        <video
                          controls
                          className="object-contain w-full h-full"
                        >
                          <source src={item.url} type="video/mp4" />
                        </video>
                      ) : item.type === "audio" && item.url ? (
                        <audio controls className="w-full">
                          <source src={item.url} type="audio/mpeg" />
                        </audio>
                      ) : (
                        <div className="flex flex-col items-center">
                          <IconComponent className="w-12 h-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Preview Not Available
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center text-white">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm">
                        Type: {item.type} | Size: {item.size} | Date:{" "}
                        {item.date}
                      </p>
                      <div className="flex justify-center gap-4 mt-4">
                        <button
                          onClick={() => handleReplaceMedia(item.id)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
                          title="Replace this media"
                        >
                          <ArrowPathIcon className="w-6 h-6" />
                          <span className="font-medium">Replace</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMedia(item.id, item.name)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 ease-in-out"
                          title="Delete this media"
                        >
                          <TrashIcon className="w-6 h-6" />
                          <span className="font-medium">Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
            <input
              type="file"
              ref={replaceFileInputRef}
              onChange={handleReplaceFileChange}
              accept="image/*,video/*,audio/*,application/pdf"
              className="hidden"
            />
          </div>
        </div>
      )}
    </div>
  );
}
