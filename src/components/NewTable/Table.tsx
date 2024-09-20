import { useEffect } from 'react';
import styles from './Table.module.css';
import { useStore } from '../../model/RootStore.ts';
import { observer } from 'mobx-react-lite';
import Pagination from '../Pagination/Pagination.tsx';

const Table = observer(() => {
  const rootStore = useStore();

  useEffect(() => {
    rootStore.changePage(1);
  }, []);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Тип</th>
            <th>Дата установки</th>
            <th>Автоматический</th>
            <th>Текущие показания</th>
            <th>Адрес</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
          {rootStore.counters.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item._type[0]}</td>
              <td>
                {new Date(item.installation_date).toLocaleDateString('ru-RU')}
              </td>
              <td>{item.is_automatic ? 'Да' : 'Нет'}</td>
              <td>{item.initial_values[0]}</td>
              <td>{rootStore.getCounterAddress(item.area.id)}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <Pagination
          pages={rootStore.request.pageNum}
          curPage={rootStore.request.currentPage}
          changePage={rootStore.changePage}
        />
      </div>
    </div>
  );
});

export default Table;
