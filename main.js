var camera = document.getElementById("webcam")

var ReconhecerFala = window.webkitSpeechRecognition;

var Reconhecimento = new ReconhecerFala();

function start(){
    document.getElementById("textbox").innerHTML = "";
    Reconhecimento.start();
}

function speak(){
    var synth = window.speechSynthesis
    var SpeakData = "Tirando sua selfie em 5 segundos."
    var utterThis = new SpeechSynthesisUtterance(SpeakData)
    synth.speak(utterThis)
    Webcam.attach(camera)

    setTimeout(function(){
        TirarFoto();
        document.getElementById("DownloadButton").style.display = "block";
    }, 5000);

}

Webcam.set({
    width: 370,
    height: 255,
    image_format: 'png',
    png_quality: 100,
})

function TirarFoto(){
    Webcam.snap(function(data_url){
        document.getElementById("result").innerHTML = "<img id='selfie_image' src='"+data_url+"' width='360' height='250'/>";
    })
}

function Salvar(){
    var link = document.getElementById("link")
    link.href = document.getElementById("selfie_image").src
    link.click()
}

Reconhecimento.onresult = function(event){
    var Frase = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Frase;
    
    if(Frase == "tire minha selfie"){
        speak()
    }
}