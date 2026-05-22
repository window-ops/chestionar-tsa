let punctaj = 0;
let intrebaricomplete = 0;
let nrintrebari = 12;
let obtineparametriiurl = new URLSearchParams(window.location.search);
let varsta = obtineparametriiurl.get('varsta');

function extragevarstadinurlsiafiseaza() {
  // Verifică dacă toți parametrii necesari există și sunt valizi
  if (!obtineparametriiurl.has('varsta') || !varsta.endsWith(" ani") || ![varsta].every(Boolean) || isNaN(parseInt(varsta)) || parseInt(varsta.trim()) < 2 || parseInt(varsta.trim()) > 18) {
    alert("Chestionarul nu este valid, vă rugăm să reveniți de la început pentru a alege un chestionar corespunzător!");
    window.location.href = "..";
    return;
  }

  // Afișează
  document.title = "Chestionar pentru depistarea TSA (" + varsta + ")";
  document.getElementById("titlu").innerHTML = "Chestionar pentru depistarea TSA (" + varsta + ")";
  
  // Șterge parametrii din URL pentru a preveni modificarea
  history.replaceState(null, null, window.location.pathname);
}

function raspunde(idintrebare, adaugarepunctaj) {
  // Adaugă punctajul și marcheaza o întrebare ca fiind completă
  punctaj = punctaj + adaugarepunctaj;
  intrebaricomplete++;

  // Dezactivează întrebarea
  const intrebare = document.getElementById(idintrebare);
  intrebare.classList.add("disabled-col");
}

function afiseazapnr() {
  // Verifică daca s-a raspuns la toate întrebările
  if (intrebaricomplete < nrintrebari) {
    alert("Nu ați răspuns la toate întrebările!");
  }
  else if (intrebaricomplete == nrintrebari) {
  	// Evaluează
    if (0 <= punctaj && punctaj <= 6) {
      document.getElementById("punctajafis").innerHTML = punctaj.toString();
      document.getElementById("riscafis").innerHTML = "Risc minim";
      document.getElementById("recomandariafis").innerHTML = "Reevaluare peste 3 luni";
    }
    else if (7 <= punctaj && punctaj <= 9) {
      document.getElementById("punctajafis").innerHTML = punctaj.toString();
      document.getElementById("riscafis").innerHTML = "Risc mediu";
      document.getElementById("recomandariafis").innerHTML = "Reevaluare peste 3 luni";
    }
    else if (punctaj >= 10) {
      document.getElementById("punctajafis").innerHTML = punctaj.toString();
      document.getElementById("riscafis").innerHTML = "Risc sever";
      document.getElementById("recomandariafis").innerHTML = "Trimitere către medicul de specialitate psihiatrie pediatrică / neuropsihiatrie pediatrică";
    }

  	// Setează vârstă export
  	varstaexport = varsta;
  	
  	//Ascunde afiseazapnr și afișează pnr
  	document.getElementById("afiseazapnr").remove();
  	document.getElementById("pnr").style.display = "block";
  }
}

function refachestionarul() {
  let confirmare = confirm("Sigur vreți să refaceți chestionarul? OK = DA; Cancel = NU");
  if (confirmare) {
    let url = "../2-18-ani/?varsta=" + varsta;
    window.location.href = url;
  }
}