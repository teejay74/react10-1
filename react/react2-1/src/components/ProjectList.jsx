export function ProjectList(props) {
    const { projects } = props;
    let c=0;
    
      return (
          <div className="Projects">
              {projects.map((image) =>  {
                  c += 1;
                  return ( <img className = 'Image' src={image.img} key={c} alt='img'></img>)
              })}
          </div>
      )
    
    }