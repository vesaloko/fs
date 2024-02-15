const App = () => {
const content = [
{ name: 'Fundamentals of React', lkm: 10},
{ name: 'Using props to pass data', lkm: 7},
{ name: 'State of a component', lkm: 14}
]
const course = 'Half Stack application development'
const total = 10 + 7 + 14

  return (
    <div>
       <Header course={course}/>
      <p>{content[0].name} {content[0].lkm}</p>
      <p>{content[1].name} {content[1].lkm}</p>
      <p>{content[2].name} {content[2].lkm}</p>
      <Total total ={total} />
    </div>
  )
}

const Content = ({name, lkm}) => {
  return (
  <p>{name} {lkm}</p>
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