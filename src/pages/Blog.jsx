import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import {
  FetchDoctorPostById,
  fetchPost,
  FetchPostInfoById,
  handleCreatePost,
  handleUpdatePost,
} from "../services/doctor";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false); // State để hiển thị modal đăng bài
  const [newPost, setNewPost] = useState({
    image: null,
    content: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const user = jwtDecode(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPost, setEditPost] = useState({
    id: null,
    image: null,
    content: "",
    currentImage: ""
  });

  const categories = [
    { id: "all", name: "Tất Cả" },
    { id: `${user.Id}`, name: `${user.FullName}` },
    
  ];

  // Lấy danh sách bài viết khi component được mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPost();

        const formattedPosts = response.data.map((post) => ({
          ...post,
          formattedDate: new Date(post.creationDate).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        }));

        setBlogPosts(formattedPosts); // Cập nhật state với dữ liệu đã format
      } catch (err) {
        setError("Có lỗi xảy ra khi tải bài viết.");
      }
    };

    loadPosts();
  }, []);

  const handleReadMoreClick = async (id) => {
    try {
      const response = await FetchPostInfoById(id);
      const formattedDate = new Date(response.data.creationDate).toLocaleString(
        "vi-VN",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      );

      setSelectedPost({ ...response.data, formattedDate });
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleCategoryChange = async (id) => {
    try {
      let response;
  
      if (id !== "all") {
        response = await FetchDoctorPostById(id);
      } else {
        response = await fetchPost();
      }
  
      if (!Array.isArray(response.data)) {
        throw new Error("Dữ liệu trả về không hợp lệ");
      }
  
      const formattedPosts = response.data.map((post) => ({
        ...post,
        formattedDate: new Date(post.creationDate).toLocaleString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      }));
  
      setBlogPosts(formattedPosts);
      setActiveCategory(id);
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra khi tải bài viết.");
    }
  };
  
  useEffect(() => {}, []);

  // Lọc bài viết theo danh mục
  const filteredPosts =
  activeCategory === "all"
    ? blogPosts
    : blogPosts.filter((post) => post.userId === activeCategory);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setNewPost((prev) => ({ ...prev, image: file })); // Cập nhật newPost.image
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePostSubmit = async (e,content) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("ImageURL", newPost.image); // Đảm bảo tên trùng với backend
      formData.append("Description", newPost.content); // Nếu backend cần
      const response = await handleCreatePost(
        user.Id,
        formData,
        newPost.content
      );
      const updatedPosts = await fetchPost();
      setBlogPosts(updatedPosts.data);
      setNewPost({ image: null, content: "" });
      setPreviewImage(null);
      setShowPostModal(false);
    } catch (err) {
      setError("Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (post) => {
    setEditPost({
      id: post.id,
      image: null,
      content: post.description,
      currentImage: post.imageURL
    });
    setShowEditModal(true);
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB
        setError('Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
        return;
      }
      
      if (!file.type.match('image.*')) {
        setError('Vui lòng chọn file hình ảnh');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPost(prev => ({
          ...prev,
          image: file,
          currentImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      if (editPost.image) {
        formData.append("ImageURL", editPost.image);
      }

      const response = await handleUpdatePost(
        user.Id,
        editPost.id,
        formData,
        editPost.content
      );

      // Refresh danh sách bài viết
      const updatedPosts = await fetchPost();
      setBlogPosts(updatedPosts.data);

      // Đóng modal và reset form
      setShowEditModal(false);
      setEditPost({
        id: null,
        image: null,
        content: "",
        currentImage: ""
      });

      toast.success('Cập nhật bài viết thành công!');
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại.');
      console.error('Error updating post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ background: "#fff" }}>
      <Row className="text-center mb-5">
        <Col>
          <h1
            style={{ color: "var(--color-first)", fontWeight: "bold" }}
            className="mb-4"
          >
            Blog
          </h1>
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                style={{
                  background:
                    activeCategory === category.id
                      ? "var(--color-second)"
                      : "white",
                  border: `2px solid var(--color-second)`,
                  color:
                    activeCategory === category.id
                      ? "white"
                      : "var(--color-second)",
                }}
                onClick={() =>{
                  setActiveCategory(category.id)
                  handleCategoryChange(category.id)

                }
                
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
          {user.Role === "Doctor" && (
            <Button
              variant="primary"
              className="mt-4"
              style={{
                background: "var(--color-third)",
                border: `2px solid var(--color-first)`,
                color: "white",
              }}
              onClick={() => setShowPostModal(true)}
            >
              Đăng Bài Mới
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form.Control
            type="search"
            placeholder="Tìm kiếm bài viết..."
            className="rounded-pill"
            style={{ border: "2px solid var(--color-fourth)" }}
          />
        </Col>
      </Row>

      <Row>
        {filteredPosts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Card
              className="h-100"
              style={{
                transition: "all 0.3s ease",
                border: "1px solid var(--color-fourth)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "var(--color-second)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "var(--color-fourth)";
              }}
            >
              <Card.Img variant="top" src={post.imageURL} />
              <Card.Body>
                <div className="mb-2">
                  <span
                    className="px-3 py-1 rounded-pill"
                    style={{
                      background: "var(--color-second)",
                      color: "white",
                      fontSize: "0.9rem",
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <Card.Title style={{ color: "var(--color-first)" }}>
                  {post.title}
                </Card.Title>
                <Card.Text style={{ color: "var(--color-third)" }}>
                  {post.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer
                style={{
                  background: "white",
                  borderTop: "1px solid var(--color-fourth)",
                }}
              >
                <small style={{ color: "var(--color-third)" }}>
                  {post.formattedDate}
                </small>
                <div className="float-end">
                {user.Id === post.userId && (
                    <Button
                      variant="link"
                      style={{
                        color: "var(--color-sixth)",
                        textDecoration: "none",
                        marginLeft: "10px"
                      }}
                      onClick={() => handleEditClick(post)}
                    >
                      Chỉnh sửa
                    </Button>
                  )}
                  <Button
                    variant="link"
                    style={{
                      color: "var(--color-second)",
                      textDecoration: "none",
                    }}
                    onClick={() => handleReadMoreClick(post.id)}
                  >
                    Đọc thêm
                  </Button>
               
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for full post content */}
      <Modal
        show={selectedPost !== null}
        onHide={() => setSelectedPost(null)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost ? selectedPost.title : ""}</Modal.Title>
          <h2>Blog</h2>
        </Modal.Header>
        <Modal.Body>
          {selectedPost && (
            <>
              <img
                src={selectedPost.imageURL}
                alt=""
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              />
              <p>{selectedPost.description}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <h2>
            Created by {selectedPost?.user?.fullName} on{" "}
            {selectedPost?.formattedDate}{" "}
          </h2>
      
          <Button variant="secondary" onClick={() => setSelectedPost(null)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for creating a new post */}
      <Modal
        show={showPostModal}
        onHide={() => {
          setShowPostModal(false);
          setPreviewImage(null);
          setNewPost({ image: null, content: "" });
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Đăng Bài Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={handlePostSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {previewImage && (
                <div className="mt-2">
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !newPost.image || !newPost.content}
            >
              {loading ? "Đang xử lý..." : "Đăng"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setEditPost({
            id: null,
            image: null,
            content: "",
            currentImage: ""
          });
          setError(null);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Bài Viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
              />
              <div className="mt-2">
                <img
                  src={editPost.currentImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={editPost.content}
                onChange={(e) =>
                  setEditPost({ ...editPost, content: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !editPost.content}
            >
              {loading ? "Đang xử lý..." : "Cập nhật"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Blog;
