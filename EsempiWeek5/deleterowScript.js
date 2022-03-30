
//facciamo in modo che tutto parta quando ho tutto caricato
window.addEventListener("load", event=>{
    



    let bottoni=document.getElementsByClassName("btn");

//bottoni che cancellano
let bottone1=bottoni[0];
let bottone2=bottoni[1];
let bottone3=bottoni[2];
//Il professore rimuove prima tutti i figli--con un ciclo for è più facile da fare.
bottone1.addEventListener("click",(event)=>{bottone1.parentNode.parentNode.remove();})
bottone2.addEventListener("click",(event)=>{bottone2.parentNode.parentNode.remove();})
bottone3.addEventListener("click",(event)=>{bottone3.parentNode.parentNode.remove();})

//Faccio comparire il voto a seguiti di un clic su una riga--lo faccio con una alert

let row=document.getElementsByTagName("tr");
//il professore racchiude tutto dentro un for
//fare un for non è problematico mi produce una closure che si ricorda quando l'event handler è generato il valore di row.

//let row1=row[0];
//let row2=row[1];
//let row3=row[2];
//let row4=row[3];

//row2.addEventListener("click",(event)=>{alert(row2.querySelectorAll("td")[1].textContent)});
//row3.addEventListener("click",(event)=>{alert(row3.querySelectorAll("td")[1].textContent)});
//row4.addEventListener("click",(event)=>{alert(row4.querySelectorAll("td")[1].textContent)});

for(const riga of row)
{   riga.addEventListener("click",(event)=>{
    voto=riga.querySelectorAll("td")[1].textContent;
    let p=document.createElement("p");
    p.innerHTML=`${voto}`;
    console.log(p);
    document.getElementById("comment").appendChild(p);

})


}
});

//questo è un esempio anche di listener che vanno in conflitto.







