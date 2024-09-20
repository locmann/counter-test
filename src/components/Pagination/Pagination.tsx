import { observer } from 'mobx-react-lite';
import { FC } from 'react';

type Props = {
  pages: number;
  curPage: number;
  changePage: (page: number) => void;
};

const Pagination: FC<Props> = observer(({ pages, curPage, changePage }) => {
  console.log(pages);

  const handleClick = (page: number) => {
    changePage(page);
  };

  const pageArr = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div>
      {pageArr.map((p) => {
        if (p === 1 || p === pages || (p >= curPage - 2 && p <= curPage + 2)) {
          return (
            <button key={p} onClick={() => handleClick(p)}>
              {p}
            </button>
          );
        } else if (p === curPage - 3 || p === curPage + 3) {
          return <span key={p}>... </span>;
        } else {
          return null;
        }
      })}
    </div>
  );
});

export default Pagination;
