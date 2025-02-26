import React, { useEffect, useState } from "react";
import { Button, Typography, Space, Card, Steps, Tag, message } from "antd";
import {
  CheckCircleFilled,
  HomeOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  handleGetLink,
  handleUpdatePayment,
} from "../services/payment-service";

const { Title, Paragraph, Text } = Typography;

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const paymentId = searchParams.get("id");
  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");

  useEffect(() => {
    const updatePayment = async () => {
      try {
        const res = await handleUpdatePayment(paymentId, status);
        if (res.status !== 200) {
          message.error("Cập nhật thanh toán không thành công");
        } else {
          message.success("Cập nhật thanh toán thành công");
        }
      } catch (error) {
        console.error("Error updating payment:", error);
        message.error("Lỗi khi cập nhật thanh toán");
      }
    };

    const getLink = async () => {
      try {
        const res = await handleGetLink(orderCode);
        if (res?.data) {
          setPaymentData(res.data);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    updatePayment();
    getLink();
  }, [paymentId, status, orderCode]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (!paymentData) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #006e61 0%, #00c0b5 100%)",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Success Steps */}
        <Steps
          current={3}
          items={[
            {
              title: "Chọn gói",
              status: "finish",
            },
            {
              title: "Thanh toán",
              status: "finish",
            },
            {
              title: "Xác nhận",
              status: "finish",
            },
          ]}
          style={{
            marginBottom: "40px",
            color: "white",
          }}
        />

        {/* Success Card */}
        <Card
          style={{
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "none",
          }}
        >
          {/* Success Icon */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "#f6ffed",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <CheckCircleFilled
                style={{ fontSize: "40px", color: "#52c41a" }}
              />
            </div>
            <Title level={2} style={{ color: "#006e61", margin: 0 }}>
              Thanh toán thành công!
            </Title>
          </div>

          {/* Order Details */}
          <Card
            style={{
              background: "#f8fffe",
              marginBottom: "24px",
              borderRadius: "12px",
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Mã đơn hàng:</Text>
                <Text strong>{paymentData.orderCode}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Trạng thái:</Text>
                <Tag
                  color={paymentData.status === "PAID" ? "success" : "default"}
                >
                  {paymentData.status === "PAID"
                    ? "Đã thanh toán"
                    : paymentData.status}
                </Tag>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Số tiền:</Text>
                <Text strong style={{ color: "#00c0b5", fontSize: "18px" }}>
                  {formatCurrency(paymentData.amount)}
                </Text>
              </div>
              {paymentData.transactions?.[0] && (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text>Số tài khoản:</Text>
                    <Text>{paymentData.transactions[0].accountNumber}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text>Mô tả:</Text>
                    <Text>{paymentData.transactions[0].description}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text>Thời gian:</Text>
                    <Text>
                      {formatDateTime(
                        paymentData.transactions[0].transactionDateTime
                      )}
                    </Text>
                  </div>
                </>
              )}
            </Space>
          </Card>

          {/* Next Steps */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <Title level={4} style={{ color: "#006e61", marginBottom: "16px" }}>
              Tài khoản của bạn đã được nâng cấp!
            </Title>
            <Paragraph style={{ color: "#666" }}>
              Bạn có thể bắt đầu sử dụng các tính năng Premium ngay bây giờ.
              Chúng tôi đã gửi email xác nhận đến địa chỉ email của bạn.
            </Paragraph>
          </div>

          {/* Action Buttons */}
          <Space
            size="middle"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Button
              type="primary"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              style={{
                height: "44px",
                padding: "0 24px",
                fontSize: "16px",
                borderRadius: "8px",
                backgroundColor: "#00c0b5",
                borderColor: "#00c0b5",
              }}
            >
              Về trang chủ
            </Button>
          </Space>

          {/* Support Information */}
          <Paragraph
            style={{ textAlign: "center", marginTop: "24px", color: "#666" }}
          >
            Nếu bạn cần hỗ trợ, vui lòng liên hệ{" "}
            <a href="mailto:support@example.com" style={{ color: "#00c0b5" }}>
              support@example.com
            </a>
          </Paragraph>
        </Card>

        {/* Animated Background Elements */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
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

export default PaymentSuccess;
