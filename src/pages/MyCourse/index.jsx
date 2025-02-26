import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faChalkboardTeacher,
  faBook,
  faCirclePlay,
  faCheckCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Progress, Tabs } from "antd";
import { useParams } from "react-router-dom";
import { handleGetAllCourseByUser } from "../../services/user-service";

const MyCourse = () => {
  const [activeTab, setActiveTab] = useState("inProgress");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const getCourseByUserId = async () => {
      try {
        setLoading(true);
        const res = await handleGetAllCourseByUser(userId);
        if (res?.data) {
          setCourses(res.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourseByUserId();
  }, [userId]);

  const myCourses = [
    {
      id: 1,
      title: "Khóa học vẽ cơ bản cho người mới bắt đầu",
      image: "https://example.com/course1.jpg",
      instructor: "Nguyễn Văn A",
      duration: "8 tuần",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      lastAccessed: "2 ngày trước",
      status: "inProgress",
    },
    {
      id: 2,
      title: "Khóa học vẽ màu nước nâng cao",
      image: "https://example.com/course2.jpg",
      instructor: "Trần Thị B",
      duration: "10 tuần",
      progress: 100,
      totalLessons: 30,
      completedLessons: 30,
      lastAccessed: "1 tuần trước",
      status: "completed",
    },
    // Add more courses...
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple to-background-color-cover">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-realWhite mb-4">
              Khóa học của tôi
            </h1>
            <p className="text-lg text-realWhite/90">
              Theo dõi tiến độ học tập và tiếp tục các khóa học của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Course List Section */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="2x"
              className="text-purple"
            />
          </div>
        ) : (
          <div className="bg-realWhite rounded-2xl shadow-lg p-6">
            <Tabs
              defaultActiveKey="inProgress"
              onChange={setActiveTab}
              className="custom-tabs"
              items={[
                {
                  key: "inProgress",
                  label: (
                    <span className="px-4 py-2 text-base font-medium">
                      Đang học
                    </span>
                  ),
                  children: (
                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      {courses
                        .filter((course) => course.status === "inProgress")
                        .map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                  ),
                },
                {
                  key: "completed",
                  label: (
                    <span className="px-4 py-2 text-base font-medium">
                      Đã hoàn thành
                    </span>
                  ),
                  children: (
                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                      {courses
                        .filter((course) => course.status === "completed")
                        .map((course) => (
                          <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        )}
      </section>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course }) => {
  return (
    <div className="bg-realWhite rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Course Image */}
        <div className="md:w-2/5 relative h-48 md:h-auto">
          <img
            src={course.image}
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Course Content */}
        <div className="flex-1 p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
            {course.title}
          </h3>

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="text-purple"
            />
            <span className="font-medium">{course.instructor}</span>
          </div>

          {/* Progress */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                {course.completedLessons}/{course.totalLessons} bài học
              </span>
              <span>{course.progress}%</span>
            </div>
            <Progress
              percent={course.progress}
              status={course.status === "completed" ? "success" : "active"}
              strokeColor={
                course.status === "completed" ? "#9fd8cd" : "#9382D3"
              }
              showInfo={false}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-purple" />
              <span>Truy cập {course.lastAccessed}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBook} className="text-purple" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-purple hover:bg-background-color-cover text-realWhite py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium">
            {course.status === "completed" ? (
              <>
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>Xem lại khóa học</span>
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCirclePlay} />
                <span>Tiếp tục học</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
