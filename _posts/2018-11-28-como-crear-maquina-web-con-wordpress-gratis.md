---
title: "Como crear una página de WordPress gratis (Free Domain + Hosting)"
header:
  image: /assets/images/wordpress-intro.png
tags: 
  - wordpress
  - free
  - web
---

¿Has pensando en alguna vez en crear tu propia página bajo un dominio personalizado? Quieres crear una página bajo tu propio dominio pero no quieres gastarte ni un euro; una buena forma de empezar puede ser esta y después, si ves que lo necesitas, mejorar tu página. Esto no es una solución definitiva y bajo ningún concepto debería ser utilizada para un entorno profesional.

En este tutorial, te mostraré cómo crear un sitio web de WordPress desde cero de forma gratuita. También aprenderás cómo obtener un nombre de dominio gratuito y un servicio de alojamiento web gratuito.

 

Crear un sitio web gratuito de WordPress

Bien vamos a empezar. Básicamente, para hacer tu propio sitio web de WordPress, necesitarás un dominio y un servidor web.

Un nombre de dominio es lo que la gente escribe para acceder a su sitio web. Es la dirección de su sitio web en internet. Un nombre de dominio generalmente cuesta unos 10 € y el hosting de la web unos 5 €, estos precios varían según si es un dominio muy utilizado o la velocidad de la web.

A todos nos cuesta dar una tarjeta, y sobre todo suscribirse a planes anuales si no tenemos del todo claro el proyecto que vamos a llevar a cabo, si queremos probar algún proyecto o sacar alguna página web rápida y de prueba podemos utilizar esto.

No estoy hablando del servicio gratuito de WordPress, por lo tanto, no le proporciona un nombre de dominio sino un subdominio como este:

blogdeprueba.wordpress.com

Para poder eliminar ese molesto wordpress.com necesitamos un dominio de nivel superior, como decíamos los típicos .com o .eu son de pago, pero hay algunos países que ofrecen sus dominios de manera gratuita por unos meses, por ejemplo .cf o .tk.
Si ya tienes un dominio comprado puedes saltarte este paso y pasar directamente al paso de hosting.

 

Paso 1: [Dominio gratuito] Obtenga un nombre de dominio gratis con Freenom.com
Freenom es el primer y único proveedor de nombres de dominio gratuito del mundo.

Así que adelante, abre el sitio web www.freenom.com y cree una cuenta.

Ahora, ingrese un nombre en el campo de entrada y haga clic en Verificar disponibilidad para verificar el nombre de dominio disponible. Para esta prueba voy a probar con un nombre de test. Se le presentará una base de extensión de nombre de dominio disponible en su entrada.



Seleccione la extensión que desee y continúe. Nosotros para este caso hemos elegido la opción de .tk , pero las otras también son totalmente válidas. Por tanto para este caso nuestra dirección web será: pruebabloggratis.tk

La siguiente parte del proceso que tenemos es la opción del pago, pero tranquilos nos dejan 12 meses de plazo como máximo gratis. Seleccionamos continuar y seguimos con el proceso de pago. No te preocupes por las DNS o redirecciones eso lo haremos luego.



Tras ello seguimos con el proceso de alta y tenemos que proporcionar un email para verificar y luego nuestros datos para seguir con estos, como vemos el proceso es totalmente gratuito. Si no queremos utilizar nuestra dirección de correo habitual podemos utilizar uno gratuito y temporal (te lo mantienen entre 1 día y un año), ¡pero ojo! este correo es público y tras un tiempo se borra, es decir que si ocurre algún problema en la página no podremos recuperarla. El servicio más conocido era yopmail, pero ya no da servicio, algunos similares son: getairmail.com y mytrashmail.com



 

Una vez hayamos confirmado nuestro email e introducido los datos, deberíamos tener un número de pedido como este:



para revisar nuestros dominios podemos acceder a nuestra área personal y comprobar nuestros dominios:



en el cual debería aparecer el que acabamos de registrar, aquí podemos cambiar las DNS, etc etc.

