import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faClock,
  faUser,
  faChalkboardTeacher,
  faStar,
  faCalendar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  handleGetAllCourse,
  createCourse,
} from "../../services/course-service";
import {
  Spin,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const user = jwtDecode(localStorage.getItem("token"));

  // Fetch courses
  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await handleGetAllCourse();

      if (res && Array.isArray(res)) {
        const formattedCourses = res.map((course) => ({
          id: course.id,
          title: course.title,
          image: course.thumbNail || "/course-placeholder.jpg",
          category: course.service || "Khác",
          price: course.price || 0,
          schedules: course.schedules || [],
          isOnline: true,
          duration: course.duration || "0 giờ",
          instructor: course.instructor || "Giảng viên",
          students: course.students || 0,
          rating: course.rating || 5.0,
        }));

        setCourses(formattedCourses);
        setFilteredCourses(formattedCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  // Filter courses based on category and search
  useEffect(() => {
    let filtered = courses;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  }, [activeCategory, searchTerm, courses]);

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "Basic", name: "Cơ bản" },
    { id: "Advanced", name: "Nâng cao" },
    { id: "Premium", name: "Cao cấp" },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const onFinish = async (values) => {
    try {
      setSubmitLoading(true);
      const user = jwtDecode(localStorage.getItem("token"));

      if (!fileList[0]?.originFileObj) {
        toast.error("Vui lòng tải lên ảnh thumbnail cho khóa học!");
        return;
      }

      const response = await createCourse(
        values.title,
        values.description,
        values.price,
        user.Id,
        values.serviceId,
        fileList[0].originFileObj
      );
      console.log(response);
      if (response) {
        toast.success("Tạo khóa học thành công!");
        handleCancel();
        // Refresh danh sách khóa học
        getAllCourses();
      }
    } catch (error) {
      toast.error("Tạo khóa học thất bại. Vui lòng thử lại!");
      console.error("Error creating course:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleUpdateCourse = async (values) => {
    try {
      setSubmitLoading(true);
      const response = await fetch(
        `https://localhost:7282/api/Course/UpdateCourse/UpdateCourse?Id=${selectedCourse.id}&Title=${values.title}&Description=${values.description}&Price=${values.price}&userId=${user.Id}&ServiceId=${values.serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast.success("Cập nhật khóa học thành công!");
        handleUpdateCancel();
        getAllCourses();
      } else {
        throw new Error("Failed to update course");
      }
    } catch (error) {
      toast.error("Cập nhật khóa học thất bại. Vui lòng thử lại!");
      console.error("Error updating course:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const showUpdateModal = (course) => {
    setSelectedCourse(course);
    updateForm.setFieldsValue({
      title: course.title,
      description: course.description,
      price: course.price,
      serviceId: categories.findIndex((cat) => cat.id === course.category),
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
    updateForm.resetFields();
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple to-background-color-cover py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow/20 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink/20 rounded-full animate-float-delayed"></div>
          <div className="absolute top-20 right-20 w-12 h-12 bg-blue/20 rounded-full animate-spin-slow"></div>
        </div>
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-realWhite font-heading">
            KHÓA HỌC TẠI INNOKIDS
          </h1>
          <p className="text-lg md:text-xl text-realWhite/90 max-w-2xl mx-auto font-body">
            KHÁM PHÁ CÁC KHÓA HỌC SÁNG TẠO VÀ PHÁT TRIỂN TÀI NĂNG NGHỆ THUẬT CHO
            TRẺ
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-realWhite shadow-lg py-8 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? "bg-purple text-realWhite"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
            {user.Role == "Instructor" && (
              <button
                onClick={showModal}
                className="px-6 py-2 rounded-full bg-green-500 text-purple hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPlus} />
                Tạo khóa học
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Spin size="large" />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Không tìm thấy khóa học nào 😢
              </h3>
              <p className="text-gray-600">
                Hãy thử tìm kiếm với từ khóa khác hoặc xem tất cả các khóa học
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <article
                  key={course.id}
                  className="bg-realWhite rounded-2xl shadow-lg overflow-hidden transform hover:translate-y-[-4px] transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="bg-yellow text-black text-sm font-medium px-3 py-1 rounded-full">
                        {categories.find((cat) => cat.id === course.category)
                          ?.name || course.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {course.title}
                    </h3>

                    {/* Lịch học */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-purple"
                        />
                        Lịch học trực tuyến
                      </h4>
                      {course.schedules && course.schedules.length > 0 ? (
                        <div className="space-y-2">
                          {course.schedules.map((schedule, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <FontAwesomeIcon
                                icon={faCalendar}
                                className="text-gray-400"
                              />
                              <span>{schedule}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          Lịch học sẽ được cập nhật sớm
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={faChalkboardTeacher}
                          className="text-purple"
                        />
                        <span className="text-gray-700">
                          {course.instructor}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-xl font-bold text-purple">
                        {formatPrice(course.price)}
                      </div>
                      {user.Role === "Instructor" && (
                        <Button
                          onClick={() => showUpdateModal(course)}
                          className="bg-yellow text-black px-4 py-2 rounded-full hover:bg-yellow/90 transition-all text-sm"
                        >
                          Chỉnh sửa
                        </Button>
                      )}
                      <Link
                        to={`/course-detail/${course.id}`}
                        className="bg-purple text-realWhite px-4 py-2 rounded-full hover:bg-purple/90 transition-all text-sm"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {filteredCourses.length > 0 && (
            <div className="text-center mt-12">
              <button className="bg-purple text-realWhite px-8 py-3 rounded-full hover:bg-purple/90 transition-all">
                Xem thêm khóa học
              </button>
            </div>
          )}
        </div>
      </section>

      <Modal
        title={
          <div className="text-2xl font-bold text-purple-800">
            Tạo Khóa Học Mới
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Tên khóa học"
            rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả khóa học"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả khóa học" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Mô tả chi tiết về khóa học" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá khóa học"
            rules={[{ required: true, message: "Vui lòng nhập giá khóa học" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              step={10000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Nhập giá khóa học"
            />
          </Form.Item>

          <Form.Item
            name="serviceId"
            label="Loại khóa học"
            rules={[{ required: true, message: "Vui lòng chọn loại khóa học" }]}
          >
            <Select placeholder="Chọn loại khóa học">
              <Select.Option value={1}>Cơ bản</Select.Option>
              <Select.Option value={2}>Nâng cao</Select.Option>
              <Select.Option value={3}>Premium</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ảnh thumbnail" required>
            <Upload
              listType="picture"
              maxCount={1}
              fileList={fileList}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith("image/");
                if (!isImage) {
                  message.error("Chỉ được tải lên file ảnh!");
                  return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  message.error("Ảnh phải nhỏ hơn 2MB!");
                  return false;
                }
                return false;
              }}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              <Button>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end gap-2">
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoading}
              className="bg-purple hover:bg-purple-600"
            >
              Tạo khóa học
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Update Course Modal */}
      <Modal
        title={
          <div className="text-2xl font-bold text-purple-800">
            Cập Nhật Khóa Học
          </div>
        }
        open={isUpdateModalOpen}
        onCancel={handleUpdateCancel}
        footer={null}
        width={800}
      >
        <Form
          form={updateForm}
          layout="vertical"
          onFinish={handleUpdateCourse}
          className="mt-4"
        >
          <Form.Item
            name="title"
            label="Tên khóa học"
            rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả khóa học"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả khóa học" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Mô tả chi tiết về khóa học" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá khóa học"
            rules={[{ required: true, message: "Vui lòng nhập giá khóa học" }]}
          >
            <InputNumber
              className="w-full"
              min={0}
              step={10000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              placeholder="Nhập giá khóa học"
            />
          </Form.Item>

          <Form.Item
            name="serviceId"
            label="Loại khóa học"
            rules={[{ required: true, message: "Vui lòng chọn loại khóa học" }]}
          >
            <Select placeholder="Chọn loại khóa học">
              <Select.Option value={1}>Cơ bản</Select.Option>
              <Select.Option value={2}>Nâng cao</Select.Option>
              <Select.Option value={3}>Premium</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end gap-2">
            <Button onClick={handleUpdateCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoading}
              className="bg-purple hover:bg-purple-600"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Courses;
