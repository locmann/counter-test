import { useEffect } from 'react';
import styles from './Table.module.css';
import { useStore } from '../../model/RootStore.ts';
import { observer } from 'mobx-react-lite';
import Pagination from '../Pagination/Pagination.tsx';
import TypeUI from '../../shared/TypeUi/TypeUI.tsx';

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
            <tr key={item.id} className={styles.tableRow}>
              <td>{index + 1}</td>
              <td>
                <TypeUI iconType={item._type[0]} />
              </td>
              <td>
                {new Date(item.installation_date).toLocaleDateString('ru-RU')}
              </td>
              <td>{item.is_automatic ? 'Да' : 'Нет'}</td>
              <td>{item.initial_values[0]}</td>
              <td>{rootStore.getCounterAddress(item.area.id)}</td>
              <td>
                {item.description}
                <button
                  className={styles.deleteButton}
                  onClick={() => rootStore.deleteCounter(index, item.id)}
                >
                  <img src="src/assets/trash.svg" alt="Bin" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pages={rootStore.request.pageNum}
        curPage={rootStore.request.currentPage}
        changePage={rootStore.changePage}
      />
    </div>
  );
});

export default Table;
