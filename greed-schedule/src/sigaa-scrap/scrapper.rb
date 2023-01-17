require "./converter.rb"
require 'watir'
require 'webdrivers'
require 'nokogiri'
require 'pry-byebug'
require 'json'

class Scrapper
    @instance_of_converter = Converter.new

    browser = Watir::Browser.new
    browser.goto 'https://sigaa.unb.br/sigaa/public/turmas/listar.jsf'
    parsed_page = Nokogiri::HTML(browser.html)

    File.open("parsed.txt", "w") { |f| f.write "#{parsed_page}" }

    browser.select_list({id: "formTurma:inputNivel"}).click
    browser.option({text: "GRADUAÇÃO"}).click

    browser.select_list({id: "formTurma:inputDepto"}).click
    browser.option({text: "FACULDADE DO GAMA - BRASÍLIA"}).click

    browser.input(value: "Buscar").click

    materias = []
    pre_requisitos_relacionados = []
    aux = -1

    rows_quantity = browser.table(class: "listagem").rows.length - 3

    for classes in 0..153 do
        if classes == 0
            xpath_mat = "//*[@id='formTurma:aqui']/span"
        else
            xpath_mat = "//*[@id='formTurma:aquij_id_#{classes}']/span"
        end

        browser.element(xpath: xpath_mat).click

        value = browser.table(class: "visualizacao")[5].text
        value = value.match(/[^:]*$/).to_s.gsub("(", "").gsub(")", "").strip
        pre_requisitos_relacionados.push(value)

        browser.back
    end

    detalhes_aulas = {}

    for row in 1..rows_quantity do
        text = browser.table(class: "listagem")[row].text
        if text[0] == "F"
            codigo = text[0..6]
            
            materia_name = text[10..]
            
            aux += 1
        else
            materias.push({"id": row, "nome": "#{materia_name}", "codigo": "#{codigo}", "pre_requisitos": "#{pre_requisitos_relacionados[aux] || nil}"})
            
            regular_expression = text[10..]
            
            professor = regular_expression.match(/([^(]+)/).to_s.strip
            
            horario = regular_expression.match(/(?<=\)).*/).to_s.strip

            horario_mapeado = {}

            horario.split.each do |h|
                horario_mapeado.merge!(@instance_of_converter.classifica_horario(h)) unless @instance_of_converter.classifica_horario(h).nil? 
            end
            
            detalhes_aulas = {"professor": "#{professor}", "horarios": horario_mapeado}
            
            detalhes_aulas_clone = Marshal.load(Marshal.dump(detalhes_aulas))
            
            materias[materias.length - 1].merge!(detalhes_aulas_clone) unless detalhes_aulas.empty?
        end
    end

    browser.close

    materias_eng_software = ["Probabilidade e Estatística Aplicado a Engenharia", "Métodos Numéricos para Engenharia", "Engenharia Econômica", 
        "Humanidades e Cidadania", "Teoria de Eletrônica Digital 1", "Prática de Eletrônica Digital 1", "Orientação a Objetos", 
        "Gestão da Produção e Qualidade", "Métodos de Desenvolvimento de Software","Estruturas de Dados e Algoritmos", "Fundamentos de Arquitetura de Computadores",
        "Matemática Discreta 2", "Interação Humano Computador", "Requisitos de Software", "Sistemas de Banco de Dados 1", "Fundamentos de Sistemas Operacionais", 
        "Compiladores 1", "Estruturas de Dados 2", "Qualidade de Software 1", "Testes de Software", "Arquitetura e Desenho de Software", 
        "Fundamentos de Redes de Computadores", "Sistemas de Banco de Dados 2", "Projeto de Algoritmos", "Técnicas de Programação em Plataformas Emergentes", 
        "Paradigmas de Programação", "Fundamentos de Sistemas Embarcados", "Programação para Sistemas Paralelos e Distribuídos", 
        "Engenharia de Produto de Software", "Gerência de Configuração e Evolução de Software"]

    materias_eng_software.map!(&:upcase)

    materias = JSON.parse(materias.to_json)

    materias = materias.map.select { |mat| materias_eng_software.include?(mat["nome"])}

    File.open("./data.json", "w") do |f|
        f.write(materias.to_json)
    end
end