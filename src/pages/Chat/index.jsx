import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faImage,
  faSmile,
  faPaperclip,
  faArrowLeft,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import {
  handleGetChat,
  handleGetInstructorById,
} from "../../services/teacher-service";
import { jwtDecode } from "jwt-decode";
import {
  handleSendMessage,
  handleViewMessage,
} from "../../services/chat-service";

function Chat() {
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [authError, setAuthError] = useState(null);
  const [instructors, setInstructors] = useState({});
  const { userId } = useParams();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getAllChat = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          setAuthError("No authentication token found");
          return;
        }

        try {
          // Verify token is valid
          const decoded = jwtDecode(token);
          if (!decoded) {
            setAuthError("Invalid authentication token");
            return;
          }
        } catch (tokenError) {
          console.error("Token decode error:", tokenError);
          setAuthError("Invalid authentication token");
          return;
        }

        const res = await handleGetChat(userId);
        if (res && res.length > 0) {
          // Lưu danh sách chat vào state
          const chats = res.map((chat) => ({
            chatId: chat.chat,
            teacherId: chat.teacherId,
          }));

          setChatList(chats);

          // Get instructor information for each unique teacherId
          const uniqueTeacherIds = [
            ...new Set(chats.map((chat) => chat.teacherId)),
          ];
          const instructorData = {};

          await Promise.all(
            uniqueTeacherIds.map(async (teacherId) => {
              try {
                const instructor = await handleGetInstructorById(teacherId);
                if (instructor) {
                  instructorData[teacherId] = instructor;
                }
              } catch (error) {
                console.error(`Error fetching instructor ${teacherId}:`, error);
              }
            })
          );

          setInstructors(instructorData);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
        setAuthError("Failed to fetch chat data");
      }
    };

    getAllChat();
  }, [userId]);

  const handleSelectChat = async (chat) => {
    try {
      setLoading(true);
      setSelectedChat(chat);

      const payload = [
        {
          chatId: chat.chatId,
        },
      ];

      const response = await handleViewMessage(payload);

      if (response) {
        const formattedMessages = response.map((msg, index) => ({
          id: `${msg.chatId}-${index}`,
          content: msg.text,
          isOwn: msg.senderId === userId,
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat || isSending) return;

    try {
      setIsSending(true);

      const response = await handleSendMessage(
        selectedChat.chatId,
        userId,
        message.trim()
      );

      if (response) {
        const newMessage = {
          id: `${selectedChat.chatId}-${Date.now()}`,
          content: message.trim(),
          isOwn: true,
        };
        setMessages((prev) => [...prev, newMessage]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {authError ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-red-600 p-4">{authError}</div>
          </div>
        ) : (
          <div className="flex-1 flex overflow-hidden">
            {/* Chat List - Hidden on mobile when chat is selected */}
            <div
              className={`w-full lg:w-1/3 bg-white flex flex-col ${
                selectedChat ? "hidden lg:flex" : "flex"
              }`}
            >
              <div className="p-4 border-b border-pink-100 bg-white flex items-center">
                <Link
                  to="/"
                  className="mr-4 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
                </Link>
                <h2 className="text-xl font-bold text-gray-900">Tin nhắn</h2>
              </div>

              {/* Chat List Content */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
                {chatList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-4 md:p-8 text-center">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-pink-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                      <FontAwesomeIcon
                        icon={faPaperPlane}
                        className="w-10 h-10 md:w-14 md:h-14 text-white"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">
                      Chưa có cuộc trò chuyện nào
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                      Bạn chưa tham gia vào cuộc trò chuyện nào với giảng viên
                    </p>
                    <Link
                      to="/teachers"
                      className="bg-pink-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-medium hover:bg-pink-700 transition-colors text-sm md:text-base"
                    >
                      Tìm giảng viên
                    </Link>
                  </div>
                ) : (
                  // Chat List Items
                  chatList.map((chat) => (
                    <div
                      key={chat.chatId}
                      className={`p-3 md:p-4 border-b border-pink-100 hover:bg-pink-50 cursor-pointer transition-colors ${
                        selectedChat?.chatId === chat.chatId
                          ? "bg-pink-100"
                          : ""
                      }`}
                      onClick={() => handleSelectChat(chat)}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            instructors[chat.teacherId]?.avatar ||
                            "https://via.placeholder.com/40"
                          }
                          alt="avatar"
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-pink-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {instructors[chat.teacherId]?.fullName ||
                              "Loading..."}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-500 truncate">
                            Nhấn để xem cuộc trò chuyện
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={`w-full lg:w-2/3 bg-gray-50 flex flex-col ${
                !selectedChat ? "hidden lg:flex" : "flex"
              }`}
            >
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 bg-white border-b flex items-center gap-4 shadow-sm">
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-4 flex-1">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-100">
                          <img
                            src={
                              instructors[selectedChat.teacherId]?.avatar ||
                              "https://via.placeholder.com/40"
                            }
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {instructors[selectedChat.teacherId]?.fullName ||
                            "Loading..."}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 bg-purple">
                    {loading ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex items-end gap-2 ${
                            msg.isOwn ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          {/* Avatar */}
                          <div className="flex flex-col items-center gap-1">
                            <img
                              src={
                                msg.isOwn
                                  ? "http://res.cloudinary.com/dp2faae1n/image/upload/v1740389814/innokids/klomm7k2hego1ibsothd.jpg" ||
                                    "https://via.placeholder.com/40"
                                  : instructors[selectedChat.teacherId]
                                      ?.avatar ||
                                    "https://via.placeholder.com/40"
                              }
                              alt="avatar"
                              className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-sm"
                            />
                            <span className="text-[10px] text-gray-400">
                              {msg.isOwn
                                ? "Bạn"
                                : instructors[selectedChat.teacherId]?.fullName
                                    ?.split(" ")
                                    .pop()}
                            </span>
                          </div>

                          {/* Message Content */}
                          <div className={`group relative max-w-[60%]`}>
                            <div
                              className={`px-4 py-2.5 rounded-2xl ${
                                msg.isOwn
                                  ? "bg-white text-black"
                                  : "bg-white shadow-sm border border-gray-100"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                                {msg.content}
                              </p>
                            </div>

                            {/* Time & Status */}
                            <div
                              className={`absolute ${
                                msg.isOwn ? "-right-2" : "-left-2"
                              } -bottom-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                            >
                              <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-full shadow-sm">
                                {new Date(msg.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                              {msg.isOwn && (
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className={`w-3 h-3 ${
                                    msg.seen
                                      ? "text-green-500"
                                      : "text-gray-400"
                                  }`}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="bg-white border-t p-4">
                    <form
                      onSubmit={handleSubmit}
                      className="flex items-end gap-3"
                    >
                      <div className="flex-1 relative">
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Nhập tin nhắn..."
                          className="w-full px-4 py-3 pr-24 text-sm bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-100 transition-all min-h-[44px] max-h-[120px] scrollbar-thin scrollbar-thumb-gray-300"
                          style={{ height: "auto" }}
                          rows="1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSubmit(e);
                            }
                          }}
                          onInput={(e) => {
                            e.target.style.height = "auto";
                            e.target.style.height =
                              Math.min(e.target.scrollHeight, 120) + "px";
                          }}
                        />

                        <div className="absolute right-3 bottom-2.5 flex items-center gap-1">
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faImage}
                              className="w-4 h-4"
                            />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
                          >
                            <FontAwesomeIcon
                              icon={faSmile}
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSending || !message.trim()}
                        className={`
                          w-12 h-12 flex items-center justify-center rounded-full shadow-lg
                          ${
                            isSending || !message.trim()
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-pink-500 text-white hover:bg-pink-600 hover:shadow-xl active:scale-95"
                          }
                          transition-all duration-200
                        `}
                      >
                        {isSending ? (
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="w-5 h-5"
                          />
                        )}
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                // Welcome Screen - Hidden on Mobile
                <div className="hidden lg:flex flex-1 items-center justify-center">
                  <div className="text-center p-8 max-w-lg">
                    <div className="w-28 h-28 bg-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FontAwesomeIcon
                        icon={faSmile}
                        className="w-16 h-16 text-black"
                      />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      Chọn một cuộc trò chuyện
                    </h2>
                    <p className="text-base md:text-lg text-gray-600">
                      Hãy chọn một cuộc trò chuyện từ danh sách bên trái để bắt
                      đầu
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
