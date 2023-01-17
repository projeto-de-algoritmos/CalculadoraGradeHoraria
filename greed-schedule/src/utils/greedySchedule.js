import data from "../sigaa-scrap/data.json";
import { verifyPreRequirements } from "./verifyPreRequirements";

const materiasRealizadas = [
  "MAT0025",
  "MAT0026",
  "MAT0031",
  "IDF0171",
  "FGA0168",
  "CIC0004",
];

const materiasAtuais = []

const sortByDate = () =>
  data.sort((data1, data2) => {
    var js_date1 = [];
    var js_date2 = [];

    for (var object in data1.horarios) {
      js_date1.push(new Date(data1.horarios[object]["end-time"]));
    }

    for (var object1 in data2.horarios) {
      js_date2.push(new Date(data2.horarios[object1]["end-time"]));
    }

    if (js_date1[0].getHours() > js_date2[0].getHours()) return 1;
    else return -1;
  });

const horarios_por_aula = {
  Segunda: {},
  Terça: {},
  Quarta: {},
  Quinta: {},
  Sexta: {},
  Sabado: {},
};

export const greedySchedule = (selectedClasses) => {
  for (var classes of selectedClasses){
    materiasRealizadas.push(classes.value)
  }

  const sortedData = sortByDate();

  sortedData.forEach((data) => {
    if (!materiasAtuais.includes(data.codigo) && !materiasRealizadas.includes(data.codigo) && (data.pre_requisitos === "-" || verifyPreRequirements(data.pre_requisitos, materiasRealizadas))) {
      let hasAvaliableClasses = true;

      for (var keys in data.horarios) {
        const start_time = data.horarios[keys]["start-time"].match(/(\d\d:\d\d)/);

        if (Object.hasOwn(horarios_por_aula[keys], start_time[0])) {
          hasAvaliableClasses = false;
          break;
        }
      }
      if (hasAvaliableClasses) {
        for (var keys1 in data.horarios) {
          const start_time = data.horarios[keys]["start-time"].match(/(\d\d:\d\d)/);
          horarios_por_aula[keys1][start_time[0]] = {
            nome: data.nome,
            professor: data.professor,
          };
        }
        materiasAtuais.push(data.codigo)
      }
    }
  });
  
  return horarios_por_aula
};