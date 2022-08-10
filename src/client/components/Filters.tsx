import React, { useState } from 'react';
import { Button, Space, DatePicker, Row, Col, Select, Input } from 'antd';
import styled from 'styled-components';
import moment, { Moment } from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const StyledSpace = styled(Space)`
  width: 100%;
  align-items: center;
`;

export default function () {
  const [name, setName] = useState<string>('');

  const findByLocation = () => {
    alert('TODO: Search for stores by current user location');
  }

  const onTimeRangeSubmit = ([startDate, endDate]: [
    Moment,
    Moment,
  ]) => {
    if (startDate && endDate) {
      alert(
        `TODO: Search for store by active hours
        from ${startDate.format('HH:mm')} to ${endDate.format('HH:mm')}`,
      );
    }
  }

  const onWeekdayChange = (value: number) => {
    alert(`TODO: Search for store by weekday ${value}`);
  }

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  return (
    <>
      <StyledSpace direction="vertical">
        <Row>
          <Col>
            <Space direction="horizontal">
              <Button type="primary" onClick={findByLocation}>
                Filter by current user location
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col>
            <Space direction="horizontal">
              Name:
              <Input value={name} onChange={handleNameChange} />
            </Space>
          </Col>
        </Row>
        <Row>
          <Col>
            Filter stores by working hours
            <Select onChange={onWeekdayChange} placeholder="Pick week day">
              <Option value={1}>Monday</Option>
              <Option value={2}>Tuesday</Option>
              <Option value={3}>Wednesday</Option>
              <Option value={4}>Thursday</Option>
              <Option value={5}>Friday</Option>
              <Option value={6}>Saturday</Option>
              <Option value={7}>Sunday</Option>
            </Select>
            <RangePicker
              format="HH:mm"
              onChange={console.log}
              onOk={onTimeRangeSubmit}
              picker="time"
            />
          </Col>
        </Row>
      </StyledSpace>
    </>
  );
}
