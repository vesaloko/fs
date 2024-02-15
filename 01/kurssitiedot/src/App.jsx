
const App = () => {
  const course = {
    name: 'Half Stack application development',
    part: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
       <Header course={course.name}/>
       <Content part = {course.part}/>
      <Total total ={course.part[0].exercises + course.part[1].exercises + course.part[2].exercises} />
    </div>
  )
}

const Content = ({part}) => {
  return (
    <div>
       {part.map((part, index) => (
        <p key={index}>{part.name} - {part.exercises} exercises</p>
      ))}
    </div>
  )
}

  const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    )
    }


    const Total = ({total}) => {
      return (

       <p>Total number of exercises {total}</p>
       )
  }


export default App