import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { LineChartOutlined, BellOutlined, MedicineBoxOutlined, TeamOutlined, ShareAltOutlined, FileTextOutlined } from '@ant-design/icons';

const Features = () => {
  const features = [
    {
      icon: <LineChartOutlined style={{ fontSize: '40px' }} />,
      title: 'Biểu Đồ Tăng Trưởng',
      description: 'Theo dõi chi tiết chiều cao, cân nặng và BMI của trẻ qua từng giai đoạn phát triển'
    },
    {
      icon: <BellOutlined style={{ fontSize: '40px' }} />,
      title: 'Cảnh Báo Thông Minh',
      description: 'Nhận thông báo kịp thời về các vấn đề phát triển bất thường của trẻ'
    },
    {
      icon: <MedicineBoxOutlined style={{ fontSize: '40px' }} />,
      title: 'Tư Vấn Chuyên Gia',
      description: 'Kết nối trực tiếp với bác sĩ để nhận tư vấn về sự phát triển của trẻ'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '40px' }} />,
      title: 'Theo Dõi Nhiều Trẻ',
      description: 'Quản lý và theo dõi sự phát triển của nhiều trẻ cùng lúc'
    },
    {
      icon: <ShareAltOutlined style={{ fontSize: '40px' }} />,
      title: 'Chia Sẻ Dữ Liệu',
      description: 'Chia sẻ thông tin sức khỏe của trẻ với bác sĩ để nhận tư vấn'
    },
    {
      icon: <FileTextOutlined style={{ fontSize: '40px' }} />,
      title: 'Báo Cáo Chi Tiết',
      description: 'Xuất báo cáo chi tiết về sự phát triển của trẻ theo thời gian'
    }
  ];

  return (
    <Container className="py-5" style={{ background: '#fff' }}>
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 style={{ color: 'var(--color-first)', fontWeight: 'bold' }} className="mb-3">
            Tính Năng Nổi Bật
          </h1>
          <p style={{ color: 'var(--color-third)' }} className="lead">
            Giải pháp toàn diện giúp theo dõi và đảm bảo sự phát triển khỏe mạnh của trẻ
          </p>
        </Col>
      </Row>

      {/* Features Grid */}
      <Row>
        {features.map((feature, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="h-100 text-center p-4" 
                  style={{ 
                    transition: 'all 0.3s ease',
                    border: '1px solid var(--color-fourth)'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = 'var(--color-second)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'var(--color-fourth)';
                  }}>
              <Card.Body>
                <div className="mb-4" style={{ color: 'var(--color-second)' }}>
                  {feature.icon}
                </div>
                <Card.Title 
                  className="mb-3" 
                  style={{ 
                    color: 'var(--color-first)',
                    fontWeight: 'bold'
                  }}>
                  {feature.title}
                </Card.Title>
                <Card.Text style={{ color: 'var(--color-third)' }}>
                  {feature.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features; 