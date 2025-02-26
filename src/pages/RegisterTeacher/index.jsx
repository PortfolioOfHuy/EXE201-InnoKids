import { useState } from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { UserOutlined, BookOutlined, UploadOutlined, TrophyOutlined, FileTextOutlined } from "@ant-design/icons";
import { postRegisterTeacher } from "../../services/teacher-service";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

const RegisterTeacher = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
const user =jwtDecode(localStorage.getItem("token"));
 console.log(user);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Id",user.Id);
      formData.append('FullName', values.fullName);
      formData.append('Introduction', values.introduction);
      formData.append('Experience', values.experience);
      formData.append('Skill', values.artSkills.join(', '));
      
      if (fileList[0]?.originFileObj) {
        formData.append('Avatar', fileList[0].originFileObj);
      }

      const response = await postRegisterTeacher(formData);
   
      if (response.message === "Update successful")  {
        toast.success("Đăng ký giảng viên thành công!");
        localStorage.removeItem("token");
        form.resetFields();
        setFileList([]);
        setImageUrl("");
        form.setFieldsValue({
          fullName: '',
          artSkills: [],
          experience: '',
          introduction: '',
          avatar: undefined
        });
        // Chuyển hướng về trang chủ hoặc trang profile
        navigate("/login");

      }
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
      console.error("Error registering teacher:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    name: 'avatar',
    maxCount: 1,
    fileList: fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ được tải lên file ảnh!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
        return false;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
      if (newFileList.length > 0) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageUrl(e.target.result);
        };
        reader.readAsDataURL(newFileList[0].originFileObj);
      } else {
        setImageUrl("");
      }
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">
            Trở Thành Giảng Viên Nghệ Thuật
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chia sẻ đam mê nghệ thuật và truyền cảm hứng cho thế hệ trẻ
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Banner */}
          <div className="bg-gradient-to-r from-purple-600 to-yellow-500 h-3"></div>

          {/* Form Content */}
          <div className="p-8">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Personal Info */}
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center">
                      <UserOutlined className="mr-3 text-purple-600" />
                      Thông Tin Cá Nhân
                    </h2>
                    
                    {/* Avatar Upload */}
                    <Form.Item
                      name="avatar"
                      className="mb-8"
                    >
                      <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm">
                        <div className="mb-4">
                          {imageUrl ? (
                            <div className="relative group">
                              <img
                                src={imageUrl}
                                alt="Avatar"
                                className="w-40 h-40 rounded-full object-cover border-4 border-purple-200 transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <UploadOutlined className="text-white text-3xl" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200">
                              <UserOutlined className="text-5xl text-purple-400" />
                            </div>
                          )}
                        </div>
                        <Upload {...uploadProps} className="upload-list-inline">
                          <Button 
                            icon={<UploadOutlined />} 
                            className="flex items-center bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                          >
                            {imageUrl ? 'Thay đổi ảnh' : 'Tải ảnh lên'}
                          </Button>
                        </Upload>
                        <p className="mt-3 text-sm text-gray-500">
                          Định dạng: JPG, PNG. Tối đa 2MB
                        </p>
                      </div>
                    </Form.Item>

                    <Form.Item
                      name="fullName"
                      label={<span className="text-gray-700 font-medium">Họ và tên</span>}
                      rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                    >
                      <Input 
                        prefix={<UserOutlined className="text-purple-400" />}
                        placeholder="Nhập họ và tên của bạn"
                        size="large"
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </div>
                </div>

                {/* Right Column - Professional Info */}
                <div className="space-y-6">
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-yellow-800 mb-6 flex items-center">
                      <BookOutlined className="mr-3 text-yellow-600" />
                      Thông Tin Chuyên Môn
                    </h2>

                    <Form.Item
                      name="artSkills"
                      label={<span className="text-gray-700 font-medium">Kỹ năng nghệ thuật</span>}
                      rules={[{ required: true, message: "Vui lòng chọn kỹ năng nghệ thuật" }]}
                    >
                      <Select 
                        placeholder="Chọn các kỹ năng nghệ thuật của bạn"
                        size="large"
                        className="rounded-lg"
                        mode="multiple"
                        maxTagCount={3}
                      >
                        <Select.OptGroup label="Vẽ truyền thống">
                          <Select.Option value="watercolor">Vẽ màu nước</Select.Option>
                          <Select.Option value="pencil">Vẽ chì/Phác thảo</Select.Option>
                          <Select.Option value="acrylic">Vẽ màu Acrylic</Select.Option>
                        </Select.OptGroup>
                        <Select.OptGroup label="Vẽ kỹ thuật số">
                          <Select.Option value="digital-basic">Vẽ kỹ thuật số cơ bản</Select.Option>
                          <Select.Option value="character">Thiết kế nhân vật</Select.Option>
                          <Select.Option value="comic">Vẽ truyện tranh</Select.Option>
                        </Select.OptGroup>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="experience"
                      label={
                        <div className="flex items-center text-gray-700 font-medium">
                          <TrophyOutlined className="mr-2 text-yellow-600" />
                          Kinh nghiệm giảng dạy
                        </div>
                      }
                      rules={[{ required: true, message: "Vui lòng nhập kinh nghiệm" }]}
                    >
                      <Input.TextArea 
                        rows={3}
                        placeholder="Mô tả chi tiết kinh nghiệm giảng dạy của bạn"
                        className="rounded-lg"
                      />
                    </Form.Item>

                    <Form.Item
                      name="introduction"
                      label={
                        <div className="flex items-center text-gray-700 font-medium">
                          <FileTextOutlined className="mr-2 text-yellow-600" />
                          Giới thiệu bản thân
                        </div>
                      }
                      rules={[{ required: true, message: "Vui lòng nhập giới thiệu" }]}
                    >
                      <Input.TextArea 
                        rows={4} 
                        placeholder="Chia sẻ về phương pháp giảng dạy và mục tiêu của bạn"
                        className="rounded-lg"
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Form.Item className="mt-8">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  size="large"
                  className="w-full h-14 rounded-xl text-lg font-semibold text-white hover:opacity-90 transition-all duration-300 transform hover:scale-[1.02]"
                  style={{ 
                    background: 'linear-gradient(135deg, #9333ea 0%, #f59e0b 100%)',
                    boxShadow: '0 4px 14px 0 rgba(147, 51, 234, 0.3)'
                  }}
                >
                  Đăng ký trở thành giảng viên
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterTeacher;
