import React from 'react';
import { Typography, Row, Col, Card, Avatar, Timeline, Space, Button, Divider } from 'antd';
import {
  RocketOutlined,
  HeartOutlined,
  TeamOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const teamMembers = [
  {
    name: 'TS. Nguyễn Văn A',
    role: 'Giám đốc Y khoa',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    description: 'Bác sĩ chuyên khoa nhi với hơn 15 năm kinh nghiệm'
  },
  {
    name: 'ThS. Trần Thị B',
    role: 'Trưởng phòng Tư vấn',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    description: 'Chuyên gia tư vấn dinh dưỡng và phát triển trẻ em'
  },
  {
    name: 'KS. Lê Văn C',
    role: 'Giám đốc Công nghệ',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    description: 'Chuyên gia công nghệ với 10 năm kinh nghiệm phát triển phần mềm y tế'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'Thành lập công ty',
    description: 'Khởi đầu với đội ngũ 5 thành viên đầu tiên'
  },
  {
    year: '2021',
    title: 'Ra mắt ứng dụng',
    description: 'Phiên bản đầu tiên của ứng dụng theo dõi sức khỏe trẻ em'
  },
  {
    year: '2022',
    title: 'Mở rộng dịch vụ',
    description: 'Triển khai dịch vụ tư vấn trực tuyến với bác sĩ'
  },
  {
    year: '2023',
    title: 'Phát triển mạnh mẽ',
    description: 'Đạt mốc 10,000+ người dùng tin tưởng sử dụng'
  }
];

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #006e61 0%, #00c0b5 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <Title level={1} style={{ color: 'white', marginBottom: '20px' }}>
          Về Chúng Tôi
        </Title>
        <Paragraph style={{ 
          fontSize: '18px',
          maxWidth: '800px',
          margin: '0 auto',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          Chúng tôi là đội ngũ chuyên gia tận tâm, luôn nỗ lực mang đến giải pháp tốt nhất
          để theo dõi và chăm sóc sức khỏe trẻ em
        </Paragraph>
      </div>

      {/* Mission & Vision Section */}
      <div style={{ padding: '80px 20px', background: '#fff' }}>
        <Row justify="center" gutter={[32, 32]} style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Col xs={24} md={12}>
            <Card
              style={{ height: '100%', borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              title={
                <Space>
                  <RocketOutlined style={{ color: '#006e61', fontSize: '24px' }} />
                  <span style={{ color: '#006e61' }}>Sứ mệnh</span>
                </Space>
              }
            >
              <Paragraph style={{ fontSize: '16px' }}>
                Chúng tôi cam kết mang đến công cụ hiện đại và hiệu quả nhất để giúp phụ huynh theo dõi
                sự phát triển của con, đảm bảo mọi trẻ em đều có cơ hội phát triển tốt nhất.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              style={{ height: '100%', borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              title={
                <Space>
                  <HeartOutlined style={{ color: '#006e61', fontSize: '24px' }} />
                  <span style={{ color: '#006e61' }}>Tầm nhìn</span>
                </Space>
              }
            >
              <Paragraph style={{ fontSize: '16px' }}>
                Trở thành nền tảng hàng đầu trong lĩnh vực theo dõi và chăm sóc sức khỏe trẻ em,
                kết nối phụ huynh với đội ngũ chuyên gia y tế hàng đầu.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Team Section */}
      <div style={{ padding: '80px 20px', background: '#f8fffe' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#006e61', marginBottom: '60px' }}>
            Đội ngũ chuyên gia
          </Title>
          <Row gutter={[32, 32]}>
            {teamMembers.map((member, index) => (
              <Col xs={24} md={8} key={index}>
                <Card
                  style={{ 
                    textAlign: 'center',
                    borderRadius: '20px',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                  }}
                >
                  <Avatar size={120} src={member.avatar} style={{ marginBottom: '20px' }} />
                  <Title level={4} style={{ marginBottom: '8px' }}>{member.name}</Title>
                  <Paragraph style={{ color: '#00c0b5', marginBottom: '16px' }}>{member.role}</Paragraph>
                  <Paragraph style={{ color: '#666' }}>{member.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Timeline Section */}
      <div style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#006e61', marginBottom: '60px' }}>
            Hành trình phát triển
          </Title>
          <Timeline mode="alternate" items={milestones.map(milestone => ({
            children: (
              <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Title level={4} style={{ color: '#006e61', marginBottom: '8px' }}>{milestone.year}</Title>
                <Title level={5} style={{ marginBottom: '8px' }}>{milestone.title}</Title>
                <Paragraph style={{ color: '#666', margin: 0 }}>{milestone.description}</Paragraph>
              </Card>
            )
          }))} />
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ 
        padding: '80px 20px',
        background: 'linear-gradient(135deg, #006e61 0%, #00c0b5 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: 'white', marginBottom: '40px' }}>
            Liên hệ với chúng tôi
          </Title>
          <Row justify="center" gutter={[32, 32]}>
            <Col xs={24} md={8}>
              <Space direction="vertical" size="large">
                <EnvironmentOutlined style={{ fontSize: '24px' }} />
                <Paragraph style={{ color: 'white' }}>
                  123 Đường ABC, Quận XYZ<br />
                  TP. Hồ Chí Minh
                </Paragraph>
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <Space direction="vertical" size="large">
                <PhoneOutlined style={{ fontSize: '24px' }} />
                <Paragraph style={{ color: 'white' }}>
                  Hotline: 1900 1234<br />
                  Tư vấn: 0123 456 789
                </Paragraph>
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <Space direction="vertical" size="large">
                <MailOutlined style={{ fontSize: '24px' }} />
                <Paragraph style={{ color: 'white' }}>
                  support@example.com<br />
                  info@example.com
                </Paragraph>
              </Space>
            </Col>
          </Row>
          <Button 
            type="primary"
            size="large"
            style={{
              marginTop: '40px',
              background: 'white',
              color: '#006e61',
              height: '48px',
              padding: '0 40px',
              borderRadius: '24px',
              border: 'none'
            }}
          >
            Gửi tin nhắn cho chúng tôi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 