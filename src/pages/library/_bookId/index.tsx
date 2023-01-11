import {FC} from 'react';
import {useParams} from 'react-router';

const BookPage: FC = () => {
	const {bookId} = useParams();
	return <div>Book page. {bookId} </div>;
};

export default BookPage;