Genial ya tenemos nuestro dominio propio accesible en la web! Lo podemos comprobar introduciendo directamente en la url

 

Paso 2: [Hosting gratuito] Registre una cuenta de Alojamiento web gratuito
InfinityFree es un alojamiento gratuito e independiente cuyo objetivo es proporcionar servicios de alojamiento gratuitos y fiables para las masas. Nosotros hemos elegido este servicio ya que nos parece correcto, pero hay otros miles de servicios similares que también ofrecen estos servicios.

Visite el sitio web www.infinityfree.net y haga clic en el botón Registrarse ahora.



Una vez acabado el proceso normal deberíamos llegar a un panel de usuario. Aquí crearemos una nueva cuenta, en esta introduciremos el mismo dominio que acabamos de crear. En este caso pruebabloggratis.tk. Aquí deberás copiar los nameservers, aunque también puedes crearlo y conseguirlos después. (https://infinityfree.net/support/how-to-use-infinityfree-nameservers/)



Ahora que tenemos la cuenta creada y los nameservers, debemos de volver a nuestra cuenta de Freenom.com e ir a nuestro panel de control y seleccionar Servidores nombres. 

Aquí deberemos introducir los nameserver que hemos copiado (Nameservers):

NS1.BYET.ORG

NS2.BYET.ORG

NS3.BYET.ORG

NS4.BYET.ORG

NS5.BYET.ORG

 

Bien ahora nuestro dominio apunta nuestro servidor de hosting, InfinityFree



Espere unos minutos para permitir que InfinityFree cree la cuenta de alojamiento para usted y se creen las redirecciones.

Cuando termine de vuela a InfinityFree, actualice la página y ahora debería tener acceso completo a Cpanel. Esta herramienta de Cpanel nos da control total de nuestra página.

 

Paso 3: Instalando WordPress
Lo primero que debe hacer es iniciar sesión en el Panel de su cuenta actual, puede hacerlo de dos maneras.

Primero, haga clic en el botón Panel de control directamente desde la página Cuentas.



Una vez que haya iniciado sesión, vaya a Softaculous Apps Installer en la sección Software.




Se abrirá una nueva pestaña / ventana donde puede seleccionar una variedad de scripts y cms. Ahí puedes elegir entre diferentes Frameworks, nosotros elegiremos WordPress, pero podrías instalar cualquier otro.

Elija en WordPress y luego haga clic en el botón Instalar ahora. Llegaremos a una página de instalación de wordpress.

Software Setup

Protocolo: Podemos utilizar un servicio https si tenemos un certificado válido.
Domain: Podemos añadir algún dominio extra si lo tenemos. Sino dejamos el de por defecto.
Directory: La carpeta de destino, sera en esta será donde se instale el wordpress.
Nosotros por ejemplo para este ejemplo vamos a instalar WordPress y Joomla, para ello utilizaremos diferentes directories.

(Fw) WordPress → (Carpeta) ./ → (URL) pruebabloggratis.tk
(Fw) Joomla → (Carpeta) ./joomla → (URL) pruebabloggratis.tk/joomla
Por ello siguiendo nuestra configuración dejaremos el apartado in directory en blanco y no con la opción por defecto.




Rellenamos el nombre, descripción, nombre del usuario y contraseña. También se recomienda la instalación del plugin de login attemps, que permitirá bloquear a usuarios que intenten acceder ilícitamente a nuestra página.

Rellenamos el proceso con nuestros datos, y al acabar nuestra instalación deberíamos ver en nuestra URL nuestro blog.

 

 


Bien ya tendríamos nuestro blog instalado!

Si por ejemplo queremos seguir haciendo pruebas, podemos instalar en framework de Joomla bajo la carpeta de joomla y tener los dos a la vez. 
Joomla! es un sistema de gestión de contenidos que permite desarrollar sitios web dinámicos e interactivos. Permite crear, modificar o eliminar contenido de un sitio web de manera sencilla a través de un “panel de administración”

[^1]: Texture image courtesty of [Lovetextures](http://www.lovetextures.com/)