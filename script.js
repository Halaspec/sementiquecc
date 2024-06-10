function showContent(id) {
    var contents = document.querySelectorAll('.content');
    contents.forEach(function(content) {
        content.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

function changeLanguage(language) {
    localStorage.setItem('language', language);
    location.reload();
}

function loadXMLDoc(filename) {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.responseXML);
            }
        };
        xhttp.open("GET", filename, true);
        xhttp.send();
    });
}

async function transformXML(language) {
    try {
        const xml = await loadXMLDoc('portfolio.xml');
        const xsl = await loadXMLDoc('portfolio.xsl');

        if (window.XSLTProcessor) {
            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xsl);
            xsltProcessor.setParameter(null, "language", language);
            const resultDocument = xsltProcessor.transformToFragment(xml, document);
            document.getElementById('content-container').appendChild(resultDocument);
        } else {
            const resultDocument = xml.transformNode(xsl);
            document.getElementById('content-container').innerHTML = resultDocument;
        }
    } catch (error) {
        console.error("Error loading XML or XSL:", error);
    }
}

function setLanguage(language) {
    localStorage.setItem('language', language);
    transformXML(language);
}

function loadLanguage() {
    const language = localStorage.getItem('language') || 'en';
    transformXML(language);
}

document.addEventListener('DOMContentLoaded', (event) => {
    loadLanguage();
});
