import { FC } from 'react';
import styles from './styles.module.css';

type Props = {
  iconType: string;
};

const TypeUI: FC<Props> = ({ iconType }) => {
  return (
    <div className={styles.wrapper}>
      {iconType === 'HotWaterAreaMeter' ? (
        <>
          <img src="src/assets/hotdrop.svg" alt="Hot water" /> ГВС
        </>
      ) : (
        <>
          <img src="src/assets/drop.svg" alt="Cold water" /> ХВС
        </>
      )}
    </div>
  );
};

export default TypeUI;
