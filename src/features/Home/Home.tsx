import { Tabs } from 'components';
import CurrentMonthChart from './components/CurrentMonthChart/CurrentMonthChart';
import SummaryLastMonthsChart from './components/SummaryLastMonthsChart/SummaryLastMonthsChart';
import styles from './Home.module.css';

const tabs = [
  {
    key: 'current-month',
    title: 'Current Month',
    children: (
      <div className={styles['home-wrapper']}>
        <CurrentMonthChart />
        {/* <SummaryLastMonthsChart />
      <SummaryYearsChart /> */}
      </div>
    )
  },
  {
    key: 'summary-last-months',
    title: 'Last Year',
    children: (
      <div className={styles['home-wrapper']}>
        <SummaryLastMonthsChart />
        {/* <SummaryLastMonthsChart />
      <SummaryYearsChart /> */}
      </div>
    )
  }
];

const Home = () => {
  return (
    <Tabs tabs={tabs} />
    // <div className={styles['home-wrapper']}>
    //   <CurrentMonthChart />
    //   {/* <SummaryLastMonthsChart />
    //   <SummaryYearsChart /> */}
    // </div>
  );
};

export default Home;
