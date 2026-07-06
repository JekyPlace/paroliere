# Paroliere

Paroliere is a React web app that displays a visual multilingual dictionary starting from a CSV file.

The app reads `src/data/words.csv`, converts it in memory into a list of JavaScript objects with a JSON-like structure, and uses that data to populate:

- the word grid;
- the category filter;
- the alphabetical sidebar navigation;
- each word detail modal;
- images and audio files associated with the translations.

## Stack

- React 19
- Vite
- React Router
- Zustand
- PapaParse
- Sass/SCSS
- ESLint

## Data Flow

The source of truth is the CSV file:

```csv
Italiano,Descrizione breve,Inglese,Cinese moderno,Arabo moderno,Rumeno,Ucraino,Albanese,Immagine,Categoria
libro,Insieme di pagine rilegate usato per leggere e studiare.,book,书,كتاب,carte,книга,libër,libro.png,Scuola
```

The file is imported as raw text in `src/store/wordsStore.js`:

```js
import wordsCSV from "@/data/words.csv?raw";

const initialWords = parseCSV(wordsCSV);
```

The conversion is handled by `src/utils/parseCSV.js` using PapaParse:

```js
Papa.parse(csvFile, {
  header: true,
  skipEmptyLines: true,
});
```

With `header: true`, each CSV row becomes an object:

```js
{
  Italiano: "libro",
  "Descrizione breve": "Insieme di pagine rilegate usato per leggere e studiare.",
  Inglese: "book",
  "Cinese moderno": "书",
  "Arabo moderno": "كتاب",
  Rumeno: "carte",
  Ucraino: "книга",
  Albanese: "libër",
  Immagine: "libro.png",
  Categoria: "Scuola"
}
```

These objects are stored in Zustand and then consumed by the app components.

## CSV Fields

| Field | How it is used |
| --- | --- |
| `Italiano` | Main word label. Used in the card, detail modal, alphabetical sorting, and `/word/:word` URL. |
| `Descrizione breve` | Short description shown in the detail modal. |
| `Inglese`, `Cinese moderno`, `Arabo moderno`, `Rumeno`, `Ucraino`, `Albanese` | Translations shown in the modal. Every non-excluded column is automatically treated as a language. |
| `Immagine` | Image filename loaded from `public/words/`. |
| `Categoria` | Category used by the filter menu. |

## Language Handling

The modal does not use a hardcoded list of languages.

In `src/components/containers/Modal/Modal.jsx`, only these columns are excluded:

```js
const excluded = ["Descrizione breve", "Italiano", "Immagine", "Categoria"];
```

Every other CSV column is treated as a translation and displayed in the detail modal.

This means that adding a new language only requires adding a new column to the CSV, for example:

```csv
Italiano,Descrizione breve,Inglese,Francese,Immagine,Categoria
libro,Insieme di pagine rilegate usato per leggere e studiare.,book,livre,libro.png,Scuola
```

Important: to make audio playback work for the new language, the MP3 file must follow the naming convention described below.

## Images

Images are loaded from:

```txt
public/words/
```

The value of the `Immagine` field must match the image filename:

```csv
Italiano,Immagine
libro,libro.png
```

In `WordCard` and in the modal, the path is built like this:

```js
publicPath(`words/${word.Immagine}`)
```

## Audio

Audio files are loaded from:

```txt
public/audio/
```

The filename is generated in `src/utils/parseMP3.js`:

```js
`${lang.toLowerCase().replace(" ", "_")}/${lang.toLowerCase().substring(0, 3)}_${word.toLowerCase()}.mp3`
```

Example for the word `libro` in `Inglese`:

```txt
public/audio/inglese/ing_libro.mp3
```

Example for `Cinese moderno`:

```txt
public/audio/cinese_moderno/cin_libro.mp3
```

If the audio file does not exist or cannot be played, the app shows an error popup.

## Main Features

- Alphabetically sorted word list.
- Alphabetical sidebar with active letters only when matching words exist.
- Automatic scroll to the selected letter.
- Category filter through the query string, for example `?category=Scuola`.
- Word detail modal opened through a URL, for example `/word/libro`.
- Audio playback for each available translation.
- Basic audio error handling through a popup.
- Support for a custom base path when deployed outside the domain root.

## Routing

Routes are defined in `src/router/Router.jsx`:

```js
[
  { path: "/", Component: Home },
  { path: "/word/:word", Component: Home },
]
```

The modal is opened by navigating to:

```txt
/word/:word
```

The selected category remains in the query string, so a valid URL can be:

```txt
/word/libro?category=Scuola
```

## Project Structure

```txt
src/
  data/
    words.csv
  store/
    wordsStore.js
    errorStore.js
  hooks/
    useCategoryFilter.js
    useModal.jsx
    useAudioPlayer.js
    useManipulateLetters.jsx
  utils/
    parseCSV.js
    parseMP3.js
    publicPath.js
    getFirstLetters.js
    getFirstAvailableLetter.js
  components/
    containers/
      Header/
      Sidebar/
      MainContent/
      Categories/
      Modal/
      Popup/
    ui/
      buttons/
      cards/
      icons/
```

## Commands

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Create a staging build:

```bash
npm run build:staging
```

Run linting:

```bash
npm run lint
```

Preview the build:

```bash
npm run preview
```

## Deployment and Base Path

The base path is configured in `vite.config.js`.

If `VITE_APP_ENVIRONMENT` is `staging`, the build uses:

```txt
/mondadori/paroliere/
```

Otherwise it uses `VITE_BASE_PATH`, if present, or `/`.

This matters because images and audio files are resolved through `import.meta.env.BASE_URL`.

## Adding a New Word

1. Add a new row to `src/data/words.csv`.
2. Fill at least `Italiano`, `Descrizione breve`, `Immagine`, and `Categoria`.
3. Add the image file to `public/words/`.
4. Add audio files to `public/audio/<language>/` following the naming convention.
5. Run `npm run dev` and check the card, filter, modal, and audio playback.

Example:

```csv
penna,Strumento usato per scrivere.,pen,笔,قلم,pix,ручка,stilolaps,penna.png,Scuola
```

Required image:

```txt
public/words/penna.png
```

Required English audio:

```txt
public/audio/inglese/ing_penna.mp3
```

## Technical Notes

- The CSV must keep the exact headers used by the code.
- Words are searched through `Italiano`, ignoring letter casing.
- Alphabetical sorting is based on the `Italiano` field.
- Categories are dynamically derived from the CSV data.
- Sidebar letters are based on the English `a-z` alphabet.
- If a word starts with an uppercase or accented letter, the data may need normalization or the first-letter extraction logic may need to be updated.
