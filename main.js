const btnDownloadCV = document.getElementById('js-btn-downlow-cv');
btnDownloadCV.addEventListener('click', getCV);

function getCV() {
    fetch('http//localhost:8000/cv')
        .then(
             resp => resp.blob()
        )
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = 'cv.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => alert('there is some problem'));
}