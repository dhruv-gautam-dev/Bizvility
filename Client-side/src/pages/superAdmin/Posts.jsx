import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSpring, animated } from "@react-spring/web";
import Swal from "sweetalert2";

const initialPosts = [
  {
    id: 1,
    title: "Welcome to Our Platform",
    author: "Admin",
    status: "Published",
    date: "2024-01-15",
    views: 1250,
  },
  {
    id: 2,
    title: "How to Create Your First Listing",
    author: "Editor",
    status: "Published",
    date: "2024-01-14",
    views: 890,
  },
  {
    id: 3,
    title: "Platform Updates and Features",
    author: "Admin",
    status: "Draft",
    date: "2024-01-13",
    views: 0,
  },
  {
    id: 4,
    title: "Community Guidelines",
    author: "Moderator",
    status: "Published",
    date: "2024-01-12",
    views: 567,
  },
  {
    id: 5,
    title: "Tips for Better Listings",
    author: "Editor",
    status: "Pending",
    date: "2024-01-11",
    views: 0,
  },
];

export default function SuperPosts() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    author: "",
    status: "Draft",
    date: "",
    views: 0,
  });

  // Filter posts based on search and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || post.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Fade animation for modal
  const fadeProps = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? "translateY(0)" : "translateY(-20px)",
    config: { tension: 220, friction: 20 },
  });

  // Handle actions
  const handleView = (title) => {
    console.log(`Viewing post: ${title}`);
  };

  const handleEdit = (post) => {
    setModalMode("edit");
    setCurrentPost({ ...post });
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${title}". This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPosts(posts.filter((post) => post.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: `"${title}" has been deleted successfully.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPost((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (Add or Edit)
  const handleSavePost = () => {
    if (!currentPost.title || !currentPost.author || !currentPost.date) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all required fields.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (modalMode === "add") {
      const newId =
        posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1;
      setPosts([...posts, { ...currentPost, id: newId, views: 0 }]);
      Swal.fire({
        title: "Success",
        text: "New post has been added successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setPosts(
        posts.map((post) =>
          post.id === currentPost.id ? { ...currentPost } : post
        )
      );
      Swal.fire({
        title: "Success",
        text: "Post has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setCurrentPost({
      id: null,
      title: "",
      author: "",
      status: "Draft",
      date: "",
      views: 0,
    });
    setIsModalOpen(false);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPost({
      id: null,
      title: "",
      author: "",
      status: "Draft",
      date: "",
      views: 0,
    });
    setModalMode("add");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Posts</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => {
            setModalMode("add");
            setIsModalOpen(true);
          }}
        >
          <PlusIcon className="w-5 h-5" />
          Add New Post
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-3/4" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Author
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Views
                </th>
                <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : post.status === "Draft"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(post.title)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPosts.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-sm text-center text-gray-500"
                  >
                    No posts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Post */}
      {isModalOpen && (
        <animated.div
          style={{
            ...fadeProps,
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              {modalMode === "add" ? "Add New Post" : "Edit Post"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentPost.title}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={currentPost.author}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={currentPost.status}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={currentPost.date}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
}
