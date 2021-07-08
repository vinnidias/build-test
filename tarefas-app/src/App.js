import './style.css';
import Header from './components/Header'
import { useEffect, useState } from 'react';
import GradeCard from './components/GradeCard';
import LoaderIcon from './components/LoaderIcon';
import axios from 'axios';




function App() {


  const studentEmail = '5353@escolavereda.com.br'
  const [taskList, setTaskList] = useState([])
  const [studentName, setStudentName] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [classAcronym, setClassAcronym] = useState('')
  const [studentImage, setStudentImage] = useState('')
  const [imagePath, setImagePath] = useState('')
  const [loading, setLoading] = useState(true)
  const [tasksLoading, setTasksLoading] = useState(true)


  const verifyClass = (string) => {
    if (string.includes('EF11')) {
      setStudentClass('1º Ano Fundamental I')
    }
    if (string.includes('EF12')) {
      setStudentClass('2º Ano Fundamental I - Testando build em produção')
    }
    if (string.includes('EF13')) {
      setStudentClass('3º Ano Fundamental I')
    }
    if (string.includes('EF14')) {
      setStudentClass('4º Ano Fundamental I')
    }
    if (string.includes('EF15')) {
      setStudentClass('5º Ano Fundamental I')
    }
    if (string.includes('EF26')) {
      setStudentClass('6º Ano Fundamental II')
    }
    if (string.includes('EF27')) {
      setStudentClass('7º Ano Fundamental II')
    }
    if (string.includes('EF28')) {
      setStudentClass('8º Ano Fundamental II')
    }
    if (string.includes('EF29')) {
      setStudentClass('9º Ano Fundamental II')
    }
    if (string.includes('EM1')) {
      setStudentClass('1º Ano Médio')
    }
    if (string.includes('EM2')) {
      setStudentClass('2º Ano Médio')
    }
    if (string.includes('EM3')) {
      setStudentClass('3º Ano Médio')
    }
  }

  

  useEffect(()=> {
    const getData = async () => {
      try {
        const studentData = await axios.get(`https://apitarefasfinal.herokuapp.com/turma/${studentEmail}`)
  
        const studentName = studentData.data.displayName
        const studentClass = studentData.data.jobTitle
        setClassAcronym(studentClass)
        setStudentName(studentName)
        verifyClass(studentClass)
        const path = await axios.get(`https://apitarefasfinal.herokuapp.com/foto/${studentEmail}`)
        console.log('imagem', path)
        const imagePath = path.data[0]
        const type = path.data[1]
        setImagePath(imagePath)
        setStudentImage(type)
        setLoading(false)
      } catch (err) {
        return
      }
  }
   getData()
  }, [])

  useEffect(()=> {
    const getTasks = async ()=> {
      try {
        const tasks = await axios.get(`https://apitarefasfinal.herokuapp.com/tarefa/${classAcronym}`)
        const list = tasks.data[0]
        setTaskList(list)
        setTasksLoading(false)
      } catch (err) {
        return
      }
    }
   getTasks()
   }, [classAcronym, taskList, tasksLoading])
  return (
    <div className='main-container'>
      <Header
        imageType={studentImage}
        imagePath={imagePath}
        imgLoading={loading}
      />
      <div className='grades-container'>
        <h1>{studentName}</h1>
        <h2>{studentClass}</h2>
        <div>
          {
            tasksLoading
              ? <div className='loading-container'><LoaderIcon /></div>
              : taskList.map((task) => (
                <GradeCard
                  key={task}
                  subject={task}
                  studentEmail={studentEmail}
                  studentClass={classAcronym}
                />
              ))
          }
        </div>

      </div>
    </div>
  );
}

export default App;
