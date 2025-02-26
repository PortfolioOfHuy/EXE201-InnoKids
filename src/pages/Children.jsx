import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ManOutlined,
  CalendarOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import {
  handleAddChildren,
  handleGetChildrenByParentId,
} from "../services/children-service";
import { toast } from "react-toastify";

const Children = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birthDate: "",
  });

  const { parentId } = useParams();
  const navigate = useNavigate();

  const fetchChildren = async () => {
    try {
      const res = await handleGetChildrenByParentId(parentId);
      const formattedChildren = res.data.map((child) => ({
        id: child.id,
        name: child.childName,
        gender: child.genderCode.genderDetail.toLowerCase(),
        birthDate: new Date(child.birthday).toLocaleDateString("vi-VN"),
        genderId: child.genderId,
        healthRecords: child.healthRecords || [],
      }));
      setChildren(formattedChildren);
    } catch (error) {
      console.error("Error fetching children:", error);
      toast.error("Không thể tải danh sách trẻ em");
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [parentId]);

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteConfirm(false);
    setIsEditing(false);
    setSelectedChild(null);
    setFormData({
      name: "",
      gender: "",
      birthDate: "",
    });
  };

  const handleShow = () => setShowModal(true);

  const handleEdit = (child) => {
    setIsEditing(true);
    setFormData(child);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!parentId) {
        toast.error("Không tìm thấy parentId!");
        return;
      }

      if (!formData.name || !formData.gender || !formData.birthDate) {
        toast.error("Vui lòng điền đầy đủ thông tin!");
        return;
      }

      const genderValue = formData.gender === "male" ? 1 : 2;
      const formattedBirthDate = new Date(formData.birthDate).toISOString();

      const response = await handleAddChildren(
        parentId,
        genderValue,
        formData.name,
        formattedBirthDate
      );

      if (response.status !== 200) {
        toast.error(response.data);
      } else {
        toast.success(response.data);
        await fetchChildren();
        handleClose();
        await getChildrenByParentId();
      }
    } catch (error) {
      console.error("Error adding child:", error);
      if (error.response) {
        toast.error(error.response.data.toast || "Thêm trẻ thất bại!");
      } else {
        toast.error("Lỗi kết nối server!");
      }
    }
  };

  const handleDelete = (childId) => {
    setChildren((prev) => prev.filter((child) => child.id !== childId));
    handleClose();
  };

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* Header Section */}
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className="mb-0 fw-bold text-primary">
                <UserOutlined className="me-2" />
                Quản Lý Trẻ Em
              </h3>
              <p className="text-muted mb-0 mt-1">
                Quản lý thông tin cơ bản của trẻ
              </p>
            </div>
            <Button
              variant="primary"
              onClick={handleShow}
              className="rounded-3 px-4"
            >
              <PlusOutlined className="me-2" /> Thêm Mới
            </Button>
          </div>
        </div>

        {/* Children Cards */}
        {children.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-0">
              Chưa có thông tin trẻ. Hãy thêm mới!
            </p>
          </div>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {children.map((child) => (
              <Col key={child.id}>
                <Card className="h-100 border-0 shadow-sm rounded-3">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h5 className="fw-bold mb-1">{child.name}</h5>
                        <Badge
                          bg={child.gender === "male" ? "info" : "danger"}
                          className="rounded-pill"
                        >
                          <ManOutlined className="me-1" />
                          {child.gender === "male" ? "Nam" : "Nữ"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-muted mb-3">
                      <CalendarOutlined className="me-2" />
                      {child.birthDate}
                    </div>
                    <div className="text-muted mb-3">
                      <HeartOutlined className="me-2" />
                      {child.healthRecords.length} bản ghi sức khỏe
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="w-100 rounded-3"
                        onClick={() => handleEdit(child)}
                      >
                        <EditOutlined className="me-1" />
                        Sửa
                      </Button>
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="w-100 rounded-3"
                        onClick={() => navigate(`/health-records/${child.id}/${child.name }`)}
                      >
                        <HeartOutlined className="me-1" />
                        Sức khỏe
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="w-100 rounded-3"
                        onClick={() => {
                          setSelectedChild(child);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <DeleteOutlined className="me-1" />
                        Xóa
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Add/Edit Modal */}
        <Modal
          show={showModal}
          onHide={handleClose}
          centered
          className="rounded-3"
        >
          <Modal.Header closeButton className="border-bottom-0 pb-0">
            <Modal.Title className="fw-bold">
              {isEditing ? "Chỉnh Sửa Thông Tin" : "Thêm Trẻ Mới"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Nhập họ và tên"
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-medium">Giới tính</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="rounded-3"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-medium">Ngày sinh</Form.Label>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="rounded-3"
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" className="rounded-3">
                  {isEditing ? "Cập nhật" : "Thêm mới"}
                </Button>
                <Button
                  variant="light"
                  onClick={handleClose}
                  className="rounded-3"
                >
                  Hủy
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          show={showDeleteConfirm}
          onHide={handleClose}
          centered
          className="rounded-3"
        >
          <Modal.Header closeButton className="border-bottom-0">
            <Modal.Title className="fw-bold text-danger">
              Xác Nhận Xóa
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="mb-0">
              Bạn có chắc chắn muốn xóa thông tin của trẻ này không?
            </p>
          </Modal.Body>
          <Modal.Footer className="border-top-0">
            <Button variant="light" onClick={handleClose} className="rounded-3">
              Hủy
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(selectedChild.id)}
              className="rounded-3"
            >
              Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default Children;
