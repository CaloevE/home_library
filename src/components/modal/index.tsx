import styles from './index.module.scss'
import {CloseCircleOutlined} from "@ant-design/icons";

const Modal = ({show, item, onClose}) => {

	if (!show) {
		return null;
	}

	let bookThumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
	return (
		<>
			<div className={styles.overlay}>
				<div className={styles.overlayInner}>
					<button className={styles.close}
					        onClick={onClose}><CloseCircleOutlined/></button>
					<div className={styles.innerBox}>
						<img src={bookThumbnail}
						     alt={'Book Image'}/>
						<div className={styles.info}>
							<h1>{item.volumeInfo.title}</h1>
							<h3>{item.volumeInfo.authors}</h3>
							<h4>{item.volumeInfo.publisher}<span>{item.volumeInfo.publishedDate}</span></h4><br/>
							<a href={item.volumeInfo.previewLink}>
								<button>More</button>
							</a>
						</div>
					</div>
					<h4 className="description">{item.volumeInfo.description}</h4>
				</div>
			</div>
		</>
	)
}
export default Modal;