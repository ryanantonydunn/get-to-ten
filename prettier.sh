#!/bin/bash

npm i --save-dev babel-eslint eslint prettier eslint-plugin-prettier eslint-config-prettier eslint-plugin-react

mkdir .vscode
touch .vscode/settings.json
touch .eslintrc

echo '{
  "eslint.autoFixOnSave": true
}' > .vscode/settings.json
echo '{
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "allowImportExportEverywhere": true,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "ecmaVersion": 6
    }
  },
  "plugins": ["react"],
  "extends": [
    "plugin:prettier/recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "import/first": 0,
    "react/prop-types": 0,
    "react/display-name": 0,
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2,
    "react/react-in-jsx-scope": 2,
    "no-unused-vars" : [1, {"args" : "none"}]
  }
}' >  .eslintrc