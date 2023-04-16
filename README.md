## Set up
create docker.env file with this:<br>
<pre>
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=nestjs
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
</pre>
<hr>
create .env file:
<pre>
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
PORT=
JWT_SECRET=
JWT_EXPIRATION_TIME=
MAIL_HOST=
MAIL_USER=
MAIL_PASSWORD=
MAIL_FROM=
</pre>
<hr>
## Route

```
Post /auth/register
  -Register with email and password and send email to active user
Post /auth/login
  -login with email and password
Get /auth/verify
  -active user account
```
