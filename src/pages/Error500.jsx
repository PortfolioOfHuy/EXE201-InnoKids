import React from 'react';
import { Button, Typography, Space } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Error500 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #006e61 0%, #00c0b5 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        {/* Error Illustration */}
        <div
          style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: 'rgba(255, 255, 255, 0.2)',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          500
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '24px',
              color: 'white',
              whiteSpace: 'nowrap',
            }}
          >
            Oops!
          </div>
        </div>

        {/* Error Message */}
        <Title
          level={2}
          style={{
            color: 'white',
            marginBottom: '16px',
            fontSize: '28px',
          }}
        >
          Đã có lỗi xảy ra
        </Title>

        <Paragraph
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '16px',
            marginBottom: '32px',
          }}
        >
          Xin lỗi, máy chủ đang gặp sự cố. Vui lòng thử lại sau hoặc liên hệ với
          chúng tôi nếu vấn đề vẫn tiếp tục.
        </Paragraph>

        {/* Action Buttons */}
        <Space size="middle">
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => window.location.reload()}
            style={{
              height: '44px',
              padding: '0 24px',
              fontSize: '16px',
              borderRadius: '8px',
              backgroundColor: 'white',
              borderColor: 'white',
              color: '#006e61',
            }}
          >
            Thử lại
          </Button>
          <Button
            icon={<HomeOutlined />}
            onClick={() => navigate('/')}
            style={{
              height: '44px',
              padding: '0 24px',
              fontSize: '16px',
              borderRadius: '8px',
              borderColor: 'white',
            }}
          >
            Về trang chủ
          </Button>
        </Space>

        {/* Contact Information */}
        <Paragraph
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px',
            marginTop: '40px',
          }}
        >
          Nếu bạn cần hỗ trợ, vui lòng liên hệ:{' '}
          <a
            href="mailto:support@example.com"
            style={{
              color: 'white',
              textDecoration: 'underline',
            }}
          >
            support@example.com
          </a>
        </Paragraph>

        {/* Animated Background Elements */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                width: '300px',
                height: '300px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
                animation: `float ${5 + index}s ease-in-out infinite`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${0.5 + Math.random()})`,
              }}
            />
          ))}
        </div>

        {/* Animation Keyframes */}
        <style>
          {`
            @keyframes float {
              0% { transform: translate(0, 0) rotate(0deg); }
              50% { transform: translate(-20px, -20px) rotate(5deg); }
              100% { transform: translate(0, 0) rotate(0deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Error500; 