 
import sanityClient from '../../src/client'
import { useState, useEffect } from 'react'
 
const Project = () => {

    const [projectData, setProjectData] = useState(null)

    useEffect(() => {
      sanityClient.fetch(`*[_type == "project"]{
        title,
        date,
        place,
        description,
         projectType,
         link,
         tags

      }`).then((data) => setProjectData(data))
      .catch(console.error)
    }, []);
  return (
    <div>
      <main className='bg-slate-600'>
        <section className='container mx-auto'>
          <h2 className='text-4xl flex justify-center'>我的專案:</h2>
          <h1 className='text-lg text-gray-300 flex justify-center mb-12'>歡迎點擊我的專案</h1>
          <section className='grid grid-cols-2 gap-8'>
            {projectData && projectData.map((project, index) => ( 
            <article key={index} className='relative rounded-lg shadow-xl bg-white p-16'>
              <h3 className='text-gray-200 text-3xl font-bold mb-2'>
                <a 
                  href={project.link}
                  
                  target='_blank'
                 rel="noopener noreferrer"
                  >{project.title}</a>
              </h3>
              <div className='text-gray-500 text-xs '>
                <span>
                  <strong>
                    finished on :{""}
                    {new Date(project.date).toLocaleDateString()}
                  </strong>
                </span>
                <span>
                  <strong className='font-bold'>company</strong>:{""}
                  {project.place}
                </span>
                <span>
                  <strong className='font-bold'>Type

                  </strong>:{""}
                  {project.projectType}
                </span>
                <p className='my-6 text-gray-600'>
               {project.description}
                </p>
                <a href={project.link} rel="noopener noreferrer" target='_blank' className='text-red-600'> 
                  view the project{""}
                <span role="img" aria-label='right pointer'>

                </span>
                </a>
              </div>

            </article>
            ))}
          </section>
        </section>
      </main>
    </div>
  )
}

export default Project