import React, { useState } from 'react';
import styled from 'styled-components';
import useFetch from '../hooks/useFetch';

const styles = {
	container: {
		display: 'flex',
		gap: '10px',
	},
	avatar: {
		width: '100px',
		height: '100px',
	},
};

const SetAvatar = () => {
	const { data } = useFetch();

	const [selected, setSelected] = useState('');

	return (
		<>
			<Container>
				<div className='title-container'>
					<h1>Pick an avatar as your profile picture</h1>
					<div className='avatars'>
						{selected ? (
							<div style={styles.container}>
								<img
									src={selected}
									alt='avatar'
									style={styles.avatar}
								/>
							</div>
						) : (
							<div style={styles.container}>
								{data?.map((avatar, index) => (
									<img
										src={avatar.image}
										alt='avatar'
										key={index}
										style={styles.avatar}
										onClick={() => setSelected(avatar.image)}
									/>
								))}
							</div>
						)}
					</div>
				</div>
			</Container>
		</>
	);
};

const Container = styled.div``;

export default SetAvatar;
