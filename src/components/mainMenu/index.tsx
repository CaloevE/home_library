import React, {FC, useEffect, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Input, Layout} from 'antd';
import styles from './index.module.scss'
import axios from "axios";
import BookList from "../booksList";
import {useNavigate} from "react-router";
import Shelves from "../shelves";

const menuNames = ['Books Lists', 'Shelves']

const MainMenu: FC = () => {
	const [search, setSearch] = useState('');
	const [bookData, setBookData] = useState([]);
	const [randomBookList, setRandomBookList] = useState([])
	const navigate = useNavigate();

	const getPage = (menuList: string) => {
		if (menuList === 'Books Lists') {
			{
				navigate('/library/books')
			}
		}
		if (menuList === 'Shelves') {
			{
				navigate('/library/shelves')
			}
		}
	}

	console.log('getPage', getPage);
	console.log('value', menuNames.map(value => {
		return value
	}));
	const searchBooks = (evt) => {
		if (evt.key === "Enter") {
			axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyBeCfDx-z6DlAwdUtPiLm3PCrGNoIStJIE' + '&maxResults=40')
				.then(result => setBookData(result.data.items))
				.catch(error => console.log(error))
		}
	}

	useEffect(() => {
		axios.get('https://www.googleapis.com/books/v1/volumes?q=js&key=AIzaSyBeCfDx-z6DlAwdUtPiLm3PCrGNoIStJIE' + '&maxResults=40')
			.then(result => setRandomBookList(result.data.items))
			.catch(error => console.log(error))
	}, [])
	const onClick: MenuProps['onClick'] = (e) => {
		setSearch(e.key);
	};

	return (
		<>
			<Layout>
				<Layout.Header className={styles.header}
				               style={{paddingInline: '0'}}>
					<div className={styles.header}>
						<div className={styles.search}>
							<div className={styles.searchInput}>
								<Input type={"text"}
								       placeholder={"Search Book"}
								       value={search}
								       onChange={e => setSearch(e.target.value)}
								       onKeyPress={searchBooks}
								       prefix={<SearchOutlined/>}
								/>
							</div>
							<div className={styles.menu}>
								<nav>
									<ul>
										{
											menuNames.map((value, pos) => {
												return (
													<li><a href="#"
													       key={value}
													       onClick={() => {
														       getPage(value)
													       }}>{value}</a></li>
												)
											})
										}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</Layout.Header>
				<Layout.Content className={styles.body}>
					<BookList bookList={bookData.length !== 0 ? bookData : randomBookList}/>
				</Layout.Content>
			</Layout>
		</>
	)
};

export default MainMenu;