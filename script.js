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

async function transformXML(language) {
    try {
        const [xmlResponse, xslResponse] = await Promise.all([
            fetch('portfolio.xml'),
            fetch('portfolio.xsl')
        ]);

        const xmlText = await xmlResponse.text();
        const xslText = await xslResponse.text();

        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, 'text/xml');
        const xsl = parser.parseFromString(xslText, 'text/xml');

        const processor = new XSLTProcessor();
        processor.importStylesheet(xsl);
        processor.setParameter(null, 'language', language);

        const resultDocument = processor.transformToDocument(xml);
        const resultHtml = new XMLSerializer().serializeToString(resultDocument);

        document.getElementById('content-container').innerHTML = resultHtml;
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
