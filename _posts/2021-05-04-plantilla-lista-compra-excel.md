---
title: "Plantilla Google Sheets organización de las compras en casa"
author: DavidCerezal
header:
  image: /assets/images/listaexcelscript.png
  teaser: /assets/images/listaexcelscript.png
seo_title: "Plantillas para excel con macros de google script. Como generar lista automáticamente desde un rango. Plantilla Excel."
seo_description: "Como generar lista automáticamente desde un rango en google sheet por medio de google script. Plantilla Excel"  
toc: true
toc_sticky: true
tags: 
  - Google script
  - Google sheet
  - Lista automáticas
  - Lista de la compra
  - Plantilla excel
---


La organización de las compras en casa no tiene porque ser tan caótica como parece. Muchas veces repetimos productos y conductas aunque no nos demos cuenta. **Tener una plantilla de Excel o google sheet para llevar un pequeño control nos puede servir de mucha ayuda**. O incluso para aquellas veces que no sabemos qué comprar, tener una forma rápida y fácil de generar esta lista será un gran apoyo. Lo que vamos a hacer en esta plantilla es:  
  

1. Generar una lista de todos los alimentos que consumimos, con supermercado y prioridad.
2. Crear una lista con un selector entre objetos
3. Crear un generador de lista aleatorias en base a la prioridad
4. Cómo formatear una lista y juntar elementos de una lista
  
  
###  1.- Generar una lista de todos los alimentos que consumimos, con supermercado y prioridad.

Primero crearemos una lista general con todos los objetos que hemos consumido:  

<div style="text-align: center;margin-bottom: 30px;">
<img src="/assets/images/lista1.png" alt="lista global compras" width="400px;"> 
</div>  
    




  
### 2.- Crear una lista con un selector entre objetos

Crear un selector nos ayudará a sugerir de manera fácil todas las opciones que tenemos. El objetivo es mostrar en otra página todas las opciones disponibles en “objetos totales”. El resultado será el siguiente:

<div style="text-align: center;margin-bottom: 30px;">
<img src="/assets/images/lista2.png" alt="selector compras" width="400px;"> 
</div>  



       
Donde en cada objeto se seguirán los objetos totales. Para ello debemos ir a 

 **Datos > validación de datos > lista a partir de un intervalo**

    (el intervalo podría ser ='Objetos totales'!$A$5:$A$999)

Con esta validación obtendremos todos los objetos definidos en la página objetos totales desde A5 a A999

  




### 3.- Crear un generador de lista aleatorias en base a la prioridad
  
En el apartado anterior hemos visto cómo podríamos ayudar a crear una lista teniendo una lista de objetos totales. Pero, ¿podríamos hacer que esta lista se generase sóla? La respuesta es sí, por medio de las google sheets. **Con esta función-script crearemos una lista automáticamente copiando objetos desde otra página.**

**Para ello vamos a definir una serie de prioridades que nos servirán para filtrar la lista.** Por ejemplo, si vamos a poner 3 prioridades, la prioridad 1 será para la lista básica (huevos, leche..), la prioridad será para objetos menos frecuentes (Detergente…). En algunos casos, queremos sólo crear una lista básica de compra y en otros, una lista más completa. Para ello crearemos una macro para cada uno.



<div style="text-align: center;margin-bottom: 30px;">
<img src="/assets/images/lista4.png" alt="prioridades" width="400px;"> 
</div>  




  
El comportamiento será el siguiente, donde se genera de forma automática la lista al ejecutar la macro.  
  




<div style="text-align: center;margin-bottom: 30px;">
<img src="/assets/images/lista5gif.gif" alt="ejemplo uso"> 
</div>    
  




Para crear esto el código de google script consiste en lo siguiente (Puedes manejar tus scripts desde [https://script.google.com/](https://script.google.com/)). **El código genera una lista de valores dado un rango, filtra esta lista y copia la lista filtrada en el rango definido.**  



  
{% highlight console %}
function CrearPrio1() {

	//Obtener las lista actual y la lista total de objetos
	var current_spread_sheet = SpreadsheetApp.getActiveSpreadsheet();
	var objects_list_spread_sheet = current_spread_sheet.getSheetByName("Objetos totales")
	var list_spread_sheet = current_spread_sheet.getSheetByName("Generador de Listas")


	//Limpiar el espacio donde queremos copiar
	list_spread_sheet.getRange('A4:C999').clearContent();


	//Conseguir los values que queremos copiar
	var copy_range = objects_list_spread_sheet.getRange('A3:C999');
	var copy_range_values = copy_range.getValues()
	  
	  

	//Filtrar la lista de los values por prioridad, si querríamos por ejemplo filtrar por otra razón tendríamos que cambiar el //“copy_range_values[i][2] == 1”
	var data = []
	for (var i = 0; i< copy_range_values.length ; i++) {
		if(copy_range_values[i][2] == 1) {
			data.push(copy_range_values[i])
		}
	}

	  
	//Copiar la lista en el rango que queremos.
	list_spread_sheet.getRange('A4:C'+(data.length+3)).setValues(data);
}
{% endhighlight %}





  
### 4.- Cómo formatear una lista y juntar elementos de una lista

Una última función que me vino a la mente era la de poder copiar fácilmente esta lista, por ejemplo, a Whatapp para llevarla de manera fácil. En algunos casos copiar desde excel row a row no deja un resultado limpio, por eso debemos formatear la lista generada en un sólo texto.



<div style="text-align: center;margin-bottom: 30px;">
<img src="/assets/images/lista6.png" alt="ejemplo uso" > 
</div>     



  
Para conseguir esta lista de la compra vamos a:

**1º Juntar el objeto y el supermercado, en un futuro, podríamos poner también el nº de unidades.**

Con el IF filtramos las columnas que no estén definidas, con el concatenate juntamos los dos textos.

    =IF(ISBLANK(A4);"";CONCATENATE(A4;" (";B4;")"))

 
**2º Concatenar todos estos objetos.**
Concatenamos “lista de la compra”, “ \Espacio”, + Todos los textos anterior juntos separados por un “- ”

    =CONCATENATE("LISTA DE LA COMPRA:";CHAR(10);"- ";TEXTJOIN(CONCAT(CHAR(10);"- "); TRUE; K6:K999))


Felices compras!