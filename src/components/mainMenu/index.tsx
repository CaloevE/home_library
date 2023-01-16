import React, {FC, useState} from 'react';
import {AppstoreOutlined, SearchOutlined, SettingOutlined, UnorderedListOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Input, Layout, Menu} from 'antd';
import styles from './index.module.scss'
import axios from "axios";
import BookList from "../booksList";

const items: MenuProps['items'] = [
	{
		label: 'Books Lists',
		key: 'list',
		icon: <UnorderedListOutlined/>,
		children: [
			{
				type: 'group',
				label: 'Books',
				children: [
					{
						label: (
							<a href="http://gutendex.com/books"
							   target="_blank"
							   rel="noopener noreferrer">
								Google Books
							</a>
						),
						key: 'setting:1',
					},
				],
			},
			{
				type: 'group',
				label: 'Item 2',
				children: [
					{
						label: 'Option 3',
						key: 'setting:3',
					},
					{
						label: 'Option 4',
						key: 'setting:4',
					},
				],
			},
		],
	},
	{
		label: 'Shelves',
		key: 'shelve',
		icon: <AppstoreOutlined/>,
	},
	{
		label: 'Shelf with Review',
		key: 'review',
		icon: <SettingOutlined/>,
	},
];

const MainMenu: FC = () => {
	const [search, setSearch] = useState('');
	const [bookData, setBookData] = useState([])

	const searchBooks = (evt) => {
		if (evt.key === "Enter") {
			axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyBeCfDx-z6DlAwdUtPiLm3PCrGNoIStJIE')
				.then(result => setBookData(result.data.items))
				.catch(error => console.log(error))
		}
	}
	const onClick: MenuProps['onClick'] = (e) => {
		setSearch(e.key);
	};

	return <>
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
						<Menu onClick={onClick}
						      selectedKeys={[search]}
						      mode="horizontal"
						      items={items}
						      className={styles.menu}
						/>
					</div>
				</div>
			</Layout.Header>
			<Layout.Content className={styles.body}>
				<BookList bookList={bookData}/>
			</Layout.Content>
		</Layout>
	</>
};

export default MainMenu;