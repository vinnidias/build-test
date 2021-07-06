import { useEffect, useState } from 'react'
import './style.css'


export default function CardModal({ onModalClick, comment, subject, status, points }) {
	const [statusColor, setStatusColor] = useState('')

	const verifyStatusColor = (status) => {
		if(status === 'Atividade pendente.'){
			setStatusColor('red')
		}
		if(status === 'Atividade entregue.'){
			setStatusColor('dodgerblue')
		}
	}

	useEffect(()=>{
		verifyStatusColor(status)
	},[status])

	return (
		<div className='card-modal-container'>
			<div className='subject-modal-container'>
				<button
					onClick={onModalClick}
				>
					<img 
						src='https://user-images.githubusercontent.com/60718041/122564663-ff3fd580-d01b-11eb-89bb-27569fa05efe.png'
						alt='Fechar tarefa'
					/>
				</button>
				<p>{subject}</p>
			</div>
			<div className='comments-container'>
				<h3 style={{color: statusColor}}> {status} </h3>
				<p>{comment} </p>
				<p>{points} </p>
			</div>
		</div>
	)
}