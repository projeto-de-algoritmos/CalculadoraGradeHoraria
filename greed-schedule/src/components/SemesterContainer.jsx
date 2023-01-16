import "./SemesterContainer.css";

const SemesterConatiner = ({title}) => {
    return(
        <div>
            <h3>{title}</h3>
            <h4>Matérias</h4>
            <p>Nome, código e horário</p>
        </div>
    );
};

export default SemesterConatiner;