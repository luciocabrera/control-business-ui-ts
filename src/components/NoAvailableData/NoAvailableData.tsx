import styles from './NoAvailableData.module.css';

const NoAvailableData = () => (
  <div className={styles.noDataAvailable}>
    <strong>No Data Available</strong>
    <br />
    Try adjusting your filters or time period.
  </div>
);

export default NoAvailableData;
