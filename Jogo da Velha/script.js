let selected;
let player ="X";
let Xspan = document.getElementById("X");
let Ospan = document.getElementById("O");
let X=0;
let O=0;
let limit = 0;
let positions=[
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

function reload(){
    location.reload();
}

function init(){
    selected=[];
    console.log(limit)
    if(limit!=10){
        document.querySelectorAll("button").forEach((item)=> {
            item.innerHTML="";
            item.addEventListener("click", newMove);
            
        });
    }else{
        document.querySelectorAll("button").forEach((item)=>{
            item.innerHTML="";
            let scoreboard = document.getElementById("scoreboard");

            while(scoreboard.firstChild){
                scoreboard.removeChild(scoreboard.firstChild);
            }

            let span = document.createElement("span");

            if(X === O){
                span = "<span>Empate!!</span>"
                scoreboard.innerHTML = span;
            }else if(X>O){
                span = "<span>X Ganhou!!</span>"
                scoreboard.innerHTML = span;
            }else{
                span = "<span>O Ganhou!!</span>"
                scoreboard.innerHTML = span;
            }

           
        });
    }
 
}

init();

function newMove(e){
    const index= e.target.getAttribute("data-i");
    e.target.innerHTML=player;
    e.target.removeEventListener("click", newMove);
    selected[index]=player;

    setTimeout(()=>{
        check();
    },[100]);

    player=player ==="X" ? "O" : "X";
    
}

function check(){
    let playerLastMove = player==="X" ? "O" : "X";

    const items=selected.map((item, i)=> [item, i]).filter((item)=> item[0]===playerLastMove).map((item)=>item[1]);

    for(pos of positions){
        if(pos.every((item)=>items.includes(item))){
            if(playerLastMove==="X"){
                X+=1;
                limit+=1

                Xspan.innerHTML="X | "+X;
            }else{
                O+=1;
                limit+=1

                Ospan.innerHTML= O + " | O";
            }
           
            init();
            return;
        }
    }

}
