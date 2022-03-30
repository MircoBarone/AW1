"use strict";

window.addEventListener("load", () => {
    const Film = function (id, title, favorites, date, rating) {
        if (id === undefined || title === undefined) { return; }
        this.id = id
        this.title = title;
        this.favorites = favorites || false;
        this.date = date;
        this.rating = rating;
    }

    let aggiungifilm = function (Film1) {
        let film = document.createElement("li");
        film.setAttribute("class", "list-group-item");
        let colonna = document.createElement("div");
        colonna.setAttribute("class", "row");
        film.appendChild(colonna);
        if (Film1.favorites === true) {
            let nome = document.createElement("div");
            nome.setAttribute("class", "title-fav col-6");
            nome.innerText = Film1.title;
            let iconatrash=document.createElement("i");
            iconatrash.setAttribute("class","bi bi-trash");
            nome.appendChild(iconatrash);
            colonna.appendChild(nome);
            let favorite = document.createElement("div");
            favorite.setAttribute("class", "fav col-2");
            favorite.innerHTML = '<i class="bi bi-check-square-fill"> </i> <span >Favorite</span>'
            colonna.appendChild(favorite);
        }
        else {
            let nome = document.createElement("div");
            nome.setAttribute("class", "title col-6");
            nome.innerText = Film1.title;
            let iconatrash=document.createElement("i");
            iconatrash.setAttribute("class","bi bi-trash");
            
            nome.appendChild(iconatrash);
            colonna.appendChild(nome);
            let favorite = document.createElement("div");
            favorite.setAttribute("class", "fav col-2");
            favorite.innerHTML = '<i class="bi bi-square"> </i> <span >Favorite</span>'
            colonna.appendChild(favorite);
        }
        let data = document.createElement("div");
        data.setAttribute("class", "col-2");
        if (Film1.date !== undefined) { data.innerText = Film1.date.format("MMMM DD,YYYY"); }
        colonna.appendChild(data);

        let valutazione = document.createElement("div");
        valutazione.setAttribute("class", "valutazione col-2");
        for (let i = 1; i <= Film1.rating; i++) {
            let stella = document.createElement("i");
            stella.setAttribute("class", "bi bi-star-fill");
            valutazione.appendChild(stella);

        }
        for (let i = Film1.rating + 1; i <= 5; i++) {
            let stella = document.createElement("i");
            stella.setAttribute("class", "bi bi-star");
            valutazione.appendChild(stella);

        }
        colonna.appendChild(valutazione);



        let listaf = document.getElementsByClassName("list-group-flush");
        listaf = listaf[0];
        listaf.appendChild(film);
    }






    const Library = function () {
        this.vettore = [];

        this.add = function (Film) {
            if (Film.id === undefined) { return; }
            this.vettore.push(Film);

        }

        this.sortByDate = function () {
            return this.vettore.filter(x => { if (x.date != undefined) { return x; } }).sort((a, b) => {
                { return a.date.diff(b.date); }
            }).concat(this.vettore.filter(x => { if (x.date == undefined) { return x; } }))



        }

        this.deleteFilm = function (ide) {
            this.vettore = this.vettore.filter(x => { if (x.id !== ide) { return x; } });

        }

        this.resetWatchedFilms = function () {
            this.vettore = this.vettore.map(function (x) {
                let Librop = { ...x };
                Librop.date = undefined;
                return Librop;
            })


        }

        this.getRated = function () {
            return this.vettore.filter(function (x) { if (x.rating != undefined) { return x; } }).sort((x, y) => (-x.rating + y.rating));


        }

        this.getFav = function () {

            return this.vettore.filter((x) => { if (x.favorites === true) { return x; } })
        }

        this.getBest = function () {
            return this.vettore.filter(function (x) { if (x.rating === 5) { return x; } })
        }
        this.getSeenLastMonth = function () {
            return this.vettore.filter(function(x){if(x.date!==undefined) return x;}).filter(function (x) { if (dayjs().diff(x.date, "day") <= 30) {  return x; } })
        }
         this.deleteFilmbyName=function(nome) {
            this.vettore=this.vettore.filter((x)=>{return x.title!==nome;})
        


        }
    }

    let FunzionamentoIconaTrash=function() {
        let vettCanclz=document.getElementsByClassName("bi-trash");
        for(const elemento of vettCanclz)
        {     
    
            elemento.addEventListener("click",(event)=>
            {   
                elemento.parentNode.parentNode.parentNode.remove();
                let Titolo=elemento.parentNode.innerText;
                console.log(Titolo);
                Libreria1.deleteFilmbyName(Titolo);
                //Si suppone che il titolo del film sia univoco, sarebbe meglio lavorare con l'id
    
    
    
            }
            
            
            
            )
        }  
    }



    let barralat = document.getElementById("barralaterale");
    let buttons = barralat.getElementsByClassName("list-group-item");
  

    for (let but of buttons) {

        but.addEventListener("click", (event) => {
            for (let but2 of buttons) {

                but2.setAttribute("class", "list-group-item list-group-item-action ");
            }

            but.setAttribute("class", "list-group-item list-group-item-action active");
            if (but === buttons[0]) {
                let hed=document.getElementsByTagName("h1")[0];
                hed.innerText="All";
                let listaf = document.getElementsByClassName("list-group-flush");
                listaf = listaf[0];
                while (listaf.childElementCount != 0) { listaf.removeChild(listaf.lastChild); }
                for (Film1 of Libreria1.vettore) {
                    aggiungifilm(Film1);

                }
                FunzionamentoIconaTrash();


            }
            if (but === buttons[1]) {
                let hed=document.getElementsByTagName("h1")[0];
                hed.innerText="Favorite";
                let listaf = document.getElementsByClassName("list-group-flush");
                listaf = listaf[0];
                while (listaf.childElementCount != 0) { listaf.removeChild(listaf.lastChild); }
                for (Film1 of Libreria1.getFav()) {
                    aggiungifilm(Film1);

                }
                FunzionamentoIconaTrash();



            }

            if (but === buttons[2]) {
                let hed=document.getElementsByTagName("h1")[0];
                hed.innerText="Best Rated";
                
                let listaf = document.getElementsByClassName("list-group-flush");
                listaf = listaf[0];
                while (listaf.childElementCount != 0) { listaf.removeChild(listaf.lastChild); }
                for (Film1 of Libreria1.getBest()) {
                    aggiungifilm(Film1);

                }
                
              FunzionamentoIconaTrash();



            }

            if (but === buttons[3]) {
                let hed=document.getElementsByTagName("h1")[0];
                hed.innerText="Seen Last Month";
                
                let listaf = document.getElementsByClassName("list-group-flush");
                listaf = listaf[0];
                while (listaf.childElementCount != 0) { listaf.removeChild(listaf.lastChild); }
                for (Film1 of Libreria1.getSeenLastMonth()) {
                    aggiungifilm(Film1);

                }

              FunzionamentoIconaTrash();

            }




        });


    }

   




    //Creazione Libreria
    let Libreria1 = new Library();
    //Film1
    Libreria1.add(new Film(1, "PulpFiction", true, dayjs("2022-03-29"), 5));
    //Film2
    let Film1 = new Film(2, "21 Grams", true, dayjs("2022-02-17"), 4);
    Libreria1.add(Film1);
    //Film3
    Film1 = new Film(3, "Star Wars", false, dayjs("2022-01-23"),4);
    Libreria1.add(Film1);
    //Film4
    Libreria1.add(new Film(4, "Matrix"));
    //Film 5
    Film1 = new Film(5, "Shrek", false, dayjs("2022-02-27"), 5);
    Libreria1.add(Film1);
    //Film6
    Film1 = new Film(6, "The Godfather", true, dayjs("2022-03-21"), 5);
    Libreria1.add(Film1);
    //Film 7
    Film1 = new Film(7, "American Beauty", false);

    Libreria1.add(Film1);

    Film1 = new Film(8, "La fabbrica di cioccolato", true, dayjs(), 3);
    Libreria1.add(Film1);
    //Il film prossimo contiene un accento si rende necessario l'escape character formato Unicode

    Film1 = new Film(9, "Casin\u00F2", true, dayjs("2020-12-10"), 5);
    Libreria1.add(Film1);
    Film1 = new Film(10, "Goodfellas", true, dayjs("2020-12-11"), 5);
    Libreria1.add(Film1);
    Film1 = new Film(11, "The Departed", true, dayjs("2020-12-12"), 4);
    Libreria1.add(Film1);


    //popolazione dei film


    for (Film1 of Libreria1.vettore) {
        aggiungifilm(Film1);
        FunzionamentoIconaTrash();
    }
    
    



}





)
