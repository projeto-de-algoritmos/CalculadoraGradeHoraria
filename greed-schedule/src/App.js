import SemesterConatiner from "./components/SemesterContainer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <button>Monte a minha grade</button>
      <div className="generic-container">
        <SemesterConatiner title={"1º semestre"}/>
        <SemesterConatiner title={"2º semestre"}/>
        <SemesterConatiner title={"3º semestre"}/>
        <SemesterConatiner title={"4º semestre"}/>
        <SemesterConatiner title={"5º semestre"}/>
        <SemesterConatiner title={"6º semestre"}/>
        <SemesterConatiner title={"7º semestre"}/>
        <SemesterConatiner title={"8º semestre"}/>
        <SemesterConatiner title={"9º semestre"}/>
        <SemesterConatiner title={"10º semestre"}/>
      </div>
    </div>
  );
}

export default App;
