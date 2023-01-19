import styles from './index.module.scss';
import {FC, useEffect, useState} from "react";
import Modal from "../modal";
import Shelves from "../shelves";
import {useNavigate} from "react-router";

const BookList = ({bookList}) => {
	const [show, setShow] = useState(false);
	const [bookItem, setItem] = useState();
	const [bookAlreadyExists, setBookAlreadyExists] = useState<boolean | undefined>(false);
	const [favoriteBooks, setFavoriteBook] = useState([]);
	const navigate = useNavigate()
	useEffect(() => {
		localStorage.setItem('favoriteBooks', JSON.stringify(bookList))
	}, [favoriteBooks]);

	const handleBookList = (book) => {
		let updateFavoriteBooks = [...favoriteBooks]
		// @ts-ignore
		if (!updateFavoriteBooks.includes(book)) {
			// @ts-ignore
			updateFavoriteBooks = [...favoriteBooks, book]
			setBookAlreadyExists(value => !value)
		} else {
			updateFavoriteBooks = updateFavoriteBooks.filter(favoriteBook => book !== favoriteBook)
		}
		setFavoriteBook(updateFavoriteBooks)
	}

	const handleShelves = () => {
		navigate('/library');
	}
	console.log(favoriteBooks)
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
										<div
											onClick={() => handleBookList(favoriteBooks)}>
										</div>
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