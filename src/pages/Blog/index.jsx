import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    image: '',
    date: '',
    category: 'parents',
    author: ''
  });

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'parents', name: 'Phụ huynh' },
    { id: 'students', name: 'Học sinh' },
  ];

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Phương pháp học vẽ hiệu quả cho trẻ em",
      excerpt: "Khám phá những phương pháp giúp trẻ phát triển kỹ năng vẽ một cách tự nhiên và hiệu quả...",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s",
      date: "15 Tháng 3, 2024",
      category: "parents",
      author: "Nguyễn Văn A"
    },
    {
      id: 2,
      title: "Kỹ năng học tập cho học sinh",
      excerpt: "Những kỹ năng cần thiết để học sinh phát triển trong môi trường học tập...",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZL4ljFwRbiHVycoeQpzuh_0lLHWZkWaK9w&s",
      date: "20 Tháng 3, 2024",
      category: "students",
      author: "Trần Thị B"
    },
    // Add more blog posts here
  ]);

  // Hàm lọc bài viết theo loại
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const openPopup = (post) => {
    setSelectedPost(post);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPost(null);
  };

  const openAddPostPopup = () => {
    setIsAddPostPopupOpen(true);
  };

  const closeAddPostPopup = () => {
    setIsAddPostPopupOpen(false);
    setNewPost({ title: '', excerpt: '', image: '', date: '', category: 'parents', author: '' });
  };

  const handleAddPost = () => {
    const newPostData = { ...newPost, id: blogPosts.length + 1 };
    setBlogPosts([...blogPosts, newPostData]);
    closeAddPostPopup();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-purple text-white py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog InnoKids</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Khám phá những bài viết hữu ích về giáo dục nghệ thuật và phát triển sáng tạo cho trẻ em
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white shadow-md py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
            />
            <FontAwesomeIcon 
              icon={faMagnifyingGlass} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Categories */}
          <div className="flex justify-center gap-4 md:gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-purple text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
            <button 
              onClick={openAddPostPopup} 
              className="bg-green-500 text-white px-6 py-2 rounded-full transition-all hover:bg-green-600"
            >
              Thêm bài viết
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300 mx-auto my-10 w-4/5"
              >
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-yellow text-black text-sm font-medium px-3 py-1 rounded-full">
                      {post.category === 'parents' ? 'Phụ huynh' : 'Học sinh'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <button 
                      className="text-purple hover:text-purple-700 font-medium"
                      onClick={() => openPopup(post)}
                    >
                      Đọc thêm
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-purple text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-all">
              Xem thêm bài viết
            </button>
          </div>
        </div>
      </section>

      {/* Popup Component for Viewing Post */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-48 object-cover mb-4" />
            <p className="text-gray-600 mb-4">{selectedPost.excerpt}</p>
            <span className="text-sm text-gray-500">{selectedPost.date}</span>
            <button 
              className="mt-4 bg-purple text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={closePopup}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* Popup Component for Adding New Post */}
      {isAddPostPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Thêm bài viết mới</h2>
            <input 
              type="text" 
              placeholder="Tiêu đề" 
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <textarea 
              placeholder="Nội dung" 
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={newPost.excerpt}
              onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="URL hình ảnh" 
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={newPost.image}
              onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
            />
            <input 
              type="text" 
              placeholder="Ngày (VD: 15 Tháng 3, 2024)" 
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={newPost.date}
              onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
            />
            <select 
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={newPost.category}
              onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
            >
              <option value="parents">Phụ huynh</option>
              <option value="students">Học sinh</option>
            </select>
            <input 
              type="text" 
              placeholder="Tên tác giả" 
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
            />
            <button 
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleAddPost}
            >
              Thêm bài viết
            </button>
            <button 
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closeAddPostPopup}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
