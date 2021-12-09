/**
 * Estado 0 = A,DIRTY,DIRTY
 * Estado 1 = A,DIRTY,CLEAN
 * Estado 2 = A,CLEAN,DIRTY
 * Estado 3 = A,CLEAN,CLEAN
 * Estado 4 = B,DIRTY,DIRTY
 * Estado 5 = B,DIRTY,CLEAN
 * Estado 6 = B,CLEAN,DIRTY
 * Estado 7 = B,CLEAN,CLEAN
 */

function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";
    else if (location=="A") return "RIGHT";
    else if (location=="B") return "LEFT";
}

function test(states, count){
    let estados = [
        "A,DIRTY,DIRTY",
        "A,DIRTY,CLEAN",
        "A,CLEAN,DIRTY",
        "A,CLEAN,CLEAN",
        "B,DIRTY,DIRTY",
        "B,DIRTY,CLEAN",
        "B,CLEAN,DIRTY",
        "B,CLEAN,CLEAN",
    ]
    var location = states[0];		
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    $("#log").append("<br>Location: ".concat(location).concat(" | Action: ").concat(action_result));
    // Actualizar contador de cada vez que se visita un estado
    count[estados.indexOf(states.toString())] = count[estados.indexOf(states.toString())] + 1
    $('#contador').html("");
    estados.forEach((element, index) => {
        $('#contador').append(element + " - " +count[index]+"<br>");
    });
    // Contador de estados menores a 1, si llega a 0 se termina la ejecución
    end_agent = count.filter(value => value < 1)
    // img = obtener_imagen(states.toString())
    img = estados.indexOf(states.toString()) + ".png"
    $("#img").attr('src','img/'+img)
    if (action_result == "CLEAN"){
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    }
    else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    
    //Ensuciar 
    states = ensuciar(states)
    if(end_agent.length != 0){
        setTimeout(function(){ test(states, count); }, 1000);
    }
}

function ensuciar(states) {
    if(states[0] === "A"){
        states[2] = states[2] === "CLEAN" ? (Math.random() < 0.6 ? "DIRTY" : "CLEAN") : states[2];
    }else{
        states[1] = states[1] === "CLEAN" ? (Math.random() < 0.6 ? "DIRTY" : "CLEAN") : states[1];
    }
    return states;
}

let states = ["A","DIRTY","DIRTY"];
let count = [0,0,0,0,0,0,0,0];
test(states, count);
