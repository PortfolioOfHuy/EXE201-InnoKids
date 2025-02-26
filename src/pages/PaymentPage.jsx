import React, { useEffect, useState } from "react";
import { Typography, Card, Button, Space, Steps, Divider, message } from "antd";
import { SafetyOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { handleGetPremiumById } from "../services/package-service";
import {
  handleAddPayment,
  handleCreatePayment,
} from "../services/payment-service";

const { Title, Text } = Typography;

const PaymentPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const packageId = searchParams.get("packageId");
  const [buyPackage, setBuyPackage] = useState(null);

  useEffect(() => {
    const getPremiumById = async () => {
      try {
        const res = await handleGetPremiumById(packageId);
        if (res?.data) {
          setBuyPackage(res.data);
        }
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    getPremiumById();
  }, [packageId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handlePayment = async () => {
    try {
      const res = await handleCreatePayment(packageId);
      const newRes = await handleAddPayment(
        res.data.paymentLinkId,
        userId,
        packageId,
        res.data.amount,
        res.data.status,
        res.data.orderCode,
        res.data.accountNumber,
        res.data.description
      );

      if (newRes.status !== 200) {
        message.error("Tạo thanh toán thất bại!!");
      } else {
        message.success("Tạo thanh toán thành công");
        if (res?.data?.checkoutUrl) {
          window.location.href = res.data.checkoutUrl;
        } else {
          console.error("Không nhận được URL thanh toán");
          message.error("Có lỗi xảy ra khi tạo đơn thanh toán");
        }
      }
    } catch (error) {
      console.error("Lỗi khi tạo thanh toán:", error);
      message.error("Có lỗi xảy ra khi tạo đơn thanh toán");
    }
  };

  if (!buyPackage) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #006e61 0%, #00c0b5 100%)",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Steps
          current={1}
          items={[
            { title: "Chọn gói", status: "finish" },
            { title: "Xác nhận", status: "process" },
            { title: "Thanh toán", status: "wait" },
          ]}
          style={{ marginBottom: "40px" }}
        />

        <Card style={{ borderRadius: "12px" }}>
          <Title level={2} style={{ textAlign: "center", color: "#006e61" }}>
            Xác nhận đơn hàng
          </Title>

          <Card type="inner" style={{ marginBottom: "20px" }}>
            <Title level={4} style={{ color: "#006e61", margin: 0 }}>
              Gói Premium {buyPackage.name}
            </Title>
            <Text type="secondary">
              Thời hạn sử dụng: {buyPackage.name} kể từ ngày kích hoạt
            </Text>
            <div style={{ marginTop: "12px" }}>
              <Text type="secondary">
                Ngày hết hạn:{" "}
                {new Date(buyPackage.expire).toLocaleDateString("vi-VN")}
              </Text>
            </div>
          </Card>

          <Card type="inner">
            <Space direction="vertical" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Giá gói</Text>
                <Text>{formatCurrency(buyPackage.price)}</Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>Khuyến mãi</Text>
                <Text type="success">
                  {buyPackage.discount
                    ? `-${formatCurrency(buyPackage.discount)}`
                    : "-"}
                </Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text strong>Tổng thanh toán</Text>
                <Text strong style={{ fontSize: "24px", color: "#00c0b5" }}>
                  {formatCurrency(
                    buyPackage.price - (buyPackage.discount || 0)
                  )}
                </Text>
              </div>
            </Space>
          </Card>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Button
              type="primary"
              size="large"
              onClick={handlePayment}
              style={{
                height: "48px",
                width: "100%",
                backgroundColor: "#00c0b5",
                borderColor: "#00c0b5",
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              Thanh toán ngay
            </Button>

            <div style={{ marginTop: "16px" }}>
              <Space align="center">
                <SafetyOutlined style={{ color: "#00c0b5" }} />
                <Text type="secondary">Giao dịch được bảo mật và mã hóa</Text>
              </Space>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
