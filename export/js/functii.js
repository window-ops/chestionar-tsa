let punctajobtinut = "";
let riscobtinut = "";
let recomandariobtinute = "";
let varstaobtinuta = "";
let CUIfurnizor = "";
let codparafamedic = "";
let CNPcopil = "";
let datacurenta = new Date();
let luni = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
let ziua = datacurenta.getDate();
let luna = luni[datacurenta.getMonth()];
let anul = datacurenta.getFullYear();
let dataformatata = ziua + ' ' + luna + ' ' + anul;
let parametriiurl = new URLSearchParams(window.location.search);


function export_construiesteurlsinavigheaza() {
  let url = "../export/?punctaj=" + punctaj + "&risc=" + document.getElementById("riscafis").innerHTML + "&recomandari=" + document.getElementById("recomandariafis").innerHTML + "&varsta=" + "24 luni";
  window.location.href = url;
}

function extragedatedinurlsiafiseaza() {
  // Extrage date din URL
  punctajobtinut = parametriiurl.get('punctaj');
  riscobtinut = parametriiurl.get('risc');
  recomandariobtinute = parametriiurl.get('recomandari');
  varstaobtinuta = parametriiurl.get('varsta');
  
  // Dacă vârsta obținută este 2 ani, atunci schimb-o în 24 de luni
  if (parametriiurl.get('varsta') === "2 ani") {
    let url = "../export/?punctaj=" + punctajobtinut + "&risc=" + riscobtinut + "&recomandari=" + recomandariobtinute + "&varsta=" + "24 luni";
    window.location.href = url;
  }
  
  // Verifică dacă toți parametrii necesari există și sunt valizi
  if (!parametriiurl.has('punctaj') || !parametriiurl.has('risc') || !parametriiurl.has('recomandari') || !parametriiurl.has('varsta') || ![punctajobtinut, riscobtinut, recomandariobtinute, varstaobtinuta].every(Boolean) || isNaN(parseInt(punctajobtinut)) || isNaN(parseInt(varstaobtinuta))) {
    alert("Exportul nu este valid, vă rugăm să reveniți de la început pentru a alege un chestionar corespunzător!");
    window.location.href = "..";
    return;
  }

  // Afișează
  document.getElementById("punctajafis").innerHTML = punctajobtinut;
  document.getElementById("riscafis").innerHTML = riscobtinut;
  document.getElementById("recomandariafis").innerHTML = recomandariobtinute;
  document.getElementById("varstacopilinput").value = varstaobtinuta;
  document.getElementById("datacompletariinput").value = dataformatata;
  
  // Șterge parametrii din URL pentru a preveni modificarea
  history.replaceState(null, null, window.location.pathname);
}


function exportdate() {
  // Previne comportamentul implicit de trimitere
  event.preventDefault();
  
  // Atribuie valori introduse de utilizator
  CUIfurnizor = document.getElementById("CUIinput").value;
  codparafamedic = document.getElementById("codparafainput").value;
  CNPcopil = document.getElementById("CNPcopilinput").value;

  // Verifică dacă toate câmpurile sunt completate și completate corect
  if (CUIfurnizor.length !== 12) {
    alert("CUI-ul furnizorului trebuie să aibă 12 caractere!");
    return;
  }
  else if (codparafamedic.length !== 6) {
    alert("Codul parafă medic trebuie să aibă 6 cifre!");
    return;
  }
  else if (CNPcopil.length !== 13) {
    alert("CNP-ul copilului trebuie să aibă 13 cifre!");
    return;
  }

  // Crează conținut de fișier text
  var fileContent = "Punctaj: " + punctajobtinut + "\n" +
                    "Risc: " + riscobtinut + "\n" +
                    "Recomandări: " + recomandariobtinute + "\n" +
                    "CUI Furnizor: " + CUIfurnizor + "\n" +
                    "Cod parafă medic: " + codparafamedic + "\n" +
                    "CNP copil: " + CNPcopil + "\n" +
                    "Vârstă copil: " + varstaobtinuta + "\n" +
                    "Data completării chestionarului: " + dataformatata + "\n";

  // Crează un nou obiect Blob cu conținutul fișierului
  var file = new Blob([fileContent], {type: 'text/plain'});

  // Crează un nou obiect URL cu obiectul Blob
  var fileURL = URL.createObjectURL(file);

  // Crează un nou element de ancorare cu adresa URL a fișierului
  var downloadLink = document.createElement("a");
  downloadLink.href = fileURL;
  downloadLink.download = "export_chestionar-tsa_CNP-" + CNPcopil + ".txt";

  // Adaugă elementul de ancorare la corpul documentului
  document.body.appendChild(downloadLink);

  // Apasă pe elementul de ancorare pentru a declanșa descărcarea
  downloadLink.click();

  // Scoate elementul de ancorare din corpul documentului
  document.body.removeChild(downloadLink);
}

function anuleazaexportul() {
  let confirmare = confirm("Sigur vreți să anulați procesul de export și să pierdeți permanent datele introduse? OK = DA; Cancel = NU");
  if (confirmare) {
    let url = "..";
    window.location.href = url;
  }
}
