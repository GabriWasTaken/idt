import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      title: "Welcome to Pokemon App",
      detail: "Pokemon detail",
      pokedex_number: "Pokedex number: ",
      pokemon_height: "Pokemon height: ",
      pokemon_weight: "Pokemon weight: ",
      types: "Types: ",
      stats: "Stats: ",
    },
  },
  it: {
    translation: {
      title: "Benvenuto nella Pokemon App",
      detail: "Dettaglio del pokemon",
      pokedex_number: "Numero di pokedex: ",
      pokemon_height: "Altezza del pokemon: ",
      pokemon_weight: "Peso del pokemon: ",
      types: "Tipi: ",
      stats: "Statistiche: ",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
