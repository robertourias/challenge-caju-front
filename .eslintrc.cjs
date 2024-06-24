module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['~', './src'], // Define a resolução de caminho do til para a pasta src 
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Adiciona as extensões de arquivo suportadas
      },
    },
  },
  ignorePatterns: ["node_modules/"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/react-in-jsx-scope": "off",
    "import/no-named-as-default": 0,
    "import/no-unresolved": ["error", { "ignore": ["^@/"] }],
    "react/display-name": "off",
    "@typescript-eslint/ban-types": "off",
    "import/named": "off",
    "react-hooks/exhaustive-deps": "warn"
  },
};
