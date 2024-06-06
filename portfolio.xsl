<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8"/>

    <xsl:template match="/">
        <html lang="fr">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Mon Portfolio</title>
            <link rel="stylesheet" href="styles.css"/>
        </head>
        <body>
            <header>
                <h1>Mon Portfolio</h1>
            </header>
            <section id="about">
                <h2>À propos de moi</h2>
                <p><xsl:value-of select="portfolio/about/bio"/></p>
            </section>
            <section id="projects">
                <h2>Projets</h2>
                <xsl:for-each select="portfolio/projects/project">
                    <div class="project">
                        <h3><xsl:value-of select="title"/></h3>
                        <p>
                            <xsl:choose>
                                <xsl:when test="steps">
                                    <strong>Étapes d'Apprentissage :</strong>
                                    <ul>
                                        <xsl:for-each select="steps/step">
                                            <li><xsl:value-of select="."/></li>
                                        </xsl:for-each>
                                    </ul>
                                </xsl:when>
                                <xsl:otherwise>
                                    <xsl:value-of select="description"/>
                                </xsl:otherwise>
                            </xsl:choose>
                        </p>
                    </div>
                </xsl:for-each>
            </section>
            <section id="contact">
                <h2>Contact</h2>
                <p>Email: <xsl:value-of select="portfolio/contact/email"/></p>
                <p>Téléphone: <xsl:value-of select="portfolio/contact/phone"/></p>
            </section>
            <footer>
                <p><xsl:value-of select="portfolio/footer"/></p>
            </footer>
        </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
