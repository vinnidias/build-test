import { useEffect, useState } from 'react'
import './style.css'

export default function LoaderIcon() {
	
	return (
		<div className='loader-container'>
			<img
				src='https://user-images.githubusercontent.com/60718041/122485230-c87ea680-cfac-11eb-9160-1cbfd87fe64a.gif'
				width='100px'
				height='100px'
			/>
			<h1>Ensino conectado com a vida</h1>
		</div>
	)
}