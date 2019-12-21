import React from 'react';

const ImageCard = ({ backgroundColor, selectedPic, onImageClick }) => {
	return (
		<div className='col s3'>
			<div className={`card hoverable ${backgroundColor} `} onClick={() => { onImageClick(selectedPic) }}>
				<div className='card-image'>
					<img src={`assets/img/${selectedPic}.jpg`} alt='Pictures' />
				</div>
			</div>
		</div>
	);
};

export default ImageCard;