// import { Tabs } from 'components';

import CurrentMonthChart from './components/CurrentMonthChart/CurrentMonthChart';

// import styles from './Home.module.css';

// const tabs = [
//   {
//     children: (
//       <div className={styles['home-wrapper']}>
//         <CurrentMonthChart />
//         {/* <SummaryLastMonthsChart />
//       <SummaryYearsChart /> */}
//       </div>
//     ),
//     key: 'current-month',
//     title: 'Current Month',
//   },
// ];

const Home = () => {
  return (
    <CurrentMonthChart />
    // <Tabs tabs={tabs} />
    // <div className={styles['home-wrapper']}>
    //   <CurrentMonthChart />
    //   {/* <SummaryLastMonthsChart />
    //   <SummaryYearsChart /> */}
    // </div>
  );
};

export default Home;
