// 1. Inisialisasi semua elemen di awal
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("captureBtn");
const previewImage = document.getElementById("previewImage");
const previewOverlay = document.getElementById("previewOverlay");
const closePreview = document.getElementById("closePreview");
const timerDisplay = document.getElementById("timerDisplay");
const flash = document.getElementById("flash");
const suaraTimer = new Audio('sound/timer.mp3');

// 2. Akses Kamera
if (video) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { video.srcObject = stream; })
        .catch(() => { alert("Kamera tidak bisa diakses"); });
}

// 3. Fungsi Ambil Foto (Dipisah agar rapi)
function ambilFoto() {
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Ambil gambar dari video ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    // Tampilkan ke Preview
    previewImage.src = imageData;
    previewOverlay.style.display = "flex";

    // Simpan ke localStorage
    let photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos.push(imageData);
    localStorage.setItem("photos", JSON.stringify(photos));
}

// 4. Logika Tombol Capture dengan Timer & Flash
captureBtn.addEventListener("click", () => {
    let detik = 4;
    suaraTimer.currentTime = 0;
    suaraTimer.play().catch(error => {
        console.log("Gagal memutar suara:", error);
    });
    
    // Reset tampilan awal
    flash.style.display = "none";
    timerDisplay.innerText = detik;
    timerDisplay.style.display = "block";
    captureBtn.disabled = true;

    let hitungMundur = setInterval(() => {
        detik--;
        timerDisplay.innerText = detik;

        // Efek Flash muncul SESAAT sebelum potret (detik 1 menuju 0)
    
        

        if (detik <= 0) {
            clearInterval(hitungMundur);
            timerDisplay.style.display = "none";
            flash.style.display = "flex"

            setTimeout(() => {
                flash.style.display = "none";
            }, 100);
            
            // Ambil foto
            

            // Sembunyikan flash setelah foto diambil
            setTimeout(() => {
                ambilFoto();
                
                captureBtn.disabled = false;
            }, 500); // Flash mati setelah 0.2 detik
        }
    }, 1000);
});

// 5. Tutup Preview
closePreview.addEventListener("click", () => {
    previewOverlay.style.display = "none";
});