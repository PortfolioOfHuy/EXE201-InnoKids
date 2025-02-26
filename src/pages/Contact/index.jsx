import {
  faAngleRight,
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Contact = () => {
  const contactInfo = [
    {
      icon: faPhone,
      title: "Điện thoại",
      content: "+84 123 456 789",
      link: "tel:+84123456789",
    },
    {
      icon: faEnvelope,
      title: "Email",
      content: "innokids.education@gmail.com",
      link: "mailto:innokids.education@gmail.com",
    },
    {
      icon: faLocationDot,
      title: "Địa chỉ",
      content: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
      link: "https://maps.google.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-purple text-white py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading mb-6">
            liên hệ với innokids
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Hãy liên hệ với chúng tôi khi bạn có bất kì thắc mắc nào nhé!
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group"
              >
                <FontAwesomeIcon
                  icon={info.icon}
                  className="text-3xl text-purple mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-600">{info.content}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-white py-16 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Hãy điền thông tin của bạn bên dưới
            </h2>
            <p className="text-gray-600">
              Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
              />
            </div>

            <div>
              <textarea
                placeholder="Nội dung"
                rows="6"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-purple text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-all inline-flex items-center gap-2 group"
              >
                <span>Gửi tin nhắn</span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.696199620684!2d105.84315731531904!3d21.007025393946276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac76ccab6dd7%3A0x55e92a5b07a97d03!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1647850273556!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;
