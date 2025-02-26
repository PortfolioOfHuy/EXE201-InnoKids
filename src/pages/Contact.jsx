import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Modal, Badge, Table, Carousel } from 'react-bootstrap';
import { SendOutlined, StarFilled, CalendarOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/vi';

const Contact = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    childName: '',
    childAge: '',
  });
  const [selectedDate, setSelectedDate] = useState(moment());
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [availableSlots, setAvailableSlots] = useState({});

  const doctors = [
    { 
      id: 1, 
      name: 'Bác sĩ Nguyễn Bình An', 
      rating: 4.5,
      specialty: 'Dinh dưỡng nhi khoa',
      experience: '15 năm kinh nghiệm', 
      info: 'Chuyên gia dinh dưỡng trẻ em tại Bệnh viện Nhi Trung ương', 
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/026/375/249/small_2x/ai-generative-portrait-of-confident-male-doctor-in-white-coat-and-stethoscope-standing-with-arms-crossed-and-looking-at-camera-photo.jpg', 
      availableTimes: ['09:00', '10:00', '11:00'],
      reviews: [
        { user: 'Nguyễn Văn B', comment: 'Bác sĩ rất tận tâm, tư vấn chi tiết!', rating: 5, date: '15/03/2024' },
        { user: 'Trần Thị C', comment: 'Rất hài lòng với dịch vụ, bác sĩ rất nhẹ nhàng với trẻ!', rating: 4, date: '14/03/2024' }
      ],
      schedule: {
        'Thứ 2': [
          { time: '08:00', status: 'available' },
          { time: '09:00', status: 'available' },
          { time: '10:00', status: 'booked' },
          { time: '11:00', status: 'available' },
          { time: '14:00', status: 'available' },
          { time: '15:00', status: 'booked' },
          { time: '16:00', status: 'available' },
        ],
        'Thứ 3': [
          { time: '08:00', status: 'available' },
          { time: '09:00', status: 'booked' },
          { time: '10:00', status: 'available' },
          { time: '11:00', status: 'booked' },
          { time: '14:00', status: 'available' },
          { time: '15:00', status: 'available' },
          { time: '16:00', status: 'available' },
        ],
        'Thứ 4': [
          { time: '08:00', status: 'available' },
          { time: '09:00', status: 'available' },
          { time: '10:00', status: 'available' },
          { time: '11:00', status: 'booked' },
          { time: '14:00', status: 'available' },
          { time: '15:00', status: 'available' },
          { time: '16:00', status: 'booked' },
        ],
        'Thứ 5': [
          { time: '08:00', status: 'booked' },
          { time: '09:00', status: 'available' },
          { time: '10:00', status: 'available' },
          { time: '11:00', status: 'available' },
          { time: '14:00', status: 'booked' },
          { time: '15:00', status: 'available' },
          { time: '16:00', status: 'available' },
        ],
        'Thứ 6': [
          { time: '08:00', status: 'available' },
          { time: '09:00', status: 'available' },
          { time: '10:00', status: 'booked' },
          { time: '11:00', status: 'available' },
          { time: '14:00', status: 'available' },
          { time: '15:00', status: 'available' },
          { time: '16:00', status: 'available' },
        ],
        'Thứ 7': [
          { time: '08:00', status: 'available' },
          { time: '09:00', status: 'available' },
          { time: '10:00', status: 'available' },
          { time: '11:00', status: 'available' },
        ],
      }
    },
    { 
      id: 2, 
      name: 'Bác sĩ Trần Văn Bình', 
      rating: 4.8,
      specialty: 'Nhi khoa tổng quát',
      experience: '20 năm kinh nghiệm', 
      info: 'Trưởng khoa Nhi - Bệnh viện Đa khoa Quốc tế', 
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/027/298/490/small_2x/doctor-posing-portrait-free-photo.jpg', 
      availableTimes: ['13:00', '14:00', '15:00'],
      reviews: [
        { user: 'Lê Văn D', comment: 'Bác sĩ rất chuyên nghiệp và tận tình!', rating: 5, date: '13/03/2024' },
        { user: 'Phạm Thị E', comment: 'Tư vấn rất chi tiết và dễ hiểu!', rating: 4, date: '12/03/2024' }
      ]
    },
    { 
      id: 3, 
      name: 'Bác sĩ Lê Thị Cẩm', 
      rating: 4.7,
      specialty: 'Phát triển trẻ em',
      experience: '12 năm kinh nghiệm', 
      info: 'Chuyên gia tư vấn phát triển trẻ em - Bệnh viện Nhi đồng', 
      avatar: 'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=', 
      availableTimes: ['16:00', '17:00', '18:00'],
      reviews: [
        { user: 'Nguyễn Văn F', comment: 'Bác sĩ rất giỏi và tâm lý với trẻ!', rating: 5, date: '11/03/2024' },
        { user: 'Trần Thị G', comment: 'Rất hài lòng với cách tư vấn!', rating: 4, date: '10/03/2024' }
      ]
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Gửi yêu cầu đến ${selectedDoctor.name}: ${message} vào lúc ${appointmentTime}`);
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2px' }}>
        {[...Array(5)].map((_, index) => (
          <StarFilled 
            key={index} 
            style={{ 
              color: index < rating ? '#ffc107' : '#e4e5e9',
              fontSize: '1.2rem',
              filter: index < rating ? 'drop-shadow(0 0 2px rgba(255, 193, 7, 0.3))' : 'none'
            }} 
          />
        ))}
      </div>
    );
  };

  const generateCalendar = () => {
    const startDay = currentMonth.clone().startOf('month').startOf('week');
    const endDay = currentMonth.clone().endOf('month').endOf('week');
    const calendar = [];
    const day = startDay.clone();

    while (day.isSameOrBefore(endDay, 'day')) {
      calendar.push(day.clone());
      day.add(1, 'day');
    }
    return calendar;
  };

  const isPastDate = (date) => {
    return date.isBefore(moment(), 'day');
  };

  const hasAvailableSlots = (date) => {
    // Logic kiểm tra slot trống
    return true; // Thay đổi logic này theo API của bạn
  };

  useEffect(() => {
    if (selectedDate && selectedDoctor) {
      // Giả lập API call
      const fetchAvailableSlots = async () => {
        // Thay thế bằng API call thực tế
        const slots = {
          '08:00': 'available',
          '09:00': 'booked',
          '10:00': 'available',
          '11:00': 'available',
          '14:00': 'available',
          '15:00': 'booked',
          '16:00': 'available',
        };
        setAvailableSlots(slots);
      };

      fetchAvailableSlots();
    }
  }, [selectedDate, selectedDoctor]);

  const Calendar = () => (
    <div className="calendar-container mb-4">
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3">
        <Button 
          variant="link"
          onClick={() => setCurrentMonth(currentMonth.clone().subtract(1, 'month'))}
          disabled={currentMonth.isSame(moment(), 'month')}
        >
          &lt;
        </Button>
        <h6 className="mb-0">{currentMonth.format('MMMM YYYY')}</h6>
        <Button 
          variant="link"
          onClick={() => setCurrentMonth(currentMonth.clone().add(1, 'month'))}
        >
          &gt;
        </Button>
      </div>
      
      <div className="calendar-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
      }}>
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
          <div key={day} className="text-center fw-bold p-2">
            {day}
          </div>
        ))}
        
        {generateCalendar().map(date => (
          <div
            key={date.format('YYYY-MM-DD')}
            className={`calendar-day p-2 text-center ${
              date.isSame(selectedDate, 'day') ? 'selected' : ''
            } ${isPastDate(date) ? 'past' : ''}`}
            style={{
              cursor: isPastDate(date) ? 'not-allowed' : 'pointer',
              backgroundColor: date.isSame(selectedDate, 'day') 
                ? 'var(--color-second)' 
                : isPastDate(date) 
                  ? '#f5f5f5' 
                  : hasAvailableSlots(date) 
                    ? '#fff' 
                    : '#ffebee',
              color: date.isSame(selectedDate, 'day') 
                ? '#fff' 
                : isPastDate(date) 
                  ? '#999' 
                  : 'inherit',
              borderRadius: '4px',
              border: '1px solid var(--color-fourth)',
            }}
            onClick={() => {
              if (!isPastDate(date)) {
                setSelectedDate(date);
              }
            }}
          >
            {date.format('D')}
            {hasAvailableSlots(date) && !isPastDate(date) && (
              <div className="available-indicator" style={{
                width: '4px',
                height: '4px',
                backgroundColor: 'var(--color-second)',
                borderRadius: '50%',
                margin: '2px auto 0',
              }}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const TimeSlots = () => (
    <div className="time-slots-container">
      <h6 className="mb-3">Chọn giờ khám</h6>
      <div className="time-slots-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
      }}>
        {Object.entries(availableSlots).map(([time, status]) => (
          <Button
            key={time}
            variant={status === 'available' ? 'outline-success' : 'outline-secondary'}
            disabled={status === 'booked'}
            active={appointmentTime === time}
            onClick={() => setAppointmentTime(time)}
            style={{
              fontSize: '0.9rem',
              padding: '8px',
            }}
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <Container className="py-5" style={{ background: '#fff' }}>
      <Row className="mb-5">
        <Col className="text-center">
          <h1 style={{ color: 'var(--color-first)', fontWeight: 'bold' }} className="mb-3">
            Đội Ngũ Bác Sĩ Chuyên Môn
          </h1>
          <p style={{ color: 'var(--color-third)' }} className="lead">
            Đội ngũ bác sĩ giàu kinh nghiệm, tận tâm trong việc chăm sóc sức khỏe trẻ em
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={8} className="mx-auto">
          <Row className="mb-4">
            {doctors.map(doctor => (
              <Col key={doctor.id} lg={4} md={6} className="mb-4">
                <Card 
                  className="h-100 shadow-sm" 
                  style={{ 
                    border: '1px solid var(--color-fourth)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 .125rem .25rem rgba(0,0,0,.075)';
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <Card.Img 
                      variant="top" 
                      src={doctor.avatar} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title style={{ color: 'var(--color-first)', fontWeight: 'bold' }}>
                      {doctor.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {doctor.specialty}
                    </Card.Subtitle>
                    <div className="rating-container mb-3">
                      <div className="stars mb-1">
                        {renderStars(doctor.rating)}
                      </div>
                      <div className="rating-text" style={{ 
                        color: 'var(--color-third)',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px'
                      }}>
                        <span style={{ 
                          color: 'var(--color-second)', 
                          fontWeight: 'bold',
                          fontSize: '1.1rem'
                        }}>
                          {doctor.rating}
                        </span>
                        <span>•</span>
                        <span>{doctor.reviews.length} đánh giá</span>
                      </div>
                    </div>
                    <p className="mb-2" style={{ color: 'var(--color-third)' }}>
                      {doctor.experience}
                    </p>
                    <Button 
                      variant="outline-primary"
                      className="w-100 mb-2"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowModal(true);
                      }}
                      style={{
                        borderColor: 'var(--color-second)',
                        color: 'var(--color-second)'
                      }}
                    >
                      Xem Chi Tiết
                    </Button>
                    <Button 
                      variant="primary"
                      className="w-100"
                      onClick={() => {
                        setSelectedDoctor(doctor);
                        setShowModal(false);
                        document.querySelector('#appointmentForm').scrollIntoView({ behavior: 'smooth' });
                      }}
                      style={{
                        background: 'var(--color-second)',
                        border: 'none'
                      }}
                    >
                      Đặt Lịch Ngay
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card id="appointmentForm" className="shadow-sm" style={{ border: '1px solid var(--color-fourth)' }}>
            <Card.Body className="p-4">
              <h4 className="mb-4" style={{ color: 'var(--color-first)', fontWeight: 'bold' }}>
                Đặt Lịch Tư Vấn
              </h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--color-first)' }}>Họ tên phụ huynh</Form.Label>
                      <Form.Control
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        required
                        style={{ border: '1px solid var(--color-fourth)' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--color-first)' }}>Số điện thoại</Form.Label>
                      <Form.Control
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                        required
                        style={{ border: '1px solid var(--color-fourth)' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--color-first)' }}>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        required
                        style={{ border: '1px solid var(--color-fourth)' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--color-first)' }}>Tên trẻ</Form.Label>
                      <Form.Control
                        type="text"
                        value={userInfo.childName}
                        onChange={(e) => setUserInfo({...userInfo, childName: e.target.value})}
                        required
                        style={{ border: '1px solid var(--color-fourth)' }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: 'var(--color-first)' }}>Tuổi trẻ</Form.Label>
                      <Form.Control
                        type="number"
                        value={userInfo.childAge}
                        onChange={(e) => setUserInfo({...userInfo, childAge: e.target.value})}
                        required
                        style={{ border: '1px solid var(--color-fourth)' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--color-first)' }}>Chọn Bác Sĩ</Form.Label>
                  <Form.Select 
                    value={selectedDoctor ? selectedDoctor.name : ''} 
                    onChange={(e) => {
                      const doctor = doctors.find(doc => doc.name === e.target.value);
                      setSelectedDoctor(doctor);
                      setMessage('');
                      setAppointmentTime('');
                    }} 
                    required
                    style={{ border: '1px solid var(--color-fourth)' }}
                  >
                    <option value="">-- Chọn bác sĩ --</option>
                    {doctors.map(doctor => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {selectedDoctor && (
                  <div className="mb-4">
                    <h5 style={{ color: 'var(--color-first)' }} className="mb-3">Chọn Ngày và Giờ</h5>
                    <Calendar />
                    {selectedDate && <TimeSlots />}
                    {appointmentTime && (
                      <div className="mt-3 p-2 text-success" style={{
                        backgroundColor: '#e8f5e9',
                        borderRadius: '4px',
                        border: '1px solid #c8e6c9'
                      }}>
                        <CheckCircleOutlined className="me-2" />
                        Đã chọn: {selectedDate.format('DD/MM/YYYY')} {appointmentTime}
                      </div>
                    )}
                  </div>
                )}

                <Form.Group className="mb-3">
                  <Form.Label style={{ color: 'var(--color-first)' }}>Nội Dung</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="Mô tả tình trạng của trẻ và lý do cần tư vấn..."
                    style={{ border: '1px solid var(--color-fourth)' }}
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-100"
                  style={{
                    background: 'var(--color-second)',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <SendOutlined className="me-2" /> Gửi Yêu Cầu
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton style={{ borderBottom: '1px solid var(--color-fourth)' }}>
          <Modal.Title style={{ color: 'var(--color-first)' }}>
            {selectedDoctor ? selectedDoctor.name : ''}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <Row>
              <Col md={4}>
                <img 
                  src={selectedDoctor.avatar} 
                  alt={selectedDoctor.name} 
                  style={{ width: '100%', borderRadius: '8px' }} 
                />
                <div className="mt-3">
                  <h5 style={{ color: 'var(--color-first)' }}>Thời Gian Làm Việc</h5>
                  <p><ClockCircleOutlined /> {selectedDoctor.availableTimes.join(', ')}</p>
                </div>
              </Col>
              <Col md={8}>
                <h5 style={{ color: 'var(--color-first)' }}>Thông Tin Chi Tiết</h5>
                <p>{selectedDoctor.info}</p>
                <p><strong>Chuyên môn:</strong> {selectedDoctor.specialty}</p>
                <p><strong>Kinh nghiệm:</strong> {selectedDoctor.experience}</p>
                
                <h5 className="mt-4" style={{ color: 'var(--color-first)' }}>Đánh Giá Từ Người Dùng</h5>
                {selectedDoctor.reviews.map((review, index) => (
                  <Card key={index} className="mb-2" style={{ border: '1px solid var(--color-fourth)' }}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>{review.user}</strong>
                        <small className="text-muted">{review.date}</small>
                      </div>
                      <div className="mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <p className="mb-0">{review.comment}</p>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: '1px solid var(--color-fourth)' }}>
          <Button 
            variant="primary"
            onClick={() => {
              setShowModal(false);
              document.querySelector('#appointmentForm').scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'var(--color-second)',
              border: 'none'
            }}
          >
            Đặt Lịch Ngay
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Contact; 