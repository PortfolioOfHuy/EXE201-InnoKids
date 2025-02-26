import { Card, Row, Col, Statistic, Table, Progress } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faChalkboardTeacher,
  faBook,
  faMoneyBill,
  faGraduationCap,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {
  // Mock data - thay thế bằng dữ liệu thực từ API
  const stats = {
    totalStudents: 1234,
    totalTeachers: 45,
    totalCourses: 78,
    totalRevenue: 123456789,
    activeStudents: 890,
    completionRate: 85,
  };

  const recentCourses = [
    {
      key: "1",
      name: "Khóa học vẽ cơ bản",
      teacher: "Nguyễn Văn A",
      students: 25,
      status: "Đang diễn ra",
    },
    // Thêm dữ liệu khóa học khác
  ];

  const columns = [
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giảng viên",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Số học viên",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === "Đang diễn ra"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="hover:shadow-md transition-shadow">
            <Statistic
              title="Tổng số học viên"
              value={stats.totalStudents}
              prefix={
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-blue-500 mr-2"
                />
              }
              className="cursor-pointer"
            />
            <div className="mt-2 text-sm text-gray-500">
              Tăng 12% so với tháng trước
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="hover:shadow-md transition-shadow">
            <Statistic
              title="Giảng viên"
              value={stats.totalTeachers}
              prefix={
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  className="text-purple mr-2"
                />
              }
            />
            <div className="mt-2 text-sm text-gray-500">
              4 giảng viên mới tháng này
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="hover:shadow-md transition-shadow">
            <Statistic
              title="Khóa học"
              value={stats.totalCourses}
              prefix={
                <FontAwesomeIcon icon={faBook} className="text-yellow mr-2" />
              }
            />
            <div className="mt-2 text-sm text-gray-500">6 khóa học mới</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="hover:shadow-md transition-shadow">
            <Statistic
              title="Doanh thu"
              value={stats.totalRevenue}
              prefix={
                <FontAwesomeIcon
                  icon={faMoneyBill}
                  className="text-green-500 mr-2"
                />
              }
              suffix="VNĐ"
            />
            <div className="mt-2 text-sm text-gray-500">
              Tăng 8% so với tháng trước
            </div>
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card
            title="Hoạt động học tập"
            bordered={false}
            className="hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    className="text-purple"
                  />
                  <span>Học viên đang học</span>
                </div>
                <span className="font-semibold">{stats.activeStudents}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-yellow" />
                  <span>Tỷ lệ hoàn thành</span>
                </div>
                <span className="font-semibold">{stats.completionRate}%</span>
              </div>
              <Progress
                percent={stats.completionRate}
                strokeColor="#9333ea"
                trailColor="#f3e8ff"
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Khóa học gần đây"
            bordered={false}
            className="hover:shadow-md transition-shadow"
          >
            <Table
              columns={columns}
              dataSource={recentCourses}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Additional Sections */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card
            title="Thông báo quan trọng"
            bordered={false}
            className="hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-purple/5 rounded-lg">
                <div className="w-2 h-2 bg-purple rounded-full"></div>
                <p className="text-gray-700">
                  Cập nhật nội dung khóa học mới vào ngày 15/03/2024
                </p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow/5 rounded-lg">
                <div className="w-2 h-2 bg-yellow rounded-full"></div>
                <p className="text-gray-700">
                  Kiểm tra đánh giá chất lượng giảng dạy cuối tháng
                </p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
