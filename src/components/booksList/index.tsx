import {FC} from "react";
import styles from './index.module.scss';
import books from '../../images/books.jpg'

const BookList: FC = () => {
	return <>
		<div className={styles.bookList}>
			<img src={books}/>
		</div>
	</>
};

export default BookList;