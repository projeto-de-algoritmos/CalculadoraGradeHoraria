export function verifyPreRequirements(str, materiasRealizadas){
    if (str.match(/(OU)/)) {
        const materias = str.split(" OU ")
        for (let materia in materias){
            if (materiasRealizadas.includes(materia)) return true
        }
        return false
    }
    else if (str.match(/( E )/)){
        const materias = str.split(" E ")
        for (let materia in materias){
            if (!materiasRealizadas.includes(materia)) return false
        }
        return true
    }
    return materiasRealizadas.includes(str)
}