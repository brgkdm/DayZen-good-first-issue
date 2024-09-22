let rutin = {
    ad: "Sabah Sporu",
    zaman: "07:00",
    tekrar: "Her Gün"
};


let rutinler = [rutin];


function rutinleriListele() {
    let rutinListesi = document.getElementById('rutin-listesi');
    rutinListesi.innerHTML = '';

    rutinler.forEach(function(rutin, index) {
        rutinListesi.innerHTML += `
            <div class="rutin">
                <h3>${rutin.ad}</h3>
                <p>Zaman: ${rutin.zaman}</p>
                <p>Tekrar: ${rutin.tekrar}</p>
                <button onclick="rutiniSil(${index})">Sil</button>
            </div>
        `;
    });
}


function rutinEkle() {
    let ad = document.getElementById('ad').value;
    let zaman = document.getElementById('zaman').value;
    let tekrar = document.getElementById('tekrar').value;

    let yeniRutin = {
        ad: ad,
        zaman: zaman,
        tekrar: tekrar
    };

    rutinler.push(yeniRutin);
    rutinleriListele();
}


function rutiniSil(index) {
    rutinler.splice(index, 1);
    rutinleriListele();
}

document.addEventListener('DOMContentLoaded', function() {
    rutinleriListele();
});



document.addEventListener("DOMContentLoaded", function() {
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.add("active");
});



document.addEventListener("DOMContentLoaded", function() {
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.add("active");

    window.addEventListener("scroll", function() {
        const featuresSection = document.querySelector(".features");
        const featuresSectionTop = featuresSection.offsetTop;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > featuresSectionTop - window.innerHeight / 2) {
            featuresSection.classList.add("active");
        }
    });
});


