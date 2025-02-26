import { useEffect, useState } from "react";
import { Button, InputNumber, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCreditCard,
  faCartShopping,
  faArrowLeft,
  faGift,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { handleGetPendingCourse } from "../../services/user-service";
import { toast } from "react-toastify";

const Cart = () => {
  const { userId } = useParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPendingCart = async () => {
      try {
        setLoading(true);
        const response = await handleGetPendingCourse(userId);

        if (response && Array.isArray(response)) {
          // Format data từ API để phù hợp với cấu trúc hiện tại
          const formattedCart = response.map((item) => ({
            id: item.courseId,
            name: item.courseName,
            image: item.courseImage || "/default-course.jpg", // Fallback image
            price: item.price,
            originalPrice: item.originalPrice,
            quantity: 1, // Mặc định là 1 hoặc lấy từ API nếu có
            instructor: item.instructorName,
            duration: `${item.duration || 0} giờ`,
            level: item.level || "Cơ bản",
          }));

          setCartItems(formattedCart);
        } else {
          // Nếu response không phải array hoặc không có data
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Có lỗi xảy ra khi tải giỏ hàng");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getPendingCart();
    }
  }, [userId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải giỏ hàng...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-4xl text-red-600"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
          <Button
            onClick={() => window.location.reload()}
            className="bg-pink-600 hover:bg-pink-700 text-white border-none"
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = async (id, value) => {
    try {
      // Gọi API để cập nhật số lượng nếu cần
      // await updateCartItemQuantity(id, value);

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: value } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Không thể cập nhật số lượng");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      // Gọi API để xóa item khỏi cart nếu cần
      // await removeFromCart(id);

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success("Đã xóa khóa học khỏi giỏ hàng");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Không thể xóa khóa học");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-600 hover:text-pink-600 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
            <span className="font-medium">Quay lại</span>
          </Link>
          <div className="bg-white px-6 py-2 rounded-full shadow-sm">
            <span className="font-semibold text-gray-900">
              {cartItems.length} khóa học trong giỏ
            </span>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-grow space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6 flex items-start gap-6">
                    {/* Course Image */}
                    <div className="relative w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden group">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {item.level}
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-pink-600 transition-colors">
                            {item.name}
                          </h3>
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center text-gray-600">
                              <span className="w-2 h-2 bg-pink-600 rounded-full mr-2"></span>
                              Giảng viên: {item.instructor}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                              Thời lượng: {item.duration}
                            </div>
                          </div>
                        </div>
                        <Tooltip title="Xóa khóa học">
                          <Button
                            type="text"
                            danger
                            icon={<FontAwesomeIcon icon={faTrash} />}
                            onClick={() => handleRemoveItem(item.id)}
                            className="hover:bg-red-50 rounded-xl"
                          />
                        </Tooltip>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            {formatPrice(item.price)}
                          </span>
                          {item.originalPrice > item.price && (
                            <>
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(item.originalPrice)}
                              </span>
                              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full font-medium">
                                Giảm{" "}
                                {Math.round(
                                  (1 - item.price / item.originalPrice) * 100
                                )}
                                %
                              </span>
                            </>
                          )}
                        </div>
                        <InputNumber
                          min={1}
                          max={99}
                          value={item.quantity}
                          onChange={(value) =>
                            handleQuantityChange(item.id, value)
                          }
                          className="w-24 hover:border-pink-500 focus:border-pink-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl p-6 sticky top-8 border border-gray-100 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-dashed">
                  Tổng đơn hàng
                </h2>

                {/* Promo Code Input */}
                <div className="flex gap-2 mb-8">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="flex-grow px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                  <Button
                    icon={<FontAwesomeIcon icon={faGift} />}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white border-none hover:opacity-90 rounded-xl px-6"
                  >
                    Áp dụng
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span className="font-medium">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Giảm giá</span>
                    <span className="font-medium text-green-600">
                      -{formatPrice(0)}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-dashed">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-gray-900 font-semibold">
                        Tổng cộng
                      </span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        {formatPrice(calculateTotal())}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      (Đã bao gồm VAT nếu có)
                    </p>
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  icon={
                    <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                  }
                  className="mt-8 h-14 bg-gradient-to-r from-pink-600 to-purple-600 border-none text-lg font-semibold hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  Thanh toán ngay
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="text-4xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Bạn chưa có khóa học nào trong giỏ hàng. Hãy khám phá các khóa học
              của chúng tôi!
            </p>
            <Link to="/courses">
              <Button
                type="primary"
                size="large"
                className="h-14 px-10 bg-gradient-to-r from-pink-600 to-purple-600 border-none text-lg font-semibold hover:opacity-90 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                Khám phá khóa học
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
