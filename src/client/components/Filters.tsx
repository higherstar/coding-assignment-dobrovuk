import React, { useEffect, useState } from 'react';
import { Button, Space, DatePicker, Row, Col, Select, Input } from 'antd';
import styled from 'styled-components';
import { Moment } from 'moment';

import { IFilterParam } from '../interface/filter.interface';

const { RangePicker } = DatePicker;
const { Option } = Select;

const StyledSpace = styled(Space)`
  width: 100%;
  align-items: center;
`;

interface IFiltersProps {
  onChange: (values: IFilterParam) => void;
}

export default function ({ onChange }: IFiltersProps) {
  const [name, setName] = useState<string>('');
  const [timeRange, setTimeRange] = useState<[Moment | null, Moment | null]>();
  const [weekday, setWeekday] = useState<number>();
  const [userLocation, setUserLocation] = useState<[number, number]>();

  useEffect(() => {
    let filter: IFilterParam = {};

    if (weekday) {
      filter.weekday = weekday;
    }

    if (timeRange) {
      filter.startHour = timeRange[0].format('hh::mm');
      filter.endHour = timeRange[1].format('hh::mm');
    }

    if (name) {
      filter.searchQuery = name;
    }

    if (userLocation) {
      filter.lan = userLocation[0];
      filter.lat = userLocation[1];
    }

    onChange(filter);
  }, [name, timeRange, weekday, userLocation]);

  const findByLocation = () => {
    // Todo: get user location
    setUserLocation([0, 0]);
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
