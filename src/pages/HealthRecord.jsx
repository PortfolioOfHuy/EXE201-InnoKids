import React, { useEffect, useState } from 'react';
import { Container, Table, Card, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { fetchHelthRecords, handleCreateHealthRecord } from '../services/children-service';
import { toast } from 'react-toastify';
import { PlusOutlined, LineChartOutlined, ArrowUpOutlined, ArrowDownOutlined, MinusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

const HealthRecord = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    month: '',
    height: '',
    weight: '',
    childrenId: ''
  });

  // Fetch health records
  useEffect(() => {
    loadHealthRecords();
  }, []);

const {childrenId,childName}=useParams();
 
  const loadHealthRecords = async () => {
    try {
      const response = await fetchHelthRecords();
      const formattedRecords = response.data.map(record => ({
        ...record,
        formattedDate: new Date(record.creationDate).toLocaleString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }));
      setHealthRecords(formattedRecords);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tải dữ liệu');
      console.error('Error fetching health records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await handleCreateHealthRecord({
        age: parseInt(newRecord.month),
        height: parseFloat(newRecord.height/100),
        weight: parseFloat(newRecord.weight),
        childrenId: childrenId
      });

      toast.success('Tạo hồ sơ sức khỏe thành công!');
      setShowCreateModal(false);
      setNewRecord({
        month: '',
        height: '',
        weight: '',
        childrenId: ''
      });
      loadHealthRecords(); // Refresh data
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tạo hồ sơ sức khỏe');
      console.error('Error creating health record:', error);
    } finally {
      setLoading(false);
    }
  };

  // Thêm hàm tính toán sự thay đổi
  const calculateChange = (currentValue, previousValue) => {
    if (!previousValue) return null;
    const change = currentValue - previousValue;
    return {
      value: Math.abs(change).toFixed(1),
      direction: change > 0 ? 'increase' : change < 0 ? 'decrease' : 'same'
    };
  };

  const processedRecords = healthRecords
    .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
    .map((record, index, array) => {
      const previousRecord = array[index + 1];
      return {
        ...record,
        changes: {
          height: calculateChange(record.height, previousRecord?.height),
          weight: calculateChange(record.weight, previousRecord?.weight),
          bmi: calculateChange(record.bmI_Point, previousRecord?.bmI_Point)
        }
      };
    });


  const ChangeIndicator = ({ change }) => {
    if (!change) return null;

    const getStyle = (direction) => ({
      color: direction === 'increase' ? '#52c41a' : direction === 'decrease' ? '#ff4d4f' : '#8c8c8c',
      fontSize: '12px',
      marginLeft: '4px'
    });

    return (
      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
        {change.direction === 'increase' && (
          <ArrowUpOutlined style={getStyle('increase')} />
        )}
        {change.direction === 'decrease' && (
          <ArrowDownOutlined style={getStyle('decrease')} />
        )}
        {change.direction === 'same' && (
          <MinusOutlined style={getStyle('same')} />
        )}
        <span style={{ marginLeft: '2px', fontSize: '12px' }}>
          {change.value}
        </span>
      </span>
    );
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">Đang tải dữ liệu...</div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center" style={{ color: 'var(--color-first)' }}>
            Hồ Sơ Sức Khỏe Bé {childName}
          </h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            style={{
              backgroundColor: 'var(--color-second)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <PlusOutlined /> Thêm Hồ Sơ Mới
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Ngày Tạo</th>
                <th>Chiều Cao (cm)</th>
                <th>Cân Nặng (kg)</th>
                <th>Tháng Tuổi</th>
                <th>Chẩn đoán</th>
                <th>BMI</th>
              </tr>
            </thead>
            <tbody>
              {processedRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{record.formattedDate}</td>
                  <td>
                    {record.height}
                    <ChangeIndicator change={record.changes.height} />
                  </td>
                  <td>
                    {record.weight}
                    <ChangeIndicator change={record.changes.weight} />
                  </td>
                  <td>{record.age}</td>
                  <td>{record.category.description}</td>
                  <td>
                    {record.bmI_Point.toFixed(1)}
                    <ChangeIndicator change={record.changes.bmi} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Thêm thống kê tổng quan */}
      {processedRecords.length >= 2 && (
        <Card className="mt-4 shadow-sm">
          <Card.Body>
            <h5 className="mb-4">Thống kê thay đổi</h5>
            <Row>
              <Col md={4}>
                <div className="text-center">
                  <h6>Chiều cao</h6>
                  <div className="fs-4 d-flex align-items-center justify-content-center">
                    {(processedRecords[0].height - processedRecords[processedRecords.length - 1].height).toFixed(1)} cm
                    <ChangeIndicator 
                      change={{
                        value: Math.abs(processedRecords[0].height - processedRecords[processedRecords.length - 1].height).toFixed(1),
                        direction: processedRecords[0].height > processedRecords[processedRecords.length - 1].height ? 'increase' : 'decrease'
                      }} 
                    />
                  </div>
                  <small className="text-muted">Tổng thay đổi</small>
                </div>
              </Col>
              <Col md={4}>
                <div className="text-center">
                  <h6>Cân nặng</h6>
                  <div className="fs-4 d-flex align-items-center justify-content-center">
                    {(processedRecords[0].weight - processedRecords[processedRecords.length - 1].weight).toFixed(1)} kg
                    <ChangeIndicator 
                      change={{
                        value: Math.abs(processedRecords[0].weight - processedRecords[processedRecords.length - 1].weight).toFixed(1),
                        direction: processedRecords[0].weight > processedRecords[processedRecords.length - 1].weight ? 'increase' : 'decrease'
                      }} 
                    />
                  </div>
                  <small className="text-muted">Tổng thay đổi</small>
                </div>
              </Col>
              <Col md={4}>
                <div className="text-center">
                  <h6>BMI</h6>
                  <div className="fs-4 d-flex align-items-center justify-content-center">
                    {(processedRecords[0].bmI_Point - processedRecords[processedRecords.length - 1].bmI_Point).toFixed(1)}
                    <ChangeIndicator 
                      change={{
                        value: Math.abs(processedRecords[0].bmI_Point - processedRecords[processedRecords.length - 1].bmI_Point).toFixed(1),
                        direction: processedRecords[0].bmI_Point > processedRecords[processedRecords.length - 1].bmI_Point ? 'increase' : 'decrease'
                      }} 
                    />
                  </div>
                  <small className="text-muted">Tổng thay đổi</small>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      {/* Modal tạo hồ sơ mới */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'var(--color-first)' }}>
            <LineChartOutlined className="me-2" />
            Thêm Hồ Sơ Sức Khỏe Mới
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateSubmit}>
            <Form.Group className="mb-3">
              <Form.Label> Tuổi</Form.Label>
              <Form.Control
                type="number"
                value={newRecord.month}
                onChange={(e) => setNewRecord({ ...newRecord, month: e.target.value })}
                required
                min="0"
                placeholder="Nhập tuổi của trẻ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chiều cao (cm)</Form.Label>
              <Form.Control
                type="number"
                value={newRecord.height}
                onChange={(e) => setNewRecord({ ...newRecord, height: e.target.value })}
                required
                step="0.1"
                min="0"
                placeholder="Nhập chiều cao của trẻ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cân nặng (kg)</Form.Label>
              <Form.Control
                type="number"
                
                value={newRecord.weight}
                onChange={(e) => setNewRecord({ ...newRecord, weight: e.target.value })}
                required
                step="0.1"
                min="0"
                placeholder="Nhập cân nặng của trẻ"
              />
            </Form.Group>

            <Form.Group className="mb-3" 
             
            
            >
              <Form.Label>ID Trẻ</Form.Label>
              <Form.Control
                type="text"
                value={childrenId}
                onChange={(e) => setNewRecord({ ...newRecord, childrenId: e.target.value })}
                required
                placeholder="Nhập ID của trẻ"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                type="submit"
                style={{
                  backgroundColor: 'var(--color-second)',
                  border: 'none'
                }}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Tạo Hồ Sơ'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {healthRecords.length === 0 && (
        <div className="text-center mt-4">
          <p>Không có dữ liệu sức khỏe</p>
        </div>
      )}
    </Container>
  );
};

export default HealthRecord;
