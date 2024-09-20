import { useEffect, useState } from 'react';
import styles from './Table.module.css';
import { useStore } from '../../model/RootStore.ts';
import { observer } from 'mobx-react-lite';

const Table = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);

  const rootStore = useStore();

  useEffect(() => {
    rootStore.addCounter();
  }, []);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
              <td>{item.area.id}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Пагинация */}
      <div className={styles.pagination}>
        {Array.from({ length: rootStore.request.pageNum }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? styles.active : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
});

export default Table;
