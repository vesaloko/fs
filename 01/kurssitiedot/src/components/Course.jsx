const Header = (props) => {
  console.log(props)
    return (
      <div>
        <h1>{props.name}</h1>
      </div>
    )
  }
  

  const Content = (props) => {
    const content = props.parts.map(incl => { return <Part key={incl.id} parts={incl} /> } )
    console.log(props, content)
    return (
      <div>
        {content}
      </div>
    )
  }


  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>{props.parts.name} {props.parts.exercises}</p>
      </div>
    )
  }
  

  const TotalSum = (props) => {
    const totalSum = props.parts.reduce((sum,order) => sum + order.exercises, 0)
    console.log(totalSum)
    return (
      <div>
        <p>
          Total of amount of exercises: {totalSum} 
        </p>
      </div>
    )
  } 
  
  const Course = (props) => {
    console.log(props)
    return (
      <div>
        <Header name={props.course.name} />
        <Content parts={props.course.parts}/>
        <TotalSum parts={props.course.parts}/>
      </div>
    )
  }

  export default Course;