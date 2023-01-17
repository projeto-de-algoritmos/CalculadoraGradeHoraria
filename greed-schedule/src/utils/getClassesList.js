export function getClassesList(classesObject){
    const classesList = {}

    for (let obj of classesObject){
        const new_obj = {
            "value": obj.codigo,
            "label": obj.nome
        }
        if (!Object.hasOwn(classesList, obj.nome)) classesList[obj.nome] = new_obj
    }

    return Object.values(classesList)
}