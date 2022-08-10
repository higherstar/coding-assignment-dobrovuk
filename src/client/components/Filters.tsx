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
  const [timeRange, setTimeRange] = useState<[Moment | null, Moment | null]>();
  const [weekday, setWeekday] = useState<number>();

  const findByLocation = () => {
    alert('TODO: Search for stores by current user location');
  }

  const onTimeRangeSubmit = ([startDate, endDate]: [
    Moment,
    Moment,
  ]) => {
    if (startDate && endDate) {
      setTimeRange([startDate, endDate]);
    }
  }

  const onWeekdayChange = (value: number) => {
    setWeekday(value);
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
            <Select value={weekday} onChange={onWeekdayChange} placeholder="Pick week day">
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
              value={timeRange}
              onOk={onTimeRangeSubmit}
              picker="time"
            />
          </Col>
        </Row>
      </StyledSpace>
    </>
  );
}
