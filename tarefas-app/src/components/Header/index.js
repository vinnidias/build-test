import './style.css'
import DefaultButton from '../DefaultButton'


export default function Header({ filesClick, imageType, imagePath, imgLoading }) {

	return (
		<div className='header-container'>
			<div className='button-container'>
				<DefaultButton
					title={'Anexos'}
					onClick={filesClick}
				/>
			</div>
			<div className='image-container'>
				{
					imgLoading
						? <img
							src='https://user-images.githubusercontent.com/60718041/122485230-c87ea680-cfac-11eb-9160-1cbfd87fe64a.gif'
							alt='carregando foto'
							className='estudent-img'
						/>
						: <img
							src={`data:${imageType};base64, ${imagePath}`}
							alt='foto do estudante'
							className='estudent-img'
						/>
				}
			</div>
		</div>
	)
}