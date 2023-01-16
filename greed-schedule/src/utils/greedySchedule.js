import data from '../sigaa-scrap/data.json'

export const sortByDate = () => data.sort((data1, data2) => {
    var js_date1 = []
    var js_date2 = []
    
    for (var object in data1.horarios){
        js_date1.push(new Date(data1.horarios[object]["end-time"])) 
    }

    for (var object1 in data2.horarios){
        js_date2.push(new Date(data2.horarios[object1]["end-time"]))
    }

    if (js_date1[0].getHours() > js_date2[0].getHours()) return 1
    else return -1
})

console.log(sortByDate()[0])