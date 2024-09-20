import styles from './styles.module.css';

const Table = () => {
  return (
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
        <tr>
          <td>1</td>
          <td>Тип 1</td>
          <td>2022-01-01</td>
          <td>Да</td>
          <td>12345</td>
          <td>Адрес 1</td>
          <td>Примечание 1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Тип 2</td>
          <td>2022-02-01</td>
          <td>Нет</td>
          <td>67890</td>
          <td>Адрес 2</td>
          <td>Примечание 2</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>pagination</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
