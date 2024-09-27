// busquedaDatacrm.js

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function buscarDatacrm() {
    // Configura las opciones de Chrome para ejecutar en modo sin interfaz gráfica (headless)
    let options = new chrome.Options();
    options.addArguments('--headless'); // Ejecuta Chrome en modo headless para evitar abrir una ventana gráfica
    options.addArguments('--no-sandbox'); // Desactiva el modo sandbox para mejorar la compatibilidad
    options.addArguments('--disable-dev-shm-usage'); // Previene problemas en entornos de contenedor como GitHub Actions

    // Inicializa el navegador Chrome con las opciones configuradas
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Navega a la página principal de Google
        await driver.get('https://www.google.com');

        // Intenta aceptar las cookies, si el botón está presente
        try {
            let aceptarCookies = await driver.findElement(By.id('L2AGLb'));
            await aceptarCookies.click(); // Hace clic en el botón para aceptar cookies
        } catch (e) {
            // Si no aparece el botón, se ignora el error y se continúa con el flujo
        }

        // Localiza el campo de búsqueda de Google
        let cajaBusqueda = await driver.findElement(By.name('q'));

        // Envía "datacrm" al campo de búsqueda y presiona Enter
        await cajaBusqueda.sendKeys('datacrm', Key.RETURN);

        // Espera hasta que el título de la página contenga "datacrm" (indicando que se cargaron los resultados)
        await driver.wait(until.titleContains('datacrm'), 10000);

        console.log('Búsqueda completada exitosamente.'); // Indica que la búsqueda fue exitosa
    } catch (error) {
        console.error('Ocurrió un error:', error); // Registra el error en caso de fallo
        process.exit(1); // Finaliza el proceso con un código de error para que GitHub Actions lo detecte
    } finally {
        // Asegura el cierre del navegador independientemente de si hubo un error o no
        await driver.quit();
    }
}

// Llama a la función para ejecutar la búsqueda
buscarDatacrm();
