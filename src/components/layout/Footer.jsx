import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider, Input, Button } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  YoutubeOutlined,
  SendOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ 
      background: '#001529', 
      padding: '60px 0 20px',
      position: 'relative',
      width: '100%',
      bottom: 0,
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Row gutter={[32, 32]}>
          {/* Thông tin công ty */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
              GrowthTrack
            </Title>
            <Text style={{ color: '#ffffff99' }}>
              Hệ thống theo dõi sự tăng trưởng của trẻ từ sơ sinh đến trưởng thành.
              Giúp phụ huynh theo dõi và đảm bảo sự phát triển khỏe mạnh của con.
            </Text>
            <Space direction="horizontal" size="middle" style={{ marginTop: '20px' }}>
              <Link href="#" style={{ color: '#fff', fontSize: '20px' }}>
                <FacebookOutlined />
              </Link>
              <Link href="#" style={{ color: '#fff', fontSize: '20px' }}>
                <TwitterOutlined />
              </Link>
              <Link href="#" style={{ color: '#fff', fontSize: '20px' }}>
                <InstagramOutlined />
              </Link>
              <Link href="#" style={{ color: '#fff', fontSize: '20px' }}>
                <YoutubeOutlined />
              </Link>
            </Space>
          </Col>

          {/* Links hữu ích */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
              Liên kết
            </Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Link href="/about" style={{ color: '#ffffff99',  }}>Về chúng tôi</Link>
              <Link href="/services" style={{ color: '#ffffff99' }}>Dịch vụ</Link>
              <Link href="/blog" style={{ color: '#ffffff99' }}>Blog</Link>
              <Link href="/contact" style={{ color: '#ffffff99' }}>Liên hệ</Link>
              <Link href="/faq" style={{ color: '#ffffff99' }}>FAQ</Link>
            </Space>
          </Col>

          {/* Thông tin liên hệ */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
              Liên hệ
            </Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
              <Space>
                <PhoneOutlined style={{ color: '#ffffff99' }} />
                <Text style={{ color: '#ffffff99' }}>+84 123 456 789</Text>
              </Space>
              <Space>
                <MailOutlined style={{ color: '#ffffff99' }} />
                <Text style={{ color: '#ffffff99' }}>support@kidgrowth.vn</Text>
              </Space>
              <Space>
                <EnvironmentOutlined style={{ color: '#ffffff99' }} />
                <Text style={{ color: '#ffffff99' }}>
                  123 Đường ABC, Quận XYZ, TP.HCM
                </Text>
              </Space>
            </Space>
          </Col>

          {/* Newsletter */}
          <Col xs={24} sm={12} md={6}>
            <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>
              Đăng ký nhận tin
            </Title>
            <Text style={{ color: '#ffffff99', display: 'block', marginBottom: '20px' }}>
              Nhận thông tin mới nhất về sức khỏe và phát triển của trẻ
            </Text>
            <Space.Compact style={{ width: '100%' }}>
              <Input placeholder="Email của bạn" />
              <Button style={{backgroundColor: 'var(--color-first)', color: 'white'}} icon={<SendOutlined />}>
                Gửi
              </Button>
            </Space.Compact>
          </Col>
        </Row>

        <Divider style={{ borderColor: '#ffffff33', margin: '40px 0 20px' }} />

        {/* Copyright */}
        <Row justify="space-between" align="middle">
          <Col>
            <Text style={{ color: '#ffffff99' }}>
              © 2024 GrowthTrack. All rights reserved.
            </Text>
          </Col>
          <Col>
            <Space split={<Divider type="vertical" style={{ borderColor: '#ffffff33' }} />}>
              <Link href="/privacy" style={{ color: '#ffffff99' }}>
                Chính sách bảo mật
              </Link>
              <Link href="/terms" style={{ color: '#ffffff99' }}>
                Điều khoản sử dụng
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default AppFooter;
