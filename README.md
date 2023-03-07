# Tasker
Copy `.env.example` to `.env`then set these <br>
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=tasker
DB_USERNAME=root
DB_PASSWORD=
```

Run the following command (MUST)
```
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

Then login using <br>
```
admin@example.com
password
```
