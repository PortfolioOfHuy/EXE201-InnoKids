import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faDownload, 
  faUsers, 
  faBookOpen, 
  faMoneyBill,
  faChartLine
} from "@fortawesome/free-solid-svg-icons";

const TeacherDashboard = () => {
  const revenueChartRef = useRef(null);
  const visitorChartRef = useRef(null);
  const customerChartRef = useRef(null);
  const courseChartRef = useRef(null);

  useEffect(() => {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    if (revenueChartRef.current) {
      revenueChartRef.current.destroy();
    }
    revenueChartRef.current = new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        datasets: [{
          label: 'Doanh thu (triệu đồng)',
          data: [3, 7, 5, 9, 6, 8, 10],
          borderColor: '#7c3aed',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(124, 58, 237, 0.1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    // Visitor Chart (Doughnut)
    const visitorCtx = document.getElementById('visitorChart').getContext('2d');
    if (visitorChartRef.current) {
      visitorChartRef.current.destroy();
    }
    visitorChartRef.current = new Chart(visitorCtx, {
      type: 'doughnut',
      data: {
        labels: ['Mới', 'Quay lại'],
        datasets: [{
          data: [70, 30],
          backgroundColor: ['#fbbf24', '#7c3aed']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        cutout: '70%'
      }
    });

    return () => {
      if (revenueChartRef.current) {
        revenueChartRef.current.destroy();
      }
      if (visitorChartRef.current) {
        visitorChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-color-cover bg-bannerImg bg-fixed bg-cover pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Xin chào, Giảng viên! 👋
          </h1>
          <p className="text-white/80 text-lg">
            Cùng xem những thành tích tuyệt vời của bạn nhé
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow/20 rounded-xl">
                <FontAwesomeIcon icon={faMoneyBill} className="text-yellow text-xl" />
              </div>
              <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                +8%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">27.000.000đ</h3>
            <p className="text-white/60">Doanh thu tháng này</p>
          </div>

          {/* Students Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow/20 rounded-xl">
                <FontAwesomeIcon icon={faUsers} className="text-yellow text-xl" />
              </div>
              <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                +12%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">156</h3>
            <p className="text-white/60">Tổng số học viên</p>
          </div>

          {/* Courses Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow/20 rounded-xl">
                <FontAwesomeIcon icon={faBookOpen} className="text-yellow text-xl" />
              </div>
              <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                +3
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">12</h3>
            <p className="text-white/60">Khóa học đang dạy</p>
          </div>

          {/* Rating Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow/20 rounded-xl">
                <FontAwesomeIcon icon={faChartLine} className="text-yellow text-xl" />
              </div>
              <span className="text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full">
                4.8/5
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">95%</h3>
            <p className="text-white/60">Đánh giá tích cực</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                Doanh thu trong tuần
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors">
                <FontAwesomeIcon icon={faDownload} />
                Xuất báo cáo
              </button>
            </div>
            <div className="h-[300px] bg-white/5 rounded-xl p-4">
              <canvas id="revenueChart"></canvas>
            </div>
          </div>

          {/* Visitor Stats */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6">
              Thống kê học viên
            </h3>
            <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-xl p-4">
              <canvas id="visitorChart"></canvas>
            </div>
          </div>
        </div>

        {/* Course List Preview */}
        <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              Khóa học nổi bật
            </h3>
            <button className="text-yellow hover:text-yellow/80 transition-colors">
              Xem tất cả
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-yellow/20 rounded-lg flex items-center justify-center">
                    <FontAwesomeIcon icon={faBookOpen} className="text-yellow text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Vẽ màu nước cơ bản</h4>
                    <p className="text-white/60 text-sm mb-2">32 học viên đang học</p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow">4.9</span>
                      <span className="text-white/40">|</span>
                      <span className="text-white/60">12 đánh giá</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
