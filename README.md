# Workshop Protractor

!Bienvenido! El objetivo de este taller es aprender a automatizar pruebas de interfaz gráfica (UI) usando [Protractor](https://www.protractortest.org/#/). Mediante el desarrollo de varios ejercicios prácticos, se abarcará diferentes temas para desarrollar un proyecto de automatización. Durante el desarrollo de los ejercicios, se explicará cómo preparar un proyecto para un proceso de integración continúa con [Travis CI](https://travis-ci.com/), cómo usar [SauceLabs](https://saucelabs.com/) como plataforma de pruebas en la nube, el uso de [Zalenium](https://github.com/zalando/zalenium) para orquestar pruebas (tanto local como en la nube), y el uso de [Github](https://github.com/) y [Gitflow](https://guides.github.com/introduction/flow/) para la entrega de un producto de software.

Se asume que la persona tiene conocimientos previos en:

* Git (Puede seguir este [enlace](https://services.github.com/on-demand/downloads/es_ES/github-git-cheat-sheet/) con los comandos más utilizados en git)
* GitHub

**Recursos**:

* [Wiki](https://github.com/AgileTestingColombia/workshop-protractor/wiki)
* [Guide](https://agiletestingcolombia.gitbook.io/workshops/)
* [FAQ](https://agiletestingcolombia.gitbook.io/workshops/faq)

## Steps

### Tabla de Contenido

1. [Configuración Inicial del Proyecto](#1-configuración-inicial-del-proyecto)
1. [Mejorando el primer caso de prueba](#2-mejorando-el-primer-caso-de-prueba)
1. [Agregando Reporte a la Consola](#3-agregando-reporte-a-la-consola)
1. [Desactivar el manejador de promesas y Selenium server](#4-desactivar-el-manejador-de-promesas-y-selenium-server)
1. [Chrome Headless](#5-chrome-headless)
1. [Agregar Integración Continua](#6-agregar-integración-continua)
1. [Agregando Análisis de Código Estático](#7-agregando-análisis-de-código-estático)
1. [Depurando El Código](#8-depurando-el-código)
1. [CSS Selector](#9-css-selector)
1. [Page Object Model](#10-page-object-model)
1. [Esperas de Carga de Página y de Jasmine](#11-esperas-de-carga-de-página-y-de-jasmine)
1. [Esperas Implicitas](#12-esperas-implicitas)
1. [Esperas Explicitas](#13-esperas-explicitas)
1. [Mejorando los Locator](#14-mejorando-los-locator)
1. [Separar prueba en diferentes describes](#15-separar-prueba-en-diferentes-describes)
1. [Agregando Jasmine Awesome](#16-agregando-jasmine-awesome)
1. [Utilizando Capabilities para configurar Chrome](#17-utilizando-capabilities-para-configurar-chrome)
1. [Listas de Elementos, filtros y elementos dentro de elementos](#18-listas-de-elementos-filtros-y-elementos-dentro-de-elementos)
1. [Más Locators](#19-más-locators)
1. [Ejecución de Código Javascript](#20-ejecución-de-código-javascript)
1. [Trabajando con IFrames](#21-trabajando-con-iframes)
1. [Subiendo un Archivo](#22-subiendo-un-archivo)
1. [Descargando Archivos](#23-descargando-archivos)
1. [Configurar Saucelabs](#24-configurar-saucelabs)
1. [Probar con diferentes navegadores](#25-probar-con-diferentes-navegadores)
1. [Zalenium](#26-zalenium)

### 1. Configuración Inicial del Proyecto

**Descripción**: Se configurará inicialmente el proyecto con [TypeScript](https://www.typescriptlang.org/) y se hará una prueba sobre la página de [Google](https://www.google.com/). Adicionalmente se creará la configuración necesaria básica para un repositorio de [Github](https://help.github.com/)

**Nota:** Si no tiene conocimiento sobre Github se le recomienda realizar las [Guias de Github](https://guides.github.com/activities/hello-world/) o el lab de [Introduction to Github](https://lab.github.com/githubtraining/introduction-to-github)

1. Crear una cuenta en Github si no la tiene.
1. Crear un repositorio en limpio dentro de la página de GitHub con el nombre de “**protractor-workshop**”
1. Crear una carpeta en su computador llamada `protractor-workshop` y ubicarse en ella en una consola
1. Seguir las instrucciones para realizar el primer commit (use las que aparece en lá página de github)

    ``` shell
    echo "# protractor-workshop" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git remote add origin git@github.com:<su-usuario>/protractor-workshop.git
    git push -u origin main
    ```

1. En la configuración del repositorio de GitHub en la opción Branches proteja la rama Master indicando que los PR requieran revisión antes de mergear y que requiera la comprobación del estado antes de hacer merge
1. Dentro del menú colaboradores agregar a:
   * [leonleo997](https://github.com/leonleo997)
   * [holgiosalos](https://github.com/holgiosalos)

1. [Instalar JDK](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html) en su equipo si no lo tiene instalado
1. [Instalar NodeJS](https://nodejs.org/es/download/package-manager/) en su equipo si no lo tiene instalado.
1. Crear una rama **project-setup** en el repositorio

    ``` bash
    git checkout -b project-setup
    ```

1. Crear el archivo .editorconfig a raíz del proyecto con la siguiente información

    ```properties
    root = true

    [*]
    indent_style = space
    end_of_line = lf
    charset = utf-8
    trim_trailing_whitespace = true
    insert_final_newline = true
    indent_size = 2

    [*.md]
    indent_size = 4
    trim_trailing_whitespace = false
    ```

1. Instalar la extensión de Visual Studio Code `EditorConfig for VS Code` (Generalmente requiere reinicio del IDE)
1. Ejecutar en una consola `npm init` dentro de la ruta donde se encuentra el repositorio y colocar la siguiente información:

   | Parametro          | Valor |
   | ------------------ | ---------- |
   | **Name**           | workshop-protractor                           |
   | **Version**        | _[Por Defecto]_                               |
   | **Description**    | This is a Workshop about Protractor           |
   | **Entry Point**    | _[Por Defecto]_                               |
   | **Test Command**   | `protractor dist/protractor/local.config.js`  |
   | **Git Repository** | _[Por Defecto]_                               |
   | **Keywords**       | ui-testing, protractor                        |
   | **Author**         | _[Su nombre]_ <_[Su correo]_> (_[su github]_) |
   | **License**        | MIT                                           |

1. Instalar la dependencia de protractor
  `npm install --save-dev protractor`

1. Instalar las dependencias de desarrollo de typescript
  `npm i --save-dev typescript`

1. Instalar los types de NodeJS
`npm install --save-dev @types/node`

1. Instalar los types de Jasmines
  `npm install --save-dev @types/jasminewd2`

1. Crear en la raíz del proyecto la carpeta **protractor** y dentro de ella el archivo  **local.config.ts** y agregar la siguiente información

    ``` ts
    import { Config } from 'protractor';

    export const config: Config = {
      framework: 'jasmine',
      specs: [ '../test/google.spec.js' ],
      seleniumAddress: 'http://localhost:4444/wd/hub'
    };
    ```

1. Actualizar los drivers con el comando

   ``` bash
   npx webdriver-manager update
   ```

1. En la consola ejecutar

   ``` bash
   npx webdriver-manager start
   ```

1. Crear la carpeta **test** en la raíz del proyecto y dentro de la carpeta crear el archivo **google.spec.ts**

   ``` ts
   import { browser } from 'protractor';

   describe('This is the first example of protractor', () => {
     it('should have a title', () => {
         browser.driver.get('http://www.google.com');
         expect(browser.driver.getTitle()).toEqual('Google');
     });
   });
   ```

1. Crear el archivo **tsconfig.json** en la raíz del proyecto con el siguiente contenido

    ``` json
    {
        "compilerOptions": {
            "outDir": "dist",
            "sourceMap": true,
            "mapRoot": "dist",
            "noUnusedLocals": true
        }
    }
    ```

1. Modificar los scripts del package.json para que tengan el siguiente contenido:

    ``` json
    "clean": "rm -rf dist",
    "build": "npm run clean && tsc",
    "test": "npm run build && protractor dist/protractor/local.config.js"
    ```

1. Ejecutar el comando en una segunda consola `npm test` y comprobar que la prueba pasa de forma satisfactoria
1. Crear el archivo **.gitignore** en la raíz del proyecto. Ingresar a la página <https://www.gitignore.io/> y en el área de texto  agregar el _sistema operativo_, _IDE's_ y _NodeJS_, ejemplo _OSX Node VisualStudioCode_. Genere el archivo y cópielo dentro del archivo **.gitignore**
1. Agregar al final del **.gitignore** las siguientes líneas

    ``` bash
    # Typescript
    dist
    ```

1. Crear el archivo **LICENSE** en la raíz del proyecto con lo especificado en <https://en.wikipedia.org/wiki/MIT_License> (_Tenga en cuanta cambiar el año y el copyright holders_)
1. Crear la carpeta a nivel de raíz llamada **.github** y dentro de ella crear el archivo **CODEOWNERS** con el siguiente contenido

    ``` bash
    * @aperdomob @leonleo997 @holgiosalos
    ```

1. Realizar un commit donde incluya los 8 archivos modificados con el mensaje “setup protractor configuration” y subir los cambios al repositorio

    ```bash
    git add .
    git commit -m "setup protractor configuration"
    git push origin project-setup
    ```

1. Crear un PR, asignarle los revisores y esperar por la aprobación o comentarios de los revisores. Si no sabe como realizarlo siga las siguientes [instrucciones](https://help.github.com/articles/creating-a-pull-request/)
1. Una vez aprobado realizar el merge a master seleccionando la opción “squash and merge”

### 2. Mejorando el primer caso de prueba

**Descripción**: Se utilizará el método `onPrepare` para configurar la información que debería ser igual en todas las pruebas, adicionalmente se utilizará el `beforeEach` para organizar la prueba de forma más legible

1. Crear la rama **improve-test** a partir de master
1. Cambiar el contenido del archivo **google.spec.ts** por

    ``` ts
    import { browser } from 'protractor';

    describe('Given a SDET learning protractor', () => {
      describe('when open Google Page', () => {
        beforeEach(() => {
          browser.driver.get('http://www.google.com');
        });

        it('then should have a title', () => {
          expect(browser.driver.getTitle()).toEqual('Google');
        });
      });
    });

    ```

1. Ejecutar `npm test` y verificar la correcta ejecución de la prueba
1. Subir los cambios a Github
1. Crear un PR, asignar los revisores y esperar por la aprobación o comentarios de los revisores.
1. Una vez aprobado realizar el merge a master seleccionando la opción “squash and merge”
1. Eliminar la rama una vez mergeada

### 3. Agregando Reporte a la Consola

**Descripción**: Es necesario poder ver los resultados de una forma entendible en la consola, en esta sesión se configura un reporte de consola.

1. Instale la dependencia de desarrollo **jasmine-spec-reporter**
   `npm install -D jasmine-spec-reporter`
1. Crear la carpeta **protractor/helpers** y dentro de la carpeta el archivo **reporter.ts** con el siguiente contenido

    ```ts
    import { SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
    export let reporter = () => {
      jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
          displayStacktrace: StacktraceOption.PRETTY,
          displayDuration: true
        }
      }));
    };
    ```

1. Modifique el archivo **local.config.ts** incluyendo el `import` del `reporter`

    ``` ts
    import { reporter } from './helpers/reporter';
    ```

1. Modificar el protractor/local.config.ts agregando la propiedad `onPrepare` con el siguiente contenido:

      ``` ts
      onPrepare: () => {
        reporter();
      }
      ```

1. Solicite la revisión de código tal como se hizo en el punto anterior. Dentro de la descripción del PR incluya una imagen con el resultado de la ejecución, así como muestra a continuación

   ![Console result](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image4.png)

### 4. Desactivar el manejador de promesas y Selenium server

**Descripción**: En el [issue](https://github.com/SeleniumHQ/selenium/issues/2969) WebDriverJS recomienda dejar de utilizar la implentación propia de promesas personalizadas de Selenium que ha trabajado desde sus inicios, aunque hoy en día aún hay soporte es necesario empezar a trabajar de la forma que recomienda Protractor

1. Eliminar la propiedad `seleniumAddress` del **local.config.ts**
1. Termine el proceso del `npx webdriver-manager start` (ya no es necesario)
1. Agregar la propiedad `SELENIUM_PROMISE_MANAGER` con el valor `false` en el **local.config.ts**
1. Modificar el archivo de **google.spec.ts** para que trabaje con **async/await**

    ``` ts
    import { browser } from 'protractor';

    describe('Given a SDET learning protractor', () => {
      describe('when open Google Page', () => {
        beforeEach(async () => {
          await browser.driver.get('http://www.google.com');
        });

        it('then should have a title', async () => {
          expect(await browser.driver.getTitle()).toEqual('Google');
        });
      });
    });
    ```

1. Solicite la revisión de código tal como se hizo en el punto anterior

### 5. Chrome Headless

**Descripción**: Muchas veces no contamos con servidores de integración continua que tengan acceso a máquinas con interfaz gráfica. Existen algunos navegadores que tienen versión headless que funcionan sin interfaz gráfica pero se comportan muy similar a los navegadores comunes. En esta sesión vamos a configurar la versión headless de chrome

1. Duplicar el archivo **local.config.ts** con el nombre de **headless.config.ts**
1. Agregar la propiedad de capabilities en el nuevo archivo con la siguiente información

    ``` ts
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--disable-gpu']
      }
    }
    ```

1. Duplicar el script **test** del **package.json** con el nombre de **test:headless** y cambia la ruta de ejecución al archivo **headless.conf.js**
1. Cambia el nombre del script **test** por **test:local**
1. Ejecuta tanto el comando `npm run test:local` como el `npm run test:headless` para comprobar que ejecuta efectivamente
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 6. Agregar Integración Continua

**Descripción**: La integración continua es una práctica requerida hoy en día, en esta sesión configuraremos travis para ejecutar nuestra integración continua

1. Crear el archivo **.nvmrc** en la raíz del proyecto con el contenido `v15.3.0`
1. Crear el archivo **.travis.yml** en la raíz del proyecto
1. Agregar el siguiente contenido

    ``` yml
    dist: xenial
    addons:
      chrome: stable
    language: node_js
    install:
      - npm ci
      - npm run webdriver:update
    cache:
      directories:
        - "node_modules"
    ```

1. Habilitar Travis en el repositorio <https://docs.travis-ci.com/user/getting-started/>
1. Modificar los scripts de **package.json** agregando `"test": "npm run test:headless"`
1. Agregar el script `"webdriver:update"` con el valor `"webdriver-manager update --gecko false"`
1. Subir los cambios a github (no cree aún el PR)
1. Ir a la url de [Configuración de Travis](https://travis-ci.com/account/repositories)
1. Habilite la configuración GitHub Apps
1. Cree un PR
1. Verificar que la ejecución en Travis termine correctamente

### 7. Agregando Análisis de Código Estático

**Descripción**: El análisis de código estático nos ayuda a estandarizar la forma en como escribimos código, en esta sesión configuraremos tslint con airbnb para tener análisis de código estático

1. Agregar las dependencias de desarrollo **tslint** y **tslint-config-airbnb**
1. Crear el archivo **tslint.json** en la raíz con la siguientes información

    ``` json
    {
      "defaultSeverity": "error",
      "extends": [
        "tslint-config-airbnb"
      ],
      "rules": {
        "trailing-comma": [true]
      }
    }
    ```

1. Agregar el script de **package.json** lint
    `"lint": "tslint --project tsconfig.json protractor/**/*.ts test/**/*.ts src/**/*.ts"`
1. Corregir las reglas de forma automática `npm run lint -- --fix`
1. Las reglas que no se puedan corregir automáticamente investigue y corrijalas. Ejecute el comando `npm run lint` para verificar que reglas esta rompiendo
1. Modifique el script de `build` del `package.json` agregandole al principio `npm run lint &&`
1. Solicite la revisión de código tal como se hizo en el punto anterior

**NOTA:** se recomienda instalar la extensión `TSLint` de vs code

### 8. Depurando El Código

**Descripción**: La depuración nos ayudará a identificar y corregir las parte del código que estén presentando fallas, así como poder tener una mayor entendimiento de las valores de las variables en tiempo de ejecución. Para activar el debugger en `vs code`:

1. Vaya a la vista de `Debug` (⇧⌘D -  mac / )
1. Haga click en el ícono del engranaje y seleccione `Node.js`. Estor creará el archivo `.vscode/launch.json`
1. Reemplace el contenido del archivo por la siguiente información

    ``` json
    {
      // Use IntelliSense to learn about possible attributes.
      // Hover to view descriptions of existing attributes.
      // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
      "version": "0.2.0",
      "configurations": [
        {
          "type": "node",
          "request": "launch",
          "name": "Debug tests",
          "program": "${workspaceRoot}/node_modules/protractor/bin/protractor",
          "args": ["${workspaceRoot}/dist/protractor/local.config.js"],
          "preLaunchTask": "npm: build",
          "sourceMaps": true,
          "smartStep": true,
          "internalConsoleOptions": "openOnSessionStart",
          "outFiles": [
              "${workspaceFolder}/dist/**/*.js"
          ]
        },
        {
          "type": "node",
          "request": "launch",
          "name": "Debug headless tests",
          "program": "${workspaceRoot}/node_modules/protractor/bin/protractor",
          "args": ["${workspaceRoot}/dist/protractor/headless.config.js"],
          "preLaunchTask": "npm: build",
          "sourceMaps": true,
          "smartStep": true,
          "internalConsoleOptions": "openOnSessionStart",
          "outFiles": [
              "${workspaceFolder}/dist/**/*.js"
          ]
        }
      ]
    }
    ```

1. Compruebe que puede lanzar las pruebas y depurarlas utilzando `vs code`
1. Envíe un pull request con una captura de pantalla en la que se identifique fue posible hacer depuración del test `google.spec.ts`
1. Solicite la revisión de código tal como se hizo en el punto anterior

Sobre las [opciones de depuración de node](https://code.visualstudio.com/docs/nodejs/nodejs-debugging):

* *program* - ejecutable de entrada del depurador
* *args* - ruta al config del protractor en el directorio `dist`
* *preLaunchTask* -  ejecuta la tarea
* *sourceMaps* - utiliza los source maps del directorio `dist`
* *smartStep* - omite código **no interesante** que se genera en el proceso de transpilación
* *internalConsoleOptions* - abre la terminal del depuración
* *outFiles* - ruta dónde están los archivos `sourceMap`

### 9. CSS Selector

**Descripción**: Los css selector son los selectores más utilizados por los desarrolladores, tener un buen dominio de ellos facilita la automatización de pruebas. En esta sesión se implementará un primer caso de pruebas con css selectores

1. Crear el archivo **buy-tshirt.spec.ts** dentro de la carpeta **test**
1. Escribir dentro del archivo el siguiente contenido

    ``` ts
    import { $, browser } from 'protractor';

    describe('Buy a t-shirt', () => {
      beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000;
      });

      it('then should be bought a t-shirt', async () => {
        await browser.get('http://automationpractice.com/');
        await(browser.sleep(10000));
        await $('#block_top_menu > ul > li:nth-child(3) > a').click();
        await(browser.sleep(3000));
        await $('#center_column a.button.ajax_add_to_cart_button.btn.btn-default').click();
        await(browser.sleep(3000));
        await $('[style*="display: block;"] .button-container > a').click();
        await(browser.sleep(3000));
        await $('.cart_navigation span').click();
        await(browser.sleep(3000));

        await $('#email').sendKeys('aperdomobo@gmail.com');
        await $('#passwd').sendKeys('WorkshopProtractor');
        await $('#SubmitLogin > span').click();
        await(browser.sleep(3000));

        await $('#center_column > form > p > button > span').click();
        await(browser.sleep(3000));

        await $('#cgv').click();
        await(browser.sleep(3000));

        await $('#form > p > button > span').click();
        await(browser.sleep(3000));
        await $('#HOOK_PAYMENT > div:nth-child(1) > div > p > a').click();
        await(browser.sleep(3000));
        await $('#cart_navigation > button > span').click();
        await(browser.sleep(3000));

        await expect($('#center_column > div > p > strong').getText())
          .toBe('Your order on My Store is complete.');
      });
    });
    ```

1. Modifique los archivos de configuración de protractor cambiando

    ``` ts
    specs: ['../test/**/*.spec.js']
    ```

    y

    ``` ts
    getPageTimeout: 1000
    ```

1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 10. Page Object Model

**Descripción**: El page object model es el patrón por defecto que se utiliza para la mantenibilidad de las pruebas, conocer cómo implementar este patrón le ahorrará muchas horas de reproceso en el futuro. En esta sesión se hará la primera implementación del patrón Page Object Model (POM)

1. Crear la carpeta **src/page** desde la raíz del proyecto
1. Crear el archivo **src/page/menu-content.page.ts** con el siguiente contenido

    ``` ts
    import { $, ElementFinder } from 'protractor';

    export class MenuContentPage {
      private tShirtMenu: ElementFinder;

      constructor () {
        this.tShirtMenu = $('#block_top_menu > ul > li:nth-child(3) > a');
      }

      public async goToTShirtMenu(): Promise<void> {
        await this.tShirtMenu.click();
      }
    }
    ```

1. Crear el archivo **src/page/index.ts** con el siguiente contenido

    ``` ts
    export { MenuContentPage } from './menu-content.page';
    ```

1. Modificar el archivo **buy-tshirt.spec.ts** de la siguiente forma
    * Importar la dependencia del page object despues del import de protractor

      ``` ts
      import { browser } from 'protractor';
      import { MenuContentPage } from '../src/page';
      ```

    * Creando una instancia del objeto `MenuContentPage`

      ``` ts
      describe('Buy a t-shirt', () => {
      const menuContentPage: MenuContentPage = new MenuContentPage();
      ```

    * Modificando el locator que le da clic en el menú de t-shirt

      ``` ts
      await browser.get('http://automationpractice.com/');
      await(browser.sleep(3000));
      await menuContentPage.goToTShirtMenu();
      ```

1. Realice el resto de page object y remplacelo en la prueba, los nombres de los page object son:  **address-step.page.ts**, **bank-payment.page.ts**, **order-summary.page.ts**, **payment-step.page.ts**, **product-added-modal.page.ts**, **product-list.page.ts**, **shipping-step.page.ts**, **sign-in-step.page.ts**, **summary-step.page.ts**
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 11. Esperas de Carga de Página y de Jasmine

**Descripción**: Las esperas en selenium son los tiempos que se esperará para realizar algunas acciones, conocerlos y saber cómo utilizarlos nos disminuirá la fragilidad de las pruebas y adicionalmente nos ayudará a reducir los tiempos de ejecución.

1. Cambia el valor del `getPageTimeout` por `30000` en los archivos de configuración de protractor
1. Elimina el `sleep` de **10000**
1. Ejecutar las pruebas y verifica que aun sigan funcionando
1. Agregar el tiempo de espera de Jasmine dentro de los archivos de configuración como muestra la siguiente imagen

    ``` ts
    jasmineNodeOpts: {
      defaultTimeoutInterval: 120000
    }
    ```

1. Eliminar el `beforeEach` de la prueba
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 12. Esperas Implicitas

**Descripción**: Una espera implícita es una espera global que se tiene para cada elemento de la página. En esta sesión veremos cómo tenerla configurada nos ayudará a reducir la cantidad de sleeps de la prueba

1. Agregar dentro del onPrepare de los archivos de config la línea

    ``` ts
    browser.manage().timeouts().implicitlyWait(3000);

    ```

1. Quitar todos los sleeps de la prueba
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 13. Esperas Explicitas

**Descripción**: Las esperas explícitas es la más recomendada, ya que nos permite hacer esperas puntuales sobre algunos elementos y no sobre todos. En esta sesión desactivaremos las esperas implícitas y activaremos las explícitas donde sea necesario

1. Modificar los archivos de configuración de tal forma que desactive las esperas implicitas

    ```ts
    browser.manage().timeouts().implicitlyWait(0)
    ```

1. Ejecute la prueba e identifique en qué partes la prueba falla
1. Utiliza esperas explícitas para solucionar las fallas de la prueba. busque apoyo de **browser** y **ExpectedConditions**
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 14. Mejorando los Locator

**Descripción**: En esta sesión usted hará la propuesta de que locators deberían ser utilizados en la prueba que se está implementado.

1. Haga su propia propuesta de locators para cada uno de los page-objects
1. Enviar PR con los cambios
1. El revisor comentará con los que no está de acuerdo, en ese caso, justifique la razón de su selección (No une **XPATH**)

### 15. Separar prueba en diferentes describes

**Descripción**: Por legibilidad es bueno tener sesionados cada uno de los pasos de las pruebas en diferentes describes, en esta sesión usted aprenderá cómo hacerlo

1. Modificar la prueba de **buy-tshirt.spec.ts** de tal forma que tenga varios describes de la siguiente forma
    * Abrir la página en el navegador
    * Proceso de compra de la Camiseta
    * Logeo en la aplicación
    * Seleccionar la dirección por defecto
    * Pago en el banco (Este debe contener el `it` de validación)
1. Enviar PR con los cambios

### 16. Agregando Jasmine Awesome

**Descripción**: agregaremos un reporte visual a nuestro proyecto de tal forma que tenga un reporte html de la ejecución de las pruebas

1. Instalar la dependencia de desarrollo **jasmine-awesome-report**
1. Siga las instrucciones de <https://github.com/aperdomob/jasmine-awesome-report> (La carpeta debe llamarse reports y el reporte awesome)
1. Modificar el gitignore para que excluya la carpeta del reports
1. Modificar el package.json para que el script del clean borre la carpeta de reports
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 17. Utilizando Capabilities para configurar Chrome

**Descripción**: Las popups que muestra chrome cuando se está ejecutando por selenium son molestas y pueden causar fragilidad en las pruebas, en esta sesión se enseñará a desactivarlas por medio de las capabilities.

1. Modificar la configuración local de protractor agregando capabilities para chrome para evitar mostrar algunas ventanas emergente en la ejecución

    ``` ts
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--disable-popup-blocking', '--no-default-browser-check', '--window-size=800,600'],
        prefs: { credentials_enable_service: false }
      }
    },
    ```

1. Tomar una foto de que el test se ejecuta sin las ventanas emergentes y colocarla en la descripción del PR
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 18. Listas de Elementos, filtros y elementos dentro de elementos

**Descripción**: En muchas ocasiones tenemos que obtener un locator para posteriormente poder hacer una acción sobre un hermano o alguno que no esté directamente relacionado, en esta sesión trabajaremos con la anidación de locators y métodos de búsqueda para poder conseguir relacionar dos locators

1. Agregar una variable privada dentro de **product-list.page.ts** llamado `products` el cual obtendrá todos los productos
1. Cree el método privado `findByProduct` el cual debe retornar toda la caja del producto con el nombre específico. Utilice `$` para obtener elementos internos del locator, `filter` para filtrar la lista y `first` para obtener el primer elemento. Revise la [API de protractor](https://www.protractortest.org/#/api) por si tiene alguna duda
1. Elimine el método que antes obtenía el primer elemento y cambielo por un método llamado `selectProduct` que reciba el nombre del producto y le da clic en la imagen
1. Ejecute las pruebas tanto con interfaz gráfica como en modo headless. Si alguna prueba falla modificarla utilizando css locators o los tiempos hasta que logre funcionar
1. Solicite la revisión de código tal como se hizo en el punto anterior

### 19. Más Locators

**Descripción**: esta sesión automatizaremos otra página diferente, y su misión es seleccionar los mejores locators posibles de tal forma que el page object sea lo más reutilizable posible

1. Crear el archivo **personal-information.page.ts** en la carpeta src/page
1. Crear el archivo **locators.spec.ts** en la carpeta de test, dentro de este archivo se navegará a <https://www.tutorialspoint.com/selenium/selenium_automation_practice.htm> y ejecutará el siguiente método que debe llenar el formulario con la información que se indica y dar clic en el botón Button (Evitar el uso de css locators)

    ``` ts
    await personalInformationPage.fillForm({
       firstName: 'Alejandro',
       lastName: 'Perdomo',
       sex: 'Male',
       experience: 7,
       profession: ['Automation Tester'],
       tools: ['Selenium Webdriver'],
       continent: 'South America',
       commands: [
         'Browser Commands',
         'Navigation Commands',
         'Switch Commands',
         'Wait Commands',
         'WebElement Commands']
    });
    ```

1. Realizar una comprobación del título "**Practice Automation Form**"

### 20. Ejecución de Código Javascript

**Descripción**: Selenium tiene algunas limiaciones y por tanto en ocasiones nos toca ejecutar código directamente en javascript para poder hacer una acción que necesitamos, en este sesión cambiaremos una propiedad de un locator por medio de javascript ya que selenium no es capaz de soportarlo nativamente.

1. Cree el archivo de prueba **i-frame.spec.ts** el cual abrirá la página <http://toolsqa.com/iframe-practice-page/> modificará la áltura del IFrame 1, posteriormente obtendrá la nueva altura para comprobar si efectivamente cambio
1. Cree el archivo page **i-frame.page.ts** el cual contendrá un método para modificar la altura de un IFrame y otro para obtener su altura

    ``` ts
    import { $, browser, ElementFinder, promise } from 'protractor';

    ...

    public setFormFrameHeight(height: number): promise.Promise<void> {
        return browser.executeScript(`arguments[0].height = ${height};`, this.iframe1);
    }
    ```

### 21. Trabajando con IFrames

**Descripción**: Los IFrames aunque ya están mandados a recoger, en ocasiones no los encontramos en algunas páginas, y no está de más saber cómo trabajar con ellos cuando nos los encontremos. En esta sesión entraremos a un iframe, haremos acciones sobre el, saldremos de él y haremos otras acciones sobre la página principal

1. Modificar el page **i-frame.page.ts** de tal forma que publique:
    * un método que retorne el título de la página de valor **Sample Iframe page**
    * un método para pasarse al iframe 1

    ``` ts
    public async switchToFrame(): Promise<void> {
        await browser.switchTo().frame(this.frame.getWebElement());
    }
    ```

    * otro método para regresar al contexto principal

    ``` ts
    public async switchToMainPage(): Promise<void> {
        await browser.switchTo().defaultContent();
    }
    ```

1. Modificar la prueba **i-frame.spec.ts** de tal forma que verifique el título principal
1. Modificar la prueba **i-frame.spec.ts** de tal forma que se cambie al iframe 1 y verifique el título
1. Modificar la prueba **i-frame.spec.ts** de tal forma que se cambie al contexto principal y verifique nuevamente el título

### 22. Subiendo un Archivo

**Descripción**: En esta sesión se automatizará una prueba donde se deba subir un archivo.

1. Modificar el page **personal-information.page.ts** de tal forma que el método `fillForm` ahora no haga clic en el botón y cree otro método submit que llene el formulario y haga clic en el botón
1. También debe recibir dentro del json un parámetro file que tiene la ruta relativa de algún archivo a subir, si tiene un valor válido debe subir el archivo
1. Cree la carpeta resources a nivel de la raíz del proyecto y coloque un archivo jpg en ella
1. Modificar **locators.spec.ts** de tal forma que se le pase la ruta de la imagen que puso en resources
1. Agregue una validación el **locators.spec.ts** que verifique la imagen fue cargada

### 23. Descargando Archivos

**Descripción**: En esta sesión se automatizará una prueba donde se deba descargar un archivo

1. Modificar el page **personal-information.page.ts** de tal forma que si recibe el parámetro `downloadFile` dentro del JSON llame al método privado `download` de ese mismo pageobject
1. El método `download` obtendrá el link del enlace "**Test File to Download**" y se lo pasará al método `downloadFile` que recibe dos parametros de entrada el link de descarga y el nombre del archivo con que se quiere guardar
1. Crear la carpeta **service** dentro de **src** y crear dentro un archivo llamado **download.service.ts** que tendrá dos métodos públicos

    ``` ts
    public async downloadFile(link: string, filename): Promise<void>
    ```

    Este método obtendrá la información del link y lo guardará en una carpeta temp a nivel raíz del proyecto con el nombre indicado

    ``` ts
    public readFileFromTemp(filename: string): Buffer
    ```

    Recibirá el nombre del archivo y devolverá el buffer que contiene la información del archivo
1. Modificar la prueba de tal forma que descargue el archivo y después comprobar que descargó de forma correcta

### 24. Configurar Saucelabs

**Descripción**: Ejecutar en modo headless no siempre es la mejor opción, existen herramientas de pago como Saucelabs que nos provisionan diferentes sistemas operativos y diferentes navegadores, en esta sesión configuraremos saucelabs para ejecutar nuestras pruebas.

Ya que nuestras pruebas se ejecutarán en un servidor de integración sin interfaz gráfica, debemos utilizar servicios externos para la ejecución en browsers reales. En este caso utilizaremos saucelabs.

1. Crear una cuenta en [SauceLabs](https://saucelabs.com/)
1. Una vez creada la cuenta, ir a la opción de User Settings

    ![Saucelabs user settings](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image1.png)

1. Ir a la sección de Access Key y dar click en show. Esto pedirá el password para mostrar el access key. Una vez lo acceda, cópielo al portapapeles y guárdelo en un lugar seguro

    ![Saucelabs access key](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image2.png)

1. Adicione al archivo **package.json** el script `test:saucelabs` y haga que este se corra cuando se ejecute el script de test

    ``` json
    "test:saucelabs": "npm run build && protractor dist/protractor/saucelabs.config.js",
    "test": "npm run test:saucelabs"
    ```

1. Duplique el archivo  **protractor/local.config.ts** con el nombre **protractor/saucelabs.config.ts**
1. Adicione las siguientes propiedades **protractor/saucelabs.config.ts**:
    * `sauceUser`: tendrá el valor del user name de saucelabs (se obtendrá por variable de ambiente)
    * `sauceKey`: tendrá el valor del key de saucelabs copiado en el punto 3 (se obtendrá por variable de ambiente)
    * `Capabilities.name`: nombre de la ejecución del job en saucelabs

    ``` ts
    // ...

    export let config: Config = {
      // ...
      sauceUser: process.env.SAUCE_USERNAME,
      sauceKey: process.env.SAUCE_ACCESS_KEY
    };
    ```

    ``` ts
    // ...
    capabilities: {
      name: 'UI Workshop',
      browserName: 'chrome',
      chromeOptions: {
        args: ['--disable-popup-blocking', '--no-default-browser-check', '--window-size=800,600'],
        prefs: { credentials_enable_service: false }
      }
    },
    // ...
    ```

1. Una vez configurado esto, en la consola asigne los valores para `SAUCE_USERNAME` y `SAUCE_ACCESS_KEY`, con los valores del registro en saucelabs

    ``` bash
    export SAUCE_USERNAME='sauce-username'
    export SAUCE_ACCESS_KEY='sauce-keu'
    ```

1. Ejecute la prueba `npm test`
1. Esto lanzará la ejecución directamente en saucelabs y se puede visualizar de la siguiente forma: <http://recordit.co/pIAXMQShQJ>
1. Para que travis tome correctamente el `SAUCE_ACCESS_KEY` se debe configurar la variable de forma encriptada

    ``` bash
    travis encrypt SAUCE_USERNAME=el-usuario --add --com
    travis encrypt SAUCE_ACCESS_KEY=el-key --add --com
    ```

    **Nota 1**: Si recibe un mensaje de error similar a `repository not known to https://api.travis-ci.org/: owner/repo`
                Inicie sesión usando el comando `travis login --com`, se le solicitara ingresar su usuario y contraseña de Travis
    **Nota 2**: Si no desea instalar el cliente de travis puede utilizar docker de la siguiente forma:

    ```bash
    docker run -v $(pwd):/usr/src/app -it ruby /bin/bash
    gem install travis -v 1.8.9 --no-rdoc --no-ri
    echo 'y' | travis -v
    cd /usr/src/app
    travis encrypt SAUCE_USERNAME=el-usuario --add --com
    travis encrypt SAUCE_ACCESS_KEY=el-key --add --com
    ```

#### Sugerencias

* Para configurar las variables de entorno en diferentes sistemas operativos, consulte este [link](https://wiki.saucelabs.com/display/DOCS/Best+Practice%3A+Use+Environment+Variables+for+Authentication+Credentials)
* Asegúrese de establecer los valores correctos para `SAUCE_USERNAME` y `SAUCE_ACCESS_KEY`
* Para instalar el cliente de Travis, sigas las instrucciones de <https://github.com/travis-ci/travis.rb#installation>

### 25. Probar con diferentes navegadores

**Descripción**: Nuestros productos generalmente deben ser verificados en más de un navegador, por tanto es importante saber cómo ejecutar nuestras pruebas en varios navegadores.

1. Necesitaremos editar el archivo **protractor/saucelabs.config.ts**, con los siguientes valoresCambiar capabilities por multiCapabilities
    * `multiCapabilities`: contiene la configuración de varios navegadores en un mismo config file

    ``` ts
    import { browser, Config } from 'protractor';
    import { reporter } from './helpers/reporter';

    const firefoxConfig = {
      browserName: 'firefox',
      platform: 'linux',
      name: 'firefox-tests',
      shardTestFiles: true,
      maxInstances: 1
    };

    const chromeConfig = {
      browserName: 'chrome',
      name: 'chrome-tests',
      shardTestFiles: true,
      maxInstances: 1
    };

    const multiCapabilities = [chromeConfig, firefoxConfig];

    export let config: Config = {
      multiCapabilities,
      // ...
    };
    ```

1. Ejecute las pruebas y en el PR suba la imagen que muestre que esta corriendo en diferentes navegadores
    ![Saucelabs Multibrowser execution](https://raw.githubusercontent.com/wiki/AgileTestingColombia/workshop-protractor/images/image3.png)

#### Sugerencias para brobar con diferentes navegadores

* Las configuraciones pueden mejorarse, haciendo que se reciban parámetros por consola con los browsers en los que se desea ejecutar
* Puede adicionar más browsers o versiones de browsers o sistema operativo, siempre y cuando sean [soportados](https://saucelabs.com/platforms) por saucelabs
* Opciones como shardTestFiles o maxInstances también pueden ser configurables para que el usuario decida cómo ejecutar las pruebas y dejar valores por defecto para ser usado por el CI

### 26. Zalenium

**Descripción**: En ocasiones requerimos ejecutar nuestras pruebas en nuestro ambiente local o en un servidor de integración continua pero no tenemos los recursos suficientes para pagar todas las ejecuiones que se requieren en servicios como Saucelabs, o simplemente no queremos instalar ciertos navegadores en nuestro equipo ya que nos puede afectar nuestro ambiente de trabajo. Zalenium nos permite ejecutar nuestras pruebas dentro de containers si cumplen ciertos requerimientos y el resto mandarlo a Saucelabs de esa forma no tenemos que hacer configuraciones adicionales y tampoco incurrir a facturas muy grandes

1. Descargue la imagen de docker elgalu/selenium

    ``` bash
    docker pull elgalu/selenium
    ```

1. Descargue la imagen de zalenium

    ``` bash
    docker pull dosel/zalenium
    ```

    **Nota 1**: Si recibe un mensaje de error similar a `Error response from daemon: Get https://registry-1.docker.io/v2/: unauthorized:incorrect username or password`
                Inicie sesión usando el comando `echo "YOUR_DOCKER_PASSWORD" | docker login --username YOUR_DOCKER_USERNAME --password-stdin`

1. Ejecute el contenedor de zalenium

    ``` bash
    docker run --rm -ti --name zalenium -p 4444:4444 \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v /tmp/videos:/home/seluser/videos \
        --privileged dosel/zalenium start
    ```

1. Duplicar el archivo de **saucelabs.config.ts** y llamarlo **zalenium.config.ts**
1. Configure el archivo de zalenium para que apunte al servidor de Grid de Zalenium

    ``` ts
    seleniumAddress: 'http://localhost:4444/wd/hub'
    ```

1. Abrá la página `http://localhost:4444/grid/admin/live`
1. Remueva del **package.json** la instrucción del `--gecko false` en el script del postinstall
1. Agregue el script de `test:zalenium`en el **package.json**
1. Ejecute el comando `npx webdriver-manager update`
1. Ejecute las pruebas con `npm run test:zalenium` y vea como en la página de `live` se refresca la ejecución de las pruebas
1. Abrá la página `http://localhost:4444/dashboard` y tome un screenshot del resultado de las pruebas y lo adjunta al PR
