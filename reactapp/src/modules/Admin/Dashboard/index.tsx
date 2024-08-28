import { FC } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { FaUserPlus, FaMoneyCheckAlt } from "react-icons/fa";
import { BsBagPlusFill, BsBoxSeamFill } from "react-icons/bs";
import RevenueChart from './RevenueChart';
import StatisticalSummary from './StatisticalSummary';
import useGetDailyRevenues from 'hooks/dashboard/useGetDailyRevenues';
import useGetMonthlyRevenues from 'hooks/dashboard/useGetMonthlyRevenues';
import useGetYearlyRevenues from 'hooks/dashboard/useGetYearlyRevenues';
import useGetTotalUser from 'hooks/dashboard/useGetTotalUser';
import useGetTotalShoppingSession from 'hooks/dashboard/useGetTotalShoppingSession';
import useGetTotalOrder from 'hooks/dashboard/useGetTotalOrder';
import useGetTotalRevenue from 'hooks/dashboard/useGetTotalRevenue';
import NumberHelper from 'helpers/numberHelper';

const Dashboard: FC = () => {
  const { totalUser } = useGetTotalUser();
  const { totalShoppingSession } = useGetTotalShoppingSession();
  const { totalOrder } = useGetTotalOrder();
  const { totalRevenue } = useGetTotalRevenue();
  const { dailyRevenue } = useGetDailyRevenues();
  const { monthlyRevenue } = useGetMonthlyRevenues();
  const { yearlyRevenue } = useGetYearlyRevenues();
  
  return (
    <Container fluid>
      <Row>
        <Col xl={3} sm={6} xs={12}>
          <Card>
            <Card.Body className='p-6'>
              <StatisticalSummary title='Total account' data={totalUser} icon={<FaUserPlus size={28} />} />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} xs={12}>
          <Card>
            <Card.Body className='p-6'>
              <StatisticalSummary title='Total session' data={totalShoppingSession} icon={<BsBagPlusFill size={28} />} />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} xs={12}>
          <Card>
            <Card.Body className='p-6'>
              <StatisticalSummary title='Total order' data={totalOrder} icon={<BsBoxSeamFill size={28} />} />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} sm={6} xs={12}>
          <Card>
            <Card.Body className='p-6'>
              <StatisticalSummary title='Total revenue' data={NumberHelper.toDecimalString(totalRevenue)} icon={<FaMoneyCheckAlt size={24} />} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body className='p-3'>
              <RevenueChart chartTitle="Daily revenue" data={dailyRevenue} chartType="line" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xl={6} xs={12}>
          <Card>
            <Card.Body className='p-3'>
              <RevenueChart chartTitle="Monthly revenue" data={monthlyRevenue} chartType="column" />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6} xs={12}>
          <Card>
            <Card.Body className='p-3'>
              <RevenueChart chartTitle="Yearly revenue" data={yearlyRevenue} chartType="line" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
