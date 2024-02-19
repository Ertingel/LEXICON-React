# LEXICON-Vite

Detta är min repository för LEXICON läxor.

Instruktioner för varje uppgift kan hittas [här](https://github.com/Ertingel/LEXICON-Vite/tree/main/Instruktioner).

---

-   Vecka 7- _(HTML, CSS & Javascript)_
    -   [**HTML & CSS & Javascript**](https://github.com/Ertingel/LEXICON/): Gamla repo för _HTML, CSS & Javascript_
-   Vecka 8 _(Vite/React)_
    -   **Uppgift33**: React Caffe Retro
    -   **Uppgift34**: React Media player
    -   **Uppgift35**: React Todo list
    -   **Uppgift36**: React Movie cards

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
	// other rules...
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./tsconfig.node.json"],
		tsconfigRootDir: __dirname,
	},
}
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
