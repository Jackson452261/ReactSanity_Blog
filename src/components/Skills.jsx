const skills = [
  { name: "HTML", percentage: 100 },
  { name: "CSS", percentage: 90 },
  { name: "JavaScript", percentage: 75 },
  
];

const Skills = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="section-title text-center mb-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className="text-gray-600 mt-2">
         
        </p>
      </div>

      {/* Skills Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" data-aos="fade-up" data-aos-delay="100">
        {skills.map((skill, index) => (
          <div key={index} className="progress mb-6">
            <span className="skill flex justify-between items-center mb-2 text-lg">
              <span>{skill.name}</span>
              <i className="val font-semibold">{skill.percentage}%</i>
            </span>
            <div className="progress-bar-wrap bg-gray-200 h-4 rounded-md overflow-hidden">
              <div
                className="progress-bar bg-blue-500 h-4"
                style={{ width: `${skill.percentage}%` }}
                role="progressbar"
                aria-valuenow={skill.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
