import { useEffect, useState } from 'react'
import './style.css'
import CardModal from './CardModal'
import axios from 'axios'

export default function GradeCard({ subject, grade, studentEmail, studentClass }) {
	const [modalIsVisible, setModal] = useState(false)
	const [teacherComment, setTeacherComment] = useState('')
	const [taskStatus, setTaskStatus] = useState('')
	const [points, setPoints] = useState('')
	const subjectPath = subject.replace(/ /g, '')

	const verifyFeedback = (feedback) => {
		if (feedback === null) {
			setTeacherComment('Está tarefa não possui nenhum comentário do professor.')
		} else {
			
			const adjustedComment = feedback.replace(/\n/g, ' ')
			setTeacherComment(adjustedComment)
		}
	}

	const verifyStatus = (status) => {
		if (status === 'working') {
			setTaskStatus('Atividade pendente.')
		}
		if (status === 'returned' | status === 'submitted') {
			setTaskStatus('Atividade entregue.')
		}
	}

	const verifyPoints = (points) => {
		if (points === null) {
			setPoints('')
		}
		if (points != null) {
			setPoints(`Nota: ${points}`)
		}
	}

	useEffect(async () => {
		try {
			const taskData = await axios.get(`https://apitarefasfinal.herokuapp.com/tarefa/${studentClass}/${subjectPath}/${studentEmail}`)
			const result = taskData.data
			console.log('requisição das tarefas unicas', result)
			const status = taskData.data.status
			verifyStatus(status)
			const comment = taskData.data.feedback
			console.log('comentário da tarefa', comment)
			verifyFeedback(comment)
			const points = taskData.data[0].value[1].points.points
			verifyPoints(points)

		}
		catch (err) {
			return
		}
	}, [modalIsVisible, teacherComment])

	return (

		<>
			{modalIsVisible ?
				<CardModal
					grade={grade}
					subject={subject.replace(/_/g, ' ')}
					onModalClick={() => setModal(false)}
					comment={teacherComment}
					status={taskStatus}
					points={points}
				/>
				:
				<div className='card-container'>
					<div className='subject-container'>
						<button
							onClick={() => setModal(true)}
						>
							<img
								src='https://user-images.githubusercontent.com/60718041/122563786-00bcce00-d01b-11eb-928e-ecefafc7d9ac.png'
								alt='Abrir Tarefa'
							/>
						</button>
						<p>
							{subject.replace(/_/g, ' ')}
						</p>
					</div>
				</div>
			}
		</>
	)
}