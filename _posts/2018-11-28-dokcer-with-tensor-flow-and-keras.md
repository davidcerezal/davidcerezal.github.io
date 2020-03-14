---
title: "Cómo desplegar una máquina en docker para TensorFlow. Containerize it!"
author: DavidCerezal
header:
  image: /assets/images/post2.png
  teaser: /assets/images/post2.png
seo_title: "Cómo desplegar una máquina en docker para TensorFlow. Containerize it!"
seo_description: "Hoy vamos a crear una máquina virtual apta para operar con TensorFlow y Keras, basado en el libro “DeepLearning with Keras”. Para ello nos basaremos en Docker, una herramienta que nos permite automatizar el despliegue de aplicaciones dentro de contenedores de software..."  
tags: 
  - Tensor
  - Docker
  - Deep Learning
---

Hoy vamos a crear una máquina virtual apta para operar con TensorFlow y Keras, basado en el libro [“DeepLearning with Keras”](https://www.manning.com/books/deep-learning-with-python). Para ello nos basaremos en Docker, una herramienta que nos permite automatizar el despliegue de aplicaciones dentro de contenedores de software, proporcionando una capa adicional de abstracción y automatización de virtualización de aplicaciones en múltiples sistemas operativos. Recomendaría primero, si eres nuevo en docker, familiarizarte con los comandos de docker y para qué sirve esta herramienta, ya que si has llegado hasta aquí hay muchas probabilidades de que lo utilices en un futuro, así que por qué no empezar ahora:

Los pasos que vamos a seguir van a ser:

1. Buscar una máquina de docker adecuada
2. Instalar y probar esta máquina.
3. Customizar nuestra máquina con nuestras dependencias
4. Subirla de Dockerhub ( el servicio de nube de docker) para tenerla siempre lista cada vez que la queramos utilizar.


## 1.- Buscar una máquina de docker adecuada.
Para este caso queremos preparar una máquina para usar [Keras](https://keras.io/), esta es [una librería](http://gw.tnode.com/docker/keras/) que nos sirve para trabajar con redes neuronales de una manera más sencilla. Esta corre “On-Top” sobre  [TensorFlow](https://github.com/tensorflow/tensorflow), [CNTK](https://github.com/Microsoft/cntk), or [Theano](https://github.com/Theano/Theano). Por ello mismo, este mismo ejemplo es extensible para preparar una máquina de Tensor-Flow, podríamos utilizar esta misma máquina o eliminar Keras en esta para tener una solución mas “light”. Dado que probablemente ya exista una máquina con estos requerimientos buscamos una, la encontramos rápidamente aquí:

**[https://github.com/gw0/docker-keras](https://github.com/gw0/docker-keras)**

Esta nos permite instalar diferentes versiones de keras, tensorFlow, CNTK o Theano, en GPU o CPU. Nosotros elegiremos TensorFlow y Keras ya que es la que vamos a utilizar, y GPU/CPU en función de nuestro Hardware.



## 2.- Instalación y prueba
Primero debemos instalar docker en nuestro ordenador. Para ello seguiremos su magnífica [documentación](https://docs.docker.com/get-started/), también se recomienda crear una cuenta [DockerHub](https://hub.docker.com/) ya que la vamos a utilizar en un posterior uso. Bien, una vez tenemos instalado docker y corriendo en nuestro ordenador, podemos descargar / traer la máquina deseada. Nosotros nos vamos a traer la versión `keras:2.1.4-py3`.

Lo podemos ejecutar con el comando, en el que tendremos que ver el progreso de la descarga.

{% highlight console %} dcerezal$ docker pull gw000/keras:2.1.4-py3 {% endhighlight %}

Al acabar esto, podemos ejecutar, el siguiente comando en el que debería aparecer nuestra imagen de la **nueva máquina docker**.

{% highlight console %}
:~ dcerezal$ docker images
REPOSITORY          TAG       IMAGE ID            CREATED SIZE
gw000/keras         2.1.4-py3 24f176f13436        7 months ago 927MB
{% endhighlight %}

Ahora que tenemos nuestra imagen de la máquina la debemos ejecutar, por ejemplo, podemos acceder al bash de esta máquina. Para ello utilizaremos el comando **docker run** que pondrá en funcionamiento una instancia de esta máquina.

{% highlight console %}docker run -it --rm -v $(pwd):/srv gw000/keras:2.1.4-py3 bash{% endhighlight %}


A lo que nos cambiará la interfaz de la consola a la del Bash  de la máquina:

{% highlight console %}root@baff3ed84d6b:/srv#{% endhighlight %}

Aquí para ver que todo funciona correctamente, podemos **ejecutar python3** para ver que esta **correctamente instalado**, y dentro de aquí ver que está instalado tensorFlow.

{% highlight console %}~ dcerezal$ docker run -it --rm -v $(pwd):/srv gw000/keras:2.1.4-py3 bash
root@baff3ed84d6b:/srv# python3
Python 3.5.3…..
>>> import keras
Using TensorFlow backend.
{% endhighlight %}


Este mensaje de **“Using TensorFlow backend.”** nos confirma que nuestra máquina es correcta y preparada para el uso de Keras.

 

## 3.- Customizamos nuestra máquina con nuestras extensiones.
 

Supongamos que como en este ejemplo, hemos encontrado una máquina apta para nosotros, pero queremos instalarle alguna dependencia más, por ejemplo pip, matlibplot… Lo que se nos ocurra, es nuestra propia máquina.

Para ello seguiremos los siguientes pasos:

Entramos en la máquina en cuestión e instalamos lo que necesitemos. 

{% highlight console %}sudo apt-get install python-pip
pip3 install matlibplot
{% endhighlight %}


Ahora que tenemos nuestras dependencias extras instaladas, **sin cerrar esta ventana de la terminal**, abrimos una nueva venta de la terminal. Aquí ejecutamos:

{% highlight console %}MacBook-Air-de-David:~ dcerezal$ docker ps
CONTAINER ID        IMAGE  COMMAND CREATED             STATUS PORTS NAMES
65b3e16edbb7        cerezal77/keras:0.2  "bash" 5 seconds ago       Up 4 seconds hardcore_swanson
{% endhighlight %}

Nos debería de devolver la instancia y el container ID de la máquina que ahora mismo tenemos en uso. Utilizaremos ese container ID para “copiar” esta máquina a la nuestra propia. Para crear esta nueva máquina **utilizaremos commit**,  docker commit -m “Mensaje” -a “” `docker ps -l -q`  nombre:del:tag
al proporcionarle un nuevo “nombre:del:tag” nos creará una nueva máquina aquí.

{% highlight console %}docker commit 65b3e16edbb7 cerezal77/keras:0.1{% endhighlight %}


Nosotros la hemos creado con este nombre. Debemos utilizar el mismo que después crearemos, o hemos creado como nombre del repo en docker hub.

![creación como nombre del repo en docker hub.](/assets/images/posts/keras1.png)

Después de este commit, si ejecutamos el comando de Docker images, veremos nuestra nueva imagen de docker creada. 

{% highlight console %}MacBook-Air-de-David:~ dcerezal$ docker images
REPOSITORY          TAG IMAGE ID            CREATED SIZE
cerezal77/keras     0.1 1d3b5958addd        6 days ago 1.02GB
gw000/keras         2.1.4-py3 24f176f13436        7 months ago 927MB
{% endhighlight %}

*Tip: Si hemos instalado cosas nuevas o realizado cambios el size debería ser diferente del anterior.*

 

## 4.- Subimos esta máquina a nuestro docker hub
 

Para subir esta nueva máquina a nuestro repo de docker hub lo haremos utilizando el comando de:

{% highlight console %}docker push cerezal77/keras:0.2{% endhighlight %}
 

Y en nuestro repo de docker hub deberíamos de ver algo así:

![creación como nombre del repo en docker hub.](/assets/images/posts/keras2.png)


Y ya estaría nuestra nueva máquina preparada para el uso en cualquier lugar con el simple comando de **docker pull cerezal77/keras:0.2**. Para probarlo de verdad podemos probar a borrar nuestras máquinas actuales, descargarla de nuevo, ejecutarla y ver que tiene las dependencias que hemos instalado.  Esto elimina todas las instancias de máquinas que actualmente tenemos en nuestro docker local si luego ejecutamos “docker ps” debería aparecer vacío.

{% highlight console %}docker rm $(docker ps -a -q)
MacBook-Air-de-David:~ dcerezal$ docker ps
CONTAINER ID        IMAGE COMMAND             CREATED STATUS PORTS               NAMES{% endhighlight %}


Este comando elimina todas las imágenes de máquinas que actualmente tenemos en nuestro docker local si luego ejecutamos “docker images” debería aparecer vacío.

{% highlight console %}docker rmi $(docker images -q)
MacBook-Air-de-David:~ dcerezal$ docker images
REPOSITORY          TAG IMAGE ID            CREATED SIZE
{% endhighlight %}

Bien ahora ejecutamos nuestro pull para descargar la máquina. Y por ejemplo ejecutamos:

{% highlight console %}
docker pull cerezal77/keras:0.1
MacBook-Air-de-David:~ dcerezal$ docker run -it --rm -v $(pwd):/srv cerezal77/keras:0.2 python3
Python 3.5.3 (default, Jan 19 2017, 14:11:04)
[GCC 6.3.0 20170118] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import keras
Using TensorFlow backend.
>>> import matplotlib
>>>
{% endhighlight %}
 

Y comprobaremos que las dependencias instaladas estan correctamente instaladas. 
Y ale, a correr y programar!
