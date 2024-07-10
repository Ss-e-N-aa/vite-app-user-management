import { useContext } from "react";
import { UsersListContext } from '../context/UsersListContext';
import classes from '../Components/Pagination.module.css';

export default function Pagination() {
    const usersListCtx = useContext(UsersListContext);

    return (
        <div className={classes.pagination}>
            <div className={classes.paginationList}>
                <a href="#" onClick={usersListCtx.prevPage}>Prev</a>
                {[...Array(usersListCtx.state.totalPages).keys()].map((i) => (
                    <a
                        key={i}
                        className={usersListCtx.state.currentPage === i + 1 ? classes.active : ''}
                        href="#"
                        onClick={() => usersListCtx.handlePageChange(i + 1)}>{i + 1}
                    </a>
                ))}
                <a href="#" onClick={usersListCtx.nextPage}>Next</a>
                <input
                    className={classes.searchBar}
                    type="text"
                    placeholder='Search...'
                    value={usersListCtx.state.query}
                    onChange={e => usersListCtx.setQuery(e.target.value)}
                />
            </div>
        </div>
    )
}
