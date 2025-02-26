import React, { useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Button,
  List,
  Tag,
  Space,
  Collapse,
  Divider,
} from "antd";
import {
  CheckCircleOutlined,
  CrownOutlined,
  ThunderboltOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { handleGetAllPackage } from "../services/package-service";
import { useUser } from "../contexts/UserContext";

const { Title, Paragraph } = Typography;

const premiumPlans = [
  {
    title: "Gói 1 Tháng",
    price: "199.000",
    duration: "1 tháng",
    pricePerMonth: "199.000",
    savePercent: null,
    features: [
      "Theo dõi không giới hạn số trẻ",
      "Biểu đồ tăng trưởng chi tiết",
      "Tư vấn bác sĩ 2 lần/tháng",
      "Nhận thông báo và cảnh báo",
      "Xuất báo cáo PDF",
      "Chia sẻ dữ liệu với bác sĩ",
    ],
    popular: false,
    buttonText: "Dùng thử miễn phí",
  },
  {
    title: "Gói 6 Tháng",
    price: "999.000",
    pricePerMonth: "166.500",
    duration: "6 tháng",
    originalPrice: "1.194.000",
    savePercent: 16,
    features: [
      "Tất cả tính năng của gói 1 tháng",
      "Tư vấn bác sĩ 4 lần/tháng",
      "Ưu tiên hỗ trợ qua chat",
      "Tài liệu hướng dẫn chuyên sâu",
      "Nhận quà tặng định kỳ",
      "Tiết kiệm 195.000đ mỗi tháng",
    ],
    popular: true,
    buttonText: "Chọn gói này",
  },
  {
    title: "Gói 12 Tháng",
    price: "1.788.000",
    pricePerMonth: "149.000",
    duration: "12 tháng",
    originalPrice: "2.388.000",
    savePercent: 25,
    features: [
      "Tất cả tính năng của gói 6 tháng",
      "Tư vấn bác sĩ không giới hạn",
      "Hỗ trợ ưu tiên 24/7",
      "Tham gia hội thảo miễn phí",
      "Quà tặng cao cấp",
      "Tiết kiệm 600.000đ mỗi năm",
    ],
    popular: false,
    buttonText: "Tiết kiệm nhất",
  },
];

const faqs = [
  {
    key: "1",
    question: "Làm thế nào để nâng cấp lên tài khoản Premium?",
    answer:
      "Bạn có thể dễ dàng nâng cấp lên Premium bằng cách chọn gói phù hợp và thanh toán trực tuyến qua thẻ tín dụng, chuyển khoản ngân hàng hoặc ví điện tử.",
  },
  {
    key: "2",
    question: "Tôi có thể hủy đăng ký Premium bất cứ lúc nào không?",
    answer:
      "Có, bạn có thể hủy đăng ký Premium bất cứ lúc nào. Tài khoản của bạn sẽ vẫn duy trì quyền lợi Premium cho đến hết thời hạn đã thanh toán.",
  },
  {
    key: "3",
    question: "Tôi có thể chuyển đổi giữa các gói Premium không?",
    answer:
      "Có, bạn có thể nâng cấp lên gói cao hơn bất cứ lúc nào. Khi nâng cấp, chúng tôi sẽ tính toán phần chênh lệch và thời gian còn lại của gói hiện tại.",
  },
  {
    key: "4",
    question: "Làm thế nào để tôi có thể tư vấn với bác sĩ?",
    answer:
      "Với tài khoản Premium, bạn có thể đặt lịch tư vấn trực tuyến với bác sĩ thông qua ứng dụng. Tùy theo gói bạn chọn, số lần tư vấn sẽ khác nhau trong tháng.",
  },
  {
    key: "5",
    question: "Tôi có thể theo dõi bao nhiêu trẻ trong một tài khoản Premium?",
    answer:
      "Tất cả các gói Premium đều cho phép bạn theo dõi không giới hạn số trẻ trong một tài khoản.",
  },
  {
    key: "6",
    question: "Các phương thức thanh toán được chấp nhận?",
    answer:
      "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ quốc tế, chuyển khoản ngân hàng và các ví điện tử phổ biến như Momo, ZaloPay, VNPay.",
  },
];

const formatCurrency = (number) => {
  return new Intl.NumberFormat("vi-VN").format(number) + "đ";
};

const PremiumPage = () => {
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
              features: getFeaturesByDuration(),
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

  const getFeaturesByDuration = () => {
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
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #006e61 0%, #00c0b5 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <Title level={1} style={{ color: "white", marginBottom: "20px" }}>
          Nâng cấp tài khoản Premium
        </Title>
        <Paragraph
          style={{
            fontSize: "18px",
            maxWidth: "800px",
            margin: "0 auto",
            color: "rgba(255, 255, 255, 0.9)",
          }}
        >
          Mở khóa tất cả tính năng cao cấp và tận hưởng trải nghiệm tốt nhất
          trong việc theo dõi sự phát triển của con bạn
        </Paragraph>
      </div>

      {/* Pricing Section */}
      <div style={{ padding: "80px 20px", background: "#f8fffe" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
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

          <Row gutter={[32, 32]} justify="center">
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
      </div>

      {/* Benefits Section */}
      <div style={{ padding: "80px 20px", background: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <Title level={2} style={{ color: "#006e61", marginBottom: "40px" }}>
            Đặc quyền Premium
          </Title>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} md={8}>
              <StarOutlined style={{ fontSize: "32px", color: "#00c0b5" }} />
              <Title level={4} style={{ color: "#006e61", margin: "20px 0" }}>
                Tư vấn chuyên sâu
              </Title>
              <Paragraph style={{ color: "#666" }}>
                Được tư vấn trực tiếp với đội ngũ bác sĩ chuyên môn cao
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <ThunderboltOutlined
                style={{ fontSize: "32px", color: "#00c0b5" }}
              />
              <Title level={4} style={{ color: "#006e61", margin: "20px 0" }}>
                Hỗ trợ ưu tiên
              </Title>
              <Paragraph style={{ color: "#666" }}>
                Được hỗ trợ nhanh chóng và ưu tiên 24/7
              </Paragraph>
            </Col>
            <Col xs={24} md={8}>
              <CrownOutlined style={{ fontSize: "32px", color: "#00c0b5" }} />
              <Title level={4} style={{ color: "#006e61", margin: "20px 0" }}>
                Tính năng độc quyền
              </Title>
              <Paragraph style={{ color: "#666" }}>
                Truy cập đầy đủ tất cả tính năng cao cấp
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ padding: "80px 20px", background: "#f8fffe" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Title
            level={2}
            style={{
              textAlign: "center",
              color: "#006e61",
              marginBottom: "40px",
            }}
          >
            Câu hỏi thường gặp
          </Title>
          <Collapse
            accordion
            items={faqs.map((faq) => ({
              key: faq.key,
              label: (
                <span
                  style={{
                    fontSize: "16px",
                    color: "#006e61",
                    fontWeight: 500,
                  }}
                >
                  {faq.question}
                </span>
              ),
              children: (
                <Paragraph style={{ color: "#666", margin: 0 }}>
                  {faq.answer}
                </Paragraph>
              ),
            }))}
            expandIconPosition="end"
            style={{
              background: "white",
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
