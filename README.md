# Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Description

It's UI for backend server that works with Zookeeper. 

 - UI provides features to explore data in Zookeeper or Zookeepers;
 - Compare content of different zookeepers;
 - Copy data from Zookeeper to another one;
 - Update/Remove data from zookeeper node;
 
 
## TODO
сделать compare(logic + css)

Возможно: Сделать поиск по всем деревьям. (кнопка поиска открывает Модальное 
окно и в нём можно задать строку поиска + показывать результат поиска).

сделать верную загрузку с бэка по хостам при первом старте программы - мб
с помощью эффектов.(сделать лампочку и при загрузке отправлять healthCheck по всем
поднятым hosts, далее:
если пришёл true по host, - сделать *GET hostValue*, 
если пришёл false по host, - показать "Красную лампочку").
+ это похоже на pipeline, возможно жто получиться сделать Красиво через потоки.
