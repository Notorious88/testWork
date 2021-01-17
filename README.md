# Тестовая работа

**host с рабочим экземпляром приложения: [https://stark-basin-23404.herokuapp.com/]()**

### Установка зависимостей:

### `npm i`

### Запуск в режиме "developer":

### `npm run dev`

подключается к локальной БД по адрусу:
[mongodb://127.0.0.1:27017/TestWork](), при подключении не использует логин и пароль.

**host: http://localhost:3000**

### Запуск в режиме "production":

### `npm run start`

В дериктории `config/config.json` добавить удаленный кластер в раздел `prod : {DB_URL: ""}`. пример:
[mongodb+srv://Notorious:PASSWORD@cluster0.0j8ny.mongodb.net/DbNAME?retryWrites=true&w=majority]()

Ресурс: [https://www.mongodb.com/]()

host: http://localhost:3000

### Запуск через "Docker"

В дериктории `config/config.json` добавить удаленный кластер в раздел `prod : {DB_URL: ""}`. пример:
[mongodb+srv://Notorious:PASSWORD@cluster0.0j8ny.mongodb.net/DbNAME?retryWrites=true&w=majority]()

Ресурс: [https://www.mongodb.com/]()

### `sh build.sh`

Запуск билда Docker

### `sh start.sh`

Запуск контейнера Docker

**host: http://localhost:9000**

### `sh kill.sh`

Остановить контейнер Docker
  
  