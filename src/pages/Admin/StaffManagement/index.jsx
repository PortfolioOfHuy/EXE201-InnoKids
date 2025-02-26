import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Space,
  Popconfirm,
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPlus,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";

function StaffManagement() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingStaff, setEditingStaff] = useState(null);

  // Mock data - thay thế bằng API call thực tế
  const [staffList, setStaffList] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nva@example.com",
      phone: "0123456789",
      role: "teacher_support",
      status: "active",
    },
    // Thêm data mẫu khác
  ]);

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "teacher_support" ? "purple" : "blue"}>
          {role === "teacher_support"
            ? "Hỗ trợ giảng viên"
            : "Hỗ trợ người dùng"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Đang hoạt động" : "Tạm khóa"}
        </Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleEdit(record)}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa nhân viên này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="text" className="text-red-500 hover:text-red-700">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingStaff(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    form.setFieldsValue(staff);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      // Gọi API xóa staff
      setStaffList(staffList.filter((staff) => staff.id !== id));
      message.success("Xóa nhân viên thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra khi xóa nhân viên");
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingStaff) {
        // Gọi API cập nhật staff
        setStaffList(
          staffList.map((staff) =>
            staff.id === editingStaff.id ? { ...staff, ...values } : staff
          )
        );
        message.success("Cập nhật thông tin thành công");
      } else {
        // Gọi API thêm staff mới
        const newStaff = {
          id: Date.now(),
          ...values,
          status: "active",
        };
        setStaffList([...staffList, newStaff]);
        message.success("Thêm nhân viên mới thành công");
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý nhân viên</h1>
        <Button
          type="primary"
          className="bg-purple hover:bg-purple/90"
          icon={<FontAwesomeIcon icon={faPlus} className="mr-2" />}
          onClick={handleAdd}
        >
          Thêm nhân viên
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={staffList}
        rowKey="id"
        className="bg-white rounded-lg shadow"
      />

      <Modal
        title={
          editingStaff ? "Chỉnh sửa thông tin nhân viên" : "Thêm nhân viên mới"
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
          >
            <Select>
              <Select.Option value="teacher_support">
                Hỗ trợ giảng viên
              </Select.Option>
              <Select.Option value="user_support">
                Hỗ trợ người dùng
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="flex justify-end mb-0">
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" className="bg-purple">
                {editingStaff ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StaffManagement;
