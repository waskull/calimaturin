Proyecto realizado con [**React Native**](https://reactnative.dev) generado mediante la herramienta React-Native CLI [`@react-native-community/cli`](https://github.com/react-native-community/cli).



## Paso 1: Iniciar Metro

Primero debes iniciar **Metro** con el comando 'npm start'

Y luego presionar a para buildear la aplicacion en modo desarrollo

```bash
# Inicio mediante npm
npm start

# O mediante Yarn
yarn start
```
## Para buildear el apk final deben situarse en la carpeta android y utilizar el siguente comando en el cmd:

```bash

gradlew AssembleRelease

# O tambien mediante:
./gradlew AssembleRelease


```