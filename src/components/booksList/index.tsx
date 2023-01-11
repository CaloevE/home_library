import {FC} from "react";
import styles from './index.module.scss';
import books from '../../images/books.jpg'

const BookList: FC = () => {
	return (
		<>
			<div className={styles.bookList}>
				<div className={styles.book}>
					<img src={books}
					     className={styles.img}/>
					<div className={styles.titleBottom}>
						<h3>React JS</h3>
						<p>Small description about Book!</p>
					</div>
				</div>
			</div>
		</>
	)
};

export default BookList;