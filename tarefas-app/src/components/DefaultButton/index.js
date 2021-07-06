import './style.css'


export default function DefaultButton({ title, type, onClick }) {
	return (
        <button 
					type={type}
					onClick={onClick}
					className='default-button'
				>
					{title}
				</button>   
    )
}