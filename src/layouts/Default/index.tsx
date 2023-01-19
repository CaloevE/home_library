import {Layout} from 'antd';
import {FC, memo, ReactNode, useEffect, useState} from 'react';

import styles from './index.module.scss';
import MainMenu from "../../components/mainMenu";
import BookList from "../../components/booksList";
import axios from "axios";

interface DefaultLayoutProps {
	children?: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
	const [randomBookList, setRandomBookList] = useState([])

	useEffect(() => {
		axios.get('https://www.googleapis.com/books/v1/volumes?q=js&key=AIzaSyBeCfDx-z6DlAwdUtPiLm3PCrGNoIStJIE' + '&maxResults=40')
			.then(result => setRandomBookList(result.data.items))
			.catch(error => console.log(error))
	}, [])
	console.log('randomBookList');
	return (
		<Layout>
			<Layout.Header style={{paddingInline: '0'}}>
				<MainMenu/>
			</Layout.Header>
			<Layout.Content>
				<BookList bookList={randomBookList}/>
			</Layout.Content>
		</Layout>
	);
};

export default memo(DefaultLayout);