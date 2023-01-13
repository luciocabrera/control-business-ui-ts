import React from 'react';
import CurrentMonthChart from './components/CurrentMonthChart/CurrentMonthChart';
import SummaryLastMonthsChart from './components/SummaryLastMonthsChart/SummaryLastMonthsChart';
import SummaryYearsChart from './components/SummaryYearsChart/SummaryYearsChart';

const Home = () => {
  return (
    <div
      style={{
        // display: 'inline-block',
        display: 'flex',
        flexWrap: 'wrap',
        // width: 'auto',
        background: 'white',
        padding: '.5rem',
        borderRadius: '0.5rem',
        gap: '1rem',
        boxShadow: '0 30px 40px rgba(0,0,0,.1)',
        height: '100%',
      }}
    >
      <CurrentMonthChart />
      <SummaryLastMonthsChart />
      <SummaryYearsChart />
    </div>
  );
};

export default Home;
