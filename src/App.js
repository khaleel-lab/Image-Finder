import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
function App() {
	const [images, setImages] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const [term, setTerm] = useState('');

	const styles = {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	};

	useEffect(() => {
		// Make sure that in .env start with the REACT_APP
		// If you changed any thing in the .env make sure restart the server
		fetch(
			`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABY_API_KEY}&q=${term}&image_type=photo&pretty=true&orientation=horizontal`

			// 'https://pixabay.com/api/videos/?key=21340497-7bb5b750be9ef48e9f3da10ba&q=yellow+flowers'
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.hits);
				setImages(data.hits);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [term]);

	return (
		<>
			<div className='container mx-auto'>
				<ImageSearch searchText={(text) => setTerm(text)} />

				{!isLoading && images.length === 0 && (
					<h1 className='text-5xl text-center mx-auto mt-32'>
						No Images Found
					</h1>
				)}

				{isLoading ? (
					<Loader
						style={styles}
						type='ThreeDots'
						color='#8577FB'
						height={100}
						width={100}
					/>
				) : (
					<div className='grid grid-cols-3 gap-4'>
						{images.map((item) => (
							<ImageCard key={item.id} image={item} />
						))}
					</div>
				)}
			</div>
		</>
	);
}

export default App;
