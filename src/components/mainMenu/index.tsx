import React, {FC, useState} from 'react';
import {AppstoreOutlined, SettingOutlined, UnorderedListOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import styles from './index.module.scss'

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
	const [current, setCurrent] = useState('list');

	const onClick: MenuProps['onClick'] = (e) => {
		setCurrent(e.key);
	};

	return <>
		<Menu onClick={onClick}
		      selectedKeys={[current]}
		      mode="horizontal"
		      items={items}
		      className={styles.header}
		/>
	</>
};

export default MainMenu;