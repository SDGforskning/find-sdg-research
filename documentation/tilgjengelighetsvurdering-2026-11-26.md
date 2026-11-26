# Tilgjengelighetsvurdering av [baerekraftsforskning.no](https://baerekraftsforskning.no/)

Utkast til steg B i tilgjengelighetserklæringen på [uustatus.no](https://uustatus.no). Teksten under «Lim inn» kan limes inn når svaret er Nei.

Dette er en test og vurdering, ikke en sertifisering. Virksomheten må selv gå gjennom svarene og bekrefte dem før erklæringen produseres.

- **Nettsted:** https://baerekraftsforskning.no/
- **Testet:** 26. november 2026. Funnene under er sjekket i denne versjonen av koden, lokalt.
- **Kravsett:** 48 suksesskriterier i WCAG 2.1 nivå A og AA som forskriften omfatter. 1.2.3 og 1.2.4 er ikke med.
- **Anbefalt status etter at denne versjonen er publisert:** Delvis i samsvar. Brudd på 2 av 48 krav (1.2.2 og 1.2.5).

Den publiserte løsningen har fortsatt de 10 bruddene fra første gjennomgang. De åtte som er rettet i koden, blir Ja først når denne versjonen er ute. Lim ikke inn Ja for dem før publisering.

## Slik ble det testet

Representativt utvalg, ikke alle innholdssider:

| Type | Sider |
| --- | --- |
| Forside | `/`, `/en` |
| Innhold | `/om/om-tjenesten` |
| Søk | `/sok`, `/en/sok` |

Samme Panopto-film som på forsiden ligger også på `/hjelp/sokehjelp`.

- Første runde: axe-core 4.10.3 (WCAG 2.1 A og AA) i mørkt tema på produksjon, `/`, `/sok` og `/om/om-tjenesten`. Lyst tema er ikke skannet.
- Etter rettingene: sidene over er åpnet lokalt og kontrollnavn, titler, hoppelenke, filterledetekster og videoens navn er lest ut av siden.
- `/` og `/sok` på produksjon målt ved 320 CSS-piksler. Ingen vannrett scrolling.

Ikke gjort, og derfor ikke brukt som grunnlag for Ja: skjermleser (VoiceOver/NVDA), 200 % nettleserzoom som eget forsøk, tekstavstand som eget forsøk, og manuell sjekk av om Panopto-filmene har korrekt teksting og synstolking. Søket ble ikke tvunget til å feile mot databasen.

## Brudd som skal registreres

### 1.2.2 Teksting (forhåndsinnspilt) (A) — Nei

Lim inn:

> Forsiden og søkehjelpen har en forhåndsinnspilt veiledningsfilm, innebygd fra Panopto. Innbyggingen ber om teksting, men det er ikke bekreftet at filmen har et manuelt og synkront tekstespor. Automatisk teksting oppfyller ikke kravet. Brukere som ikke hører talen, får ikke med seg innholdet i filmen. Det gjelder både den norske og den engelske filmen.

Tilgjengelig alternativ: Nei. Filmen har en beskrivende tittel, men ikke et tekstlig alternativ til det som blir sagt.

Dette svaret kan endres til Ja hvis noen har sett filmen og bekreftet manuell teksting, og at spilleren viser den.

### 1.2.5 Synstolking (forhåndsinnspilt) (AA) — Nei

Lim inn:

> Veiledningsfilmen viser hvordan tjenesten brukes. Det som skjer på skjermen er ikke synstolket. Kravet gjelder fra 1. februar 2024. Brukere som ikke ser skjermen, går glipp av det som bare blir vist.

Tilgjengelig alternativ: Nei.

Synstolking legges inn i Panopto. Det kan ikke rettes i nettstedskoden.

## Rettet i denne versjonen

Disse var Nei på den publiserte løsningen. Etter publisering av denne versjonen kan de registreres som Ja.

| Krav | Hva som er rettet |
| --- | --- |
| 1.1.1 Ikke-tekstlig innhold | Norsk mål 12 har alternativteksten «Ansvarlig forbruk og produksjon (SDG-12)». |
| 2.4.1 Hoppe over blokker | Første lenke er «Hopp til innhold» på norsk og «Skip to Content» på engelsk. Den peker til hovedinnholdet. |
| 2.4.2 Sidetitler | Forsiden heter «Finn bærekraftsforskning» / «Find SDG research». Søkesiden heter «Søk \| Finn bærekraftsforskning» / «Search \| Find SDG research». Innholdssider har sidetittel og tjenestenavn. |
| 2.5.3 Ledetekst i navn | Knappen som viser flere filtervalg heter «Vis flere» / «Show more». Det synlige teksten er navnet. |
| 3.1.2 Språk på deler | Norske sider har norske navn på språkvalg, tema, meny, sidemeny, ankerlenker, innholdsfortegnelse og sidebytte. Søkesiden har «Vis filter», «Skjul filter», «Forrige side» og «Neste side». Videoens navn er filmens tittel, på sidens språk. |
| 3.3.1 Identifikasjon av feil | Hvis søket ikke får et svar, vises «Søket feilet. Prøv igjen om litt.» i et varsel. Engelsk: «Search failed. Please try again in a moment.» Ikke fremprovosert mot databasen. |
| 3.3.2 Ledetekster eller instruksjoner | Filterfeltene har synlig ledetekst: «Filtrer Delmål», «Filtrer Delmål, handling» og «Filtrer Fagfelt (NPI)». Engelsk: «Filter SDG targets», «Filter SDG targets, action» og «Filter Scientific field». |
| 4.1.2 Navn, rolle, verdi | De samme ledetekstene er knyttet til feltene med label. Videoens navn er den beskrivende tittelen, ikke «Panopto Embedded Video Player». |

## Svar Ja

| Krav | Grunnlag |
| --- | --- |
| 1.1.1 Ikke-tekstlig innhold | Etter publisering. Målikonene har målnavn i alternativteksten, også mål 12. |
| 1.3.1 Informasjon og relasjoner | Overskrifter, lister og landemerker er i DOM. Avkryssingsboksene i filteret har label. |
| 1.3.2 Meningsfylt rekkefølge | Leserekkefølgen følger kilden: topp, hovedinnhold, bunn. |
| 1.3.3 Sensoriske egenskaper | Instruksjonene som ble lest, bruker ikke bare form, farge eller plassering. |
| 1.3.4 Visningsretning | Ingen låst visningsretning. |
| 1.4.1 Bruk av farge | Valgt filter er en avkryssingsboks, ikke bare en farge. |
| 1.4.3 Kontrast (minimum) | axe fant ingen kontrastbrudd i mørkt tema på utvalget. Lyst tema er ikke skannet. |
| 1.4.4 Endring av tekststørrelse | Brødtekst er ekte tekst. 200 % zoom er ikke kjørt som eget forsøk. Forsiden og søkesiden holder seg innenfor 320 CSS-piksler. |
| 1.4.5 Bilder av tekst | Institusjonslogoene er unntatt. Målikonene er offisielle merker og har alternativtekst. |
| 1.4.10 Dynamisk tilpasning | `/` og `/sok` er 320 piksler brede ved 320 CSS-piksler. |
| 1.4.11 Kontrast for ikke-tekstlig innhold | axe fant ingen brudd på utvalget i mørkt tema. Fokusmarkør er ikke målt for seg. |
| 1.4.12 Tekstavstand | Eget tekstavstand-forsøk er ikke kjørt. Ingen fast høyde som klipper tekst ble sett på utvalget. |
| 1.4.13 Innhold ved peker eller fokus | Ingen innhold som bare vises ved peker eller fokus og som ikke kan lukkes. |
| 2.1.1 Tastatur | Søk, filter, meny og innholdslenker er vanlige kontroller og lenker. Ikke kjørt som egen tastaturgjennomgang utover det axe og koden viser. |
| 2.1.2 Ingen tastaturfelle | Ingen dialog som holder fokus inne. |
| 2.2.2 Pause, stopp, skjul | Video starter ikke av seg selv (`autoplay=false`). Ingen karusell. |
| 2.3.1 Terskelverdi for glimt | Ingen innhold som blinker mer enn tre ganger i sekundet. |
| 2.4.1 Hoppe over blokker | Etter publisering. Hoppelenken ligger først. |
| 2.4.2 Sidetitler | Etter publisering. Dokumenttitlene nevner tjenesten og siden. |
| 2.4.3 Fokusrekkefølge | Fokus går topp, innhold, bunn. |
| 2.4.4 Formål med lenke | Topplenker heter Søk, Hjelp, Om og Søkestrenger. Målikonene har alternativtekst. Trefflenkene heter «Forfattere og mer informasjon» og «Se hos utgiver». |
| 2.4.5 Flere måter | Toppmeny, søk og sidemeny på innholdssider. |
| 2.4.6 Overskrifter og ledetekster | Forsiden har overskrift med tjenestenavnet. Søkesiden har overskrift «Søk». Filtergruppene har legend. |
| 2.4.7 Synlig fokus | Ikke målt med fysisk tastatur. axe fant ingen brudd på utvalget. |
| 2.5.1 Pekerbevegelser | Ingen funksjon krever flerfinger- eller banegest. |
| 2.5.2 Pekeravbrytelse | Knapper og lenker aktiveres ved klikk-slipp, som vanlige HTML-kontroller. |
| 2.5.3 Ledetekst i navn | Etter publisering. «Vis flere» / «Show more» er både synlig tekst og navn. Søkefeltet heter «Søk» / «Search». |
| 3.1.1 Språk på siden | `html lang` er `no` på norske sider og `en` på `/en`. |
| 3.1.2 Språk på deler | Etter publisering. Kontrollene på norske sider har norske navn. |
| 3.2.1 Fokus | Fokus alene bytter ikke side. |
| 3.2.2 Inndata | Å skrive i søk bytter ikke kontekst før brukeren sender skjemaet. Avkryssing oppdaterer trefflisten på samme side. |
| 3.2.3 Konsekvent navigering | Søk, Hjelp, Om og Søkestrenger ligger likt. Bunnteksten med erklæringen ligger på forside og søk. Innholdssidene har sidemeny i stedet for bunntekst. |
| 3.2.4 Konsekvent identifikasjon | Søk heter «Søk» på norske sider og «Search» på engelske. |
| 3.3.1 Identifikasjon av feil | Etter publisering. Feilet søk vises som et varsel. |
| 3.3.2 Ledetekster eller instruksjoner | Etter publisering. Filterfeltene har synlig ledetekst som ikke forsvinner. |
| 4.1.1 Parsing | axe fant ingen oppdelingsfeil på utvalget. Full HTML-validering er ikke kjørt. |
| 4.1.2 Navn, rolle, verdi | Etter publisering. Filterfeltene har label, og videoen har en beskrivende tittel som navn. |
| 4.1.3 Statusmeldinger | Søket har et `aria-live`-område. På et tomt søk sto meldingen «Søker for "". Viser 1 til 20 resultat av totalt 10000 treff.» Skjermleser er ikke brukt, så den gamle observasjonen om at meldinger blir avbrutt er ikke testet på nytt. |

## Vi har ikke denne typen innhold

| Krav | Hvorfor |
| --- | --- |
| 1.2.1 Bare lyd og bare video | Ingen lydfiler og ingen stumme videoer. Veiledningen er film med lyd, og er registrert under 1.2.2 og 1.2.5. |
| 1.3.5 Identifiser formål med inndata | Ingen felt som samler inn personopplysninger som navn, e-post eller adresse. Søk og filter er ikke slike felt. |
| 1.4.2 Styring av lyd | Ingen lyd starter av seg selv. Video starter ikke automatisk. |
| 2.1.4 Hurtigtaster på ett tegn | Ingen snarveier som består av bare ett tegn. |
| 2.2.1 Justerbar hastighet | Ingen tidsgrense på økter eller innhold. |
| 2.5.4 Bevegelsesaktivering | Ingen funksjon styres av å bevege enheten. |
| 3.3.3 Forslag ved feil | Ingen skjema der en inndatafeil kan følges av et forslag. Databasesvikt er registrert under 3.3.1. |
| 3.3.4 Forhindring av feil | Ingen juridiske, økonomiske eller datamessige forpliktelser. |

## Det som var brudd i den gamle erklæringen

| Gammelt brudd | Nå |
| --- | --- |
| 1.3.5 Filterfelt mangler label | Feil krav. Feltene samler ikke inn personopplysninger. Samme felt er rettet under 3.3.2 og 4.1.2. |
| 1.4.13 Fokushopp på søkesiden | Ikke dette kravet. Kravet gjelder innhold som vises ved peker eller fokus. Ingen slikt innhold ble funnet. |
| 2.4.1 Mangler hopp til innhold | Rettet i denne versjonen. Hoppelenken ligger først. |
| 2.4.4 Lenketekst uten formål | Ikke gjenskapt. Topplenker og trefflenker har et formål. |
| 2.4.7 Svak fokusmarkering | Ikke målt på nytt. Ikke registrert som brudd i denne runden. |
| 2.5.3 Ikke testet godt nok | Rettet. Knappen heter «Vis flere» / «Show more». |
| 3.1.2 Engelske termer på norske sider | Rettet. Kontrollene har norske navn. |
| 3.3.1 Ingen feilmelding når databasen er nede | Rettet. Feilet søk vises som et varsel. |
| 4.1.3 Statusmeldinger blir avbrutt | Ikke gjenskapt i DOM. En hel statusmelding sto i `aria-live`. Skjermleser er ikke brukt. |

## Før erklæringen publiseres

Steg A, C, D og E fylles ut av Universitetet i Bergen i uustatus. Denne vurderingen dekker steg B. Lenken i bunnteksten peker allerede på den publiserte erklæringen, og samme URL gjelder etter at en oppdatert erklæring er produsert.

- Publiser denne versjonen før de åtte rettede kravene registreres som Ja. Den live løsningen har dem fortsatt som Nei.
- Bekreft teksting i Panopto hvis 1.2.2 skal endres til Ja. Synstolking (1.2.5) må legges inn i Panopto.
