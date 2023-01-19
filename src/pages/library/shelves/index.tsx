import {FC} from 'react';
import {useParams} from 'react-router';

const Shelves: FC = () => {
	const {bookId} = useParams();
	return <div>Shelve page. {bookId} </div>;
};

export default Shelves;