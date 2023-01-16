import styles from './index.module.scss';
import {useState} from "react";
import Modal from "../modal";


const BookList = ({bookList}) => {
	const [show, setShow] = useState(false);
	const [bookItem, setItem] = useState();
	return (
		<>
			<div className={styles.container}>
				{
					bookList.map((item) => {
						let bookThumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
						if (bookThumbnail != undefined) {
							return (
								<>
									<div className={styles.bookList}
									     onClick={() => {
										     setShow(true);
										     setItem(item)
									     }}>
										<div className={styles.book}>

											<img src={bookThumbnail}
											     alt="image"/>
											<div className={styles.bottom}>
												<h3 className={styles.title}>{item.volumeInfo.title}</h3>
											</div>
										</div>
									</div>
									<Modal show={show}
									       item={bookItem}
									       onClose={() => setShow(false)}/>
								</>
							)
						}
					})
				}
			</div>

		</>
	)
};

export default BookList;