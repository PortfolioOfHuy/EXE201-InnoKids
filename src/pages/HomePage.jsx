import React, { useEffect } from "react";
import {
  Typography,
  Button,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  List,
  Tag,
  Divider,
} from "antd";
import {
  LineChartOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { handleGetAllPackage } from "../services/package-service";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <LineChartOutlined style={{ fontSize: "32px", color: "#0d809d" }} />,
    title: "Theo dõi tăng trưởng",
    description:
      "Theo dõi chiều cao, cân nặng và BMI của trẻ qua các biểu đồ trực quan",
  },
  {
    icon: (
      <SafetyCertificateOutlined
        style={{ fontSize: "32px", color: "#0d809d" }}
      />
    ),
    title: "Cảnh báo thông minh",
    description: "Nhận cảnh báo kịp thời về các vấn đề phát triển bất thường",
  },
  {
    icon: <TeamOutlined style={{ fontSize: "32px", color: "#0d809d" }} />,
    title: "Tư vấn chuyên môn",
    description: "Kết nối trực tiếp với đội ngũ bác sĩ chuyên môn cao",
  },
];

const formatCurrency = (number) => {
  return new Intl.NumberFormat("vi-VN").format(number) + "đ";
};

const HomePage = () => {
  const [packages, setPackages] = React.useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const getAllPackage = async () => {
      try {
        const res = await handleGetAllPackage();
        if (res?.data) {
          const formattedPackages = res.data.map((pkg) => {
            return {
              id: pkg.id,
              title: `Gói ${pkg.name}`,
              price: formatCurrency(pkg.price),
              duration: `${pkg.name}`,
              features: getFeaturesByDuration(pkg.name),
              popular: pkg.name === "12 tháng",
              buttonText: pkg.name === "12 tháng" ? "Chọn gói này" : "Mua ngay",
              expireDate: new Date(pkg.expire),
            };
          });
          setPackages(formattedPackages);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    getAllPackage();
  }, []);

  const getFeaturesByDuration = (duration) => {
    return [
      "Biểu đồ tăng trưởng chi tiết",
      "Tư vấn bác sĩ",
      "Nhận lời khuyên và xem các blog từ các bác sĩ",
    ];
  };

  const handleSelectPackage = (packageId) => {
    if (!user) {
      navigate("/signin");
      return;
    }
    navigate(`/${user.Id}/payment?packageId=${packageId}`);
  };

  return (
    <div>
      {/* Hero Section - Using primary colors blend */}
      <div
        style={{
          background: `
          linear-gradient(135deg, 
            #006e61 0%,
            #00c0b5 50%,
            #0d809d 75%,
            #82c0e5 100%
          ),
          radial-gradient(
            circle at top right,
            rgba(130, 192, 229, 0.4) 0%,
            transparent 60%
          ),
          radial-gradient(
            circle at bottom left,
            rgba(0, 110, 97, 0.6) 0%,
            transparent 60%
          )
        `,
          backgroundBlendMode: "soft-light, screen, multiply",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating elements */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(0, 192, 181, 0.5) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(15px)",
            animation: "float 6s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "15%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 70% 70%, rgba(13, 128, 157, 0.5) 0%, rgba(255,255,255,0) 70%)",
            filter: "blur(20px)",
            animation: "float 8s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Content container */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Title
            level={1}
            style={{
              color: "white",
              marginBottom: "20px",
              fontSize: "2.8em",
              fontWeight: 700,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            Theo Dõi Sự Phát Triển Của Con Bạn
          </Title>
          <Paragraph
            style={{
              fontSize: "20px",
              maxWidth: "800px",
              margin: "0 auto 40px",
              opacity: 0.95,
              lineHeight: 1.6,
            }}
          >
            Giải pháp toàn diện giúp theo dõi và đảm bảo sự phát triển khỏe mạnh
            của trẻ từ sơ sinh đến trưởng thành
          </Paragraph>
          <Space size="large">
            <Button
              size="large"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                color: "#006e61",
                height: "52px",
                padding: "0 40px",
                fontSize: "17px",
                fontWeight: 600,
                border: "none",
                borderRadius: "26px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
              }}
            >
              Tìm hiểu thêm
            </Button>
          </Space>
        </div>
      </div>

      {/* Statistics Section */}
      <div style={{ background: "#f8fffe", padding: "40px 20px" }}>
        <Row justify="center" gutter={[32, 32]}>
          <Col>
            <Statistic
              title="Người dùng tin tưởng"
              value={10000}
              suffix="+"
              style={{ color: "#006e61" }}
            />
          </Col>
          <Col>
            <Statistic
              title="Bác sĩ chuyên môn"
              value={50}
              suffix="+"
              style={{ color: "#00c0b5" }}
            />
          </Col>
          <Col>
            <Statistic
              title="Đánh giá tích cực"
              value={98}
              suffix="%"
              style={{ color: "#0d809d" }}
            />
          </Col>
        </Row>
      </div>

      {/* Features Section */}
      <div
        style={{ padding: "60px 20px", maxWidth: "1200px", margin: "0 auto" }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "40px",
            color: "#006e61",
          }}
        >
          Tính năng nổi bật
        </Title>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                style={{
                  height: "100%",
                  textAlign: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  border: "none",
                  borderRadius: "12px",
                }}
                hoverable
              >
                {React.cloneElement(feature.icon, {
                  style: {
                    fontSize: "32px",
                    color:
                      index === 0
                        ? "#006e61"
                        : index === 1
                        ? "#00c0b5"
                        : "#0d809d",
                  },
                })}
                <Title
                  level={4}
                  style={{ marginTop: "16px", color: "#006e61" }}
                >
                  {feature.title}
                </Title>
                <Paragraph style={{ color: "#666" }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Pricing Section */}
      <div
        style={{
          background: "linear-gradient(180deg, #f8fffe 0%, #ffffff 100%)",
          padding: "60px 20px",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            color: "#006e61",
            marginBottom: "40px",
          }}
        >
          Chọn gói phù hợp với bạn
        </Title>

        <Row
          justify="center"
          gutter={[32, 32]}
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          {packages.map((plan, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                style={{
                  height: "100%",
                  textAlign: "center",
                  borderRadius: "16px",
                  border: plan.popular
                    ? "2px solid #00c0b5"
                    : "1px solid #e8e8e8",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
                hoverable
              >
                {plan.popular && (
                  <Tag
                    color="#00c0b5"
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      borderRadius: "6px",
                    }}
                  >
                    Phổ biến nhất
                  </Tag>
                )}

                <Title
                  level={3}
                  style={{ color: "#2c3e50", marginBottom: "24px" }}
                >
                  {plan.title}
                </Title>

                <Title
                  level={2}
                  style={{ color: "#00c0b5", marginBottom: "32px" }}
                >
                  {plan.price}
                </Title>

                <List
                  dataSource={plan.features}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        border: "none",
                        padding: "8px 16px",
                      }}
                    >
                      <Space>
                        <CheckCircleOutlined style={{ color: "#00c0b5" }} />
                        <span>{item}</span>
                      </Space>
                    </List.Item>
                  )}
                  style={{
                    textAlign: "left",
                    marginBottom: "32px",
                  }}
                />

                <Button
                  type={plan.popular ? "primary" : "default"}
                  size="large"
                  style={{
                    width: "100%",
                    height: "44px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    ...(plan.popular && {
                      backgroundColor: "#00c0b5",
                      borderColor: "#00c0b5",
                    }),
                  }}
                  onClick={() => handleSelectPackage(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div
        style={{
          padding: "60px 20px",
          textAlign: "center",
          background: `
          linear-gradient(135deg, #006e61 0%, #00c0b5 100%),
          radial-gradient(circle at top right, #82c0e5 0%, transparent 60%)
        `,
          backgroundBlendMode: "soft-light, screen",
          color: "white",
        }}
      >
        <Title level={2} style={{ color: "white", marginBottom: "20px" }}>
          Bắt đầu theo dõi sự phát triển của con bạn ngay hôm nay
        </Title>
        <Paragraph style={{ fontSize: "18px", marginBottom: "30px" }}>
          Đăng ký miễn phí và trải nghiệm các tính năng tuyệt vời của chúng tôi
        </Paragraph>
        <Button
          href="/signup"
          size="large"
          style={{
            background: "white",
            color: "#006e61",
            height: "48px",
            padding: "0 40px",
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
            borderRadius: "24px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            textDecoration: "none",
          }}
        >
          Tạo tài khoản miễn phí
        </Button>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
