# psl-workshop-protractor

## Steps

### Tabla de Contenido

1. [Configuración Inicial del Proyecto](#section-links)
1. Mejorando el primer caso de prueba
1. Migrando a TypeScript
1. Agregando Reporte a la Consola
1. Desactivar el manejador de promesas y Selenium server
1. Chrome Headless
1. Agregar Integración Continua
1. Agregando Análisis de Código Estático
1. CSS Selector
1. Page Object Model
1. Esperas de Carga de Página y de Jasmine
1. Esperas Implicitas
1. Esperas Explicitas
1. Mejorando los Locator
1. Separar prueba en diferentes describes
1. Agregando Jasmine-awesome
1. Utilizando Capabilities para configurar Chrome
1. Listas de Elementos, filtros y elementos dentro de elementos
1. Más Locators
1. Ejecución de Código Javascript
1. Trabajando con IFrames
1. Subiendo un Archivo
1. Descargando Archivos
1. Configurar Saucelabs
1. Probar con diferentes navegadores

### 1. Configuración Inicial del Proyecto

**Descripción**: Se configurará inicialmente el proyecto con javascript y se hará una prueba sobre la página de google

1. Crear un repositorio en GitHub con el nombre de “**protractor-workshop-2017**”
1. Seguir las instrucciones para realizar el primer commit
1. En la configuración del repositorio de GitHub en la opción Branches proteja la rama Master indicando que los PR requieran revisión antes de mergear y que requiera la comprobación del estado antes de hacer merge
1. Dentro del menú colaboradores agregar a:
   * [aperdomobo](https://github.com/aperdomob)
   * [germandavid85](https://github.com/germandavid85)
   * [jhenaoz](https://github.com/jhenaoz)
   * [luigisamurai](https://github.com/luigisamurai)
1. [Instalar NodeJS](https://nodejs.org/es/download/package-manager/) en su equipo si no lo tiene instalado
1. Crear una rama **project-setup** en el repositorio
1. Ejecutar en una consola `npm init` dentro de la ruta donde se encuentra el repositorio y colocar la siguiente información:

   | Parametro          | Valor |
   | ------------------ | ---------- |
   | **Name**           | _[Por Defecto]_                               |
   | **Version**        | _[Por Defecto]_                               |
   | **Description**    | This is a Workshop about Protractor           |
   | **Entry Point**    | _[Por Defecto]_                               |
   | **Test Command**   | `protractor protractor.config.js`             |
   | **Git Repository** | _[Por Defecto]_                               |
   | **Keywords**       | ui-testing, dojo, practice, protractor        |
   | **Author**         | _[Su nombre]_ <_[Su correo]_> (_[su github]_) |
   | **License**        | MIT                                           |

1. Instalar la dependencia de protractor
  `npm install --save protractor`

1. Crear en la raíz del proyecto el archivo **protractor.config.js** y agregar la siguiente información
   ``` js
   exports.config = {
     framework: 'jasmine',
     seleniumAddress: 'http://localhost:4444/wd/hub',
     specs: ['test/spec.js']
   }
   ```

1. Actualizar los drivers con el comando
   ``` bash
   ./node_modules/protractor/bin/webdriver-manager update
   ```

1. En una segunda consola ejecutar
   ``` bash
   ./node_modules/protractor/bin/webdriver-manager start
   ```

1. Crear la carpeta **test** y dentro de la carpeta crear el archivo **spec.js**
   ``` js
   describe('This is the first example of protractor', () => {
     it('should have a title', () => {
       browser.ignoreSynchronization = true;
       browser.get('http://www.google.com');
       expect(browser.getTitle()).toEqual('Google');
     });
   });
   ```

1. Ejecutar el comando `npm test` y comprobar que la prueba pasa de forma satisfactoria
1. Crear el archivo **.gitignore** en la raíz del proyecto. Ingresar a la página <https://www.gitignore.io/> y en el área de texto  agregar el _sistema operativo_, _IDE's_ y _NodeJS_, ejemplo _OSX Node VisualStudioCode_. Genere el archivo y cópielo dentro del archivo **.gitignore**
1. Crear el archivo **LICENSE** en la raíz del proyecto con lo especificado en <https://en.wikipedia.org/wiki/MIT_License> (_Tenga en cuanta cambiar el año y el copyright holders_)
1. Realizar un commit donde incluya los 5 archivos modificados con el mensaje “setup protractor configuration” y subir los cambios al repositorio
1. Crear un PR y esperar por la aprobación o comentarios de los revisores
1. Una vez aprobado realizar el merge a master seleccionando la opción “squash and merge”

### Mejorando el primer caso de prueba

**Descripción**: Se utilizará el método `onPrepare` para configurar la información que debería ser igual en todas las pruebas, adicionalmente se utilizará el `beforeEach` para organizar la prueba de forma más legible

1. Crear la rama **improve-test** a partir de master
1. Modificar el **protractor.conf.js** agregando lo siguiente
    ``` js
    exports.config = {
      framework: 'jasmine',
      seleniumAddress: 'http://localhost:4444/wd/hub',
      specs: ['test/spec.js'],
      onPrepare: () => {
        browser.ignoreSynchronization = true;
      }
    }
    ```
1. En el **protractor.conf.js** cambiar el valor de spec por **test/Google.spec.js**
1. Cambiar de nombre el archivo **spec.js** por **Google.spec.js**
1. Cambiar el contenido del archivo **Google.spec.js** por
    ``` js
    describe('Given a SDET learning protractor', () => {
      describe('when open Google Page', () => {
        beforeEach(() => {
          browser.get('http://www.google.com');
        });

        it('then should have a title', () => {
          expect(browser.getTitle()).toEqual('Google');
        });
      });
    });
    ```
1. Ejecutar `npm test` y verificar la correcta ejecución de la prueba
1. Subir los cambios a Github
1. Crear un PR y esperar por la aprobación o comentarios de los revisores
1. Una vez aprobado realizar el merge a master seleccionando la opción “squash and merge”
1. Eliminar la rama una vez mergeada

### 3. Migrando a TypeScript

**Descripción**: Angular ha hecho un gran esfuerzo por hacer funcionar sus framework mucho mejor en typescript, y protractor no es la excepción, en esta sesión se migrará el proyecto que se tiene al uso de typescript

1. Instalar las dependencias de desarrollo **@types/jasminewd2** typescript
    `npm install --save-dev @types/jasminewd2 typescript`
1. Crear el archivo **tsconfig.json** en la raíz del proyecto con el siguiente contenido
    ``` json
    {
      "compilerOptions": {
        "target": "es6",
        "sourceMap": true,
        "outDir": "dist",
        "module": "commonjs",
        "moduleResolution": "node",
        "noUnusedParameters": true,
        "noUnusedLocals": true
      }
    }
    ```
1. Cambiar el nombre del archivo **Google.spec.js** por **Google.spec.ts** y agregar en la siguiente primera línea (La segunda línea debe ser un salto de línea para separar los imports de los describe)
    ```ts
    import { browser } from 'protractor';
    ```
1. Cambiar de nombre el archivo **protractor.config.js** por **config.ts** y moverlo dentro de una carpeta llamada **protractor** que debe ser creada en la raíz del proyecto
1. Cambiar todo el archivo por el siguiente:
    ``` ts
    import { browser, Config } from 'protractor';

    export const config: Config = {
      framework: 'jasmine',
      seleniumAddress: 'http://localhost:4444/wd/hub',
      specs: ['../test/Google.spec.js'],
      noGlobals: true,
      onPrepare: () => {
        browser.ignoreSynchronization = true;
      }
    }
    ```
1. Modificar los scripts del package.json para que tengan el siguiente contenido:
    ``` json
    "clean": "rm -rf dist",
   "prebuild": "npm run clean",
   "build": "tsc",
   "test": "npm run build && protractor dist/protractor/config.js"
    ```
1. Agregar las siguientes líneas en el **.gitignore**
    ``` bash
    ## Typescript
    dist
    ```

### 4. Agregando Reporte a la Consola

**Descripción**: Es necesario poder ver los resultados de una forma entendible en la consola, en esta sesión se configura un reporte de consola.

1. Instale la dependencia de desarrollo **jasmine-spec-reporter**
1. Crear la carpeta **protractor/helpers** y dentro de la carpeta el archivo **reporter.ts** con el siguiente contenido
    ```ts
    import { DisplayProcessor, SpecReporter } from "jasmine-spec-reporter";

    export let reporter = () => {
      jasmine.getEnv().addReporter(new SpecReporter({
        customProcessors: [DisplayProcessor],
      }));
    };
    ```
1. Modifique el **conf.ts** incluyendo el `import` del `reporter` y dentro del `onPrepare` llamar al método reporter
    ``` ts
    import { reporter }   from './helpers/reporter';
    reporter();
    ```
1. Solicite la revisión de código tal como se hizo en el punto anterior. Dentro de la descripción del PR incluya una imagen con el resultado de la ejecución, así como muestra a continuación
