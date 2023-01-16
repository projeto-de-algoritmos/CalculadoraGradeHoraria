require 'pry-byebug'

$dias_da_semana_horario = {
    "2": "2023-01-16",
    "3": "2023-01-17",
    "4": "2023-01-18",
    "5": "2023-01-19",
    "6": "2023-01-20",
    "7": "2023-01-21"
}

$dias_da_semana = {
    "2": "Segunda",
    "3": "Terça",
    "4": "Quarta",
    "5": "Quinta",
    "6": "Sexta",
    "7": "Sabado"
}

$horarios = {
    "12": {
        "start-time": "08:00:00",
        "end-time": "09:50:00"
    },
    "34": {
        "start-time": "08:00:00",
        "end-time": "09:50:00"
    },
    "5": {
        "start-time": "12:00:00",
        "end-time": "13:50:00"
    },
    "1234": {
        "start-time": "08:00:00",
        "end-time": "11:50:00"
    },
    "23": {
        "start-time": "14:00:00",
        "end-time": "15:50:00"
    },
    "45": {
        "start-time": "16:00:00",
        "end-time": "17:50:00"
    },
    "6": {
        "start-time": "18:00:00",
        "end-time": "19:50:00"
    }
}

class Converter
    def classifica_horario(string)
        horarios_compativeis = []

        $horarios.select {|key| horarios_compativeis << key.to_s}

        match_horario = string.match(/[^a-zA-Z]*$/).to_s
        
        return if string.match?(/(N1)/) || string.match?(/(T1)/) || !horarios_compativeis.include?(match_horario)

        if string[1].match?(/[0-9]/)
            traduz_horario_duplo(string, match_horario)
        else
            traduz_horario_simples(string, match_horario)
        end
    end

    def traduz_horario_simples(string, match_horario)
        data = {
            "#{$dias_da_semana[:"#{string[0]}"]}":{
                "start-time": "#{$dias_da_semana_horario[:"#{string[0]}"]}" + " #{$horarios[:"#{match_horario}"][:"start-time"]} -0300",
                "end-time": "#{$dias_da_semana_horario[:"#{string[0]}"]}" + " #{$horarios[:"#{match_horario}"][:"end-time"]} -0300"
            }
        }
    end

    def traduz_horario_duplo(string, match_horario)
        dias_semana = "#{string[0]}#{string[1]}"

        data = {}

        for i in 0..1 do
            tmp_data = {
                "#{$dias_da_semana[:"#{string[i]}"]}":{
                    "start-time": "#{$dias_da_semana_horario[:"#{string[i]}"]}" + " #{$horarios[:"#{match_horario}"][:"start-time"]} -0300",
                    "end-time": "#{$dias_da_semana_horario[:"#{string[i]}"]}" + " #{$horarios[:"#{match_horario}"][:"end-time"]} -0300"
                }
            }
            data.merge!(tmp_data)
        end

        return data
    end
end
