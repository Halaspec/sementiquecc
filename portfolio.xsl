<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:param name="language" select="'en'"/>
    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:template match="/">
        <html>
        <head>
            <title>Portfolio</title>
            <link rel="stylesheet" href="styles.css"/>
            <script src="script.js"></script>
        </head>
        <body>
            <header>
                <h1>My Portfolio</h1>
                <nav>
                    <span class="language-selector">
                        <select id="languageSelect" onchange="changeLanguage(this.value)">
                            <option value="en">ENG</option>
                            <option value="fr">FR</option>
                            <option value="es">ESP</option>
                        </select>
                    </span>
                    <xsl:for-each select="portfolio/menu/item">
                        <a href="javascript:void(0)" onclick="showContent('{position()}')">
                            <xsl:value-of select="name/lang[@code=$language]"/>
                        </a>
                    </xsl:for-each>
                </nav>
            </header>
            <main>
                <xsl:for-each select="portfolio/menu/item">
                    <div id="{position()}" class="content" style="display:none;">
                        <xsl:choose>
                            <xsl:when test="count(content/lang[@code=$language]/project) > 0">
                                <xsl:for-each select="content/lang[@code=$language]/project">
                                    <h2>
                                        <xsl:value-of select="title"/>
                                    </h2>
                                    <p>
                                        <xsl:value-of select="description"/>
                                    </p>
                                </xsl:for-each>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of select="content/lang[@code=$language]"/>
                            </xsl:otherwise>
                        </xsl:choose>
                    </div>
                </xsl:for-each>
            </main>
            <footer>
                <p>&copy; 2024 My Portfolio</p>
            </footer>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
