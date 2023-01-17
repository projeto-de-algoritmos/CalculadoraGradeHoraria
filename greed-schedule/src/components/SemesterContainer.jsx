import "./SemesterContainer.css";

const SemesterContainer = ({ schedule }) => {
  return (
    schedule && (
      <div className="classes">
        <h3>Matérias selecionadas</h3>
        {Object.keys(schedule).map((key, index) => {
          return (
            <div key={index}>
              <p>{key}:</p>
            </div>
          );
        })}
        {console.log(Object.values(schedule)[0])}
      </div>
    )
  );
};

export default SemesterContainer;
