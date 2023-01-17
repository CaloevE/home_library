import styles from './index.module.scss';
import {useEffect, useState} from "react";
import Modal from "../modal";
import Icon, {HeartTwoTone} from "@ant-design/icons";


const BookList = ({bookList, openBookShelves}) => {
	const [show, setShow] = useState(false);
	const [bookItem, setItem] = useState();
	const [bookAlreadyExists, setBookAlreadyExists] = useState<boolean | undefined>(false);
	const [favoriteBooks, setFavoriteBook] = useState([]);

	useEffect(() => {
		localStorage.setItem('favoriteBooks', JSON.stringify(bookList))
	}, [favoriteBooks]);

	const handleBookList = (book) => {
		let updateFavoriteBooks = [...favoriteBooks.map(item => item)]
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
									{openBookShelves && (
										<>
											<div className={styles.bookList}
											     onClick={() => {
												     setShow(true);
												     setItem(item)
											     }}>
												<div
													onClick={() => handleBookList(item.id)}>
													{bookAlreadyExists ?
														(
															<Icon component={() => <img src="/icons/favoriteFull.svg"/>}/>
														) : (
															<Icon component={() => <img src="/icons/favoriteEmpty.svg"/>}/>
														)}
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

									)}
									<div className={styles.bookList}
									     onClick={() => {
										     setShow(true);
										     setItem(item)
									     }}>
										<div
											onClick={() => handleBookList(favoriteBooks)}>
											{bookAlreadyExists ?
												(
													<Icon component={() => <img src="/icons/favoriteFull.svg"/>}/>
												) : (
													<Icon component={() => <img src="/icons/favoriteEmpty.svg"/>}/>
												)}
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