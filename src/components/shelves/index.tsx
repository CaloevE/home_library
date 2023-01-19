import React, {FC, useEffect, useState} from "react";
import styles from "../booksList/index.module.scss";
import Modal from "../modal";

const Shelves = ({myLibrary}) => {
	console.log(myLibrary)
	// const [show, setShow] = useState(false);
	// const [bookItem, setItem] = useState();
	//
	// let bookThumbnail = myLibrary.volumeInfo.imageLinks && myLibrary.volumeInfo.imageLinks.smallThumbnail;
	return (

		<>
			{/*<div className={styles.bookList}>*/}
			{/*	/!*<div*!/*/}
			{/*	/!*	onClick={() => handleBookList(favoriteBooks)}>*!/*/}
			{/*	/!*</div>*!/*/}
			{/*	<div className={styles.book}>*/}
			{/*		<img src={bookThumbnail}*/}
			{/*		     alt="image"/>*/}
			{/*		<div className={styles.bottom}>*/}
			{/*			<h3 className={styles.title}>{myLibrary.volumeInfo.title}</h3>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</div>*/}
			{/*<Modal show={show}*/}
			{/*       item={bookItem}*/}
			{/*       onClose={() => setShow(false)}/>*/}
		</>
	)
}

export default Shelves;