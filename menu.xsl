<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="language" select="'en'"/>
    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:template match="/">
        <html>
        <head>
            <title>Menu Example</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .menu {
                    margin: 20px 0;
                }
                .menu a {
                    margin-right: 15px;
                    text-decoration: none;
                    color: #333;
                }
                .menu a:hover {
                    text-decoration: underline;
                }
                .content {
                    margin-top: 20px;
                }
            </style>
            <script>
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

                window.onload = function() {
                    var language = localStorage.getItem('language') || 'en';
                    document.getElementById('languageSelect').value = language;
                };
            </script>
        </head>
        <body>
            <div class="menu">
                <span class="language-selector">
                    🌐 
                    <select id="languageSelect" onchange="changeLanguage(this.value)">
                        <option value="en">ENG</option>
                        <option value="fr">FR</option>
                        <option value="es">ESP</option>
                    </select>
                </span>
                <xsl:for-each select="menu/item">
                    <a href="javascript:void(0)" onclick="showContent('{position()}')">
                        <xsl:value-of select="name/lang[@code=$language]"/>
                    </a>
                </xsl:for-each>
            </div>
            <xsl:for-each select="menu/item">
                <div id="{position()}" class="content" style="display:none;">
                    <xsl:value-of select="content/lang[@code=$language]"/>
                </div>
            </xsl:for-each>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
