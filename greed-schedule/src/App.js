import SemesterConatiner from "./components/SemesterContainer";
import "./App.css";
import { ClassesSelector } from "./components/ClassesSelector";
import { useState } from "react";
import { greedySchedule } from "./utils/greedySchedule";

function App() {
  const [selectedClasses, setSelectedClasses] = useState([])
  return (
    <div className="App">
      <h2>Selecione as matérias que já cursou</h2>
      <ClassesSelector onChange={(state) => setSelectedClasses(state)}/>
      <button onClick={() => greedySchedule(selectedClasses)}>Monte a minha grade</button>
      <SemesterConatiner title={"1º semestre"}/>
    </div>
  );
}

export default App;
