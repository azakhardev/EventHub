EventHub je letní projekt, který umožňuje uživatelům vytvářet, sdílet a sledovat události s automatickými notifikacemi před jejich začátkem. Aplikace zároveň podporuje sledování uživatelů, opakování událostí, soukromé i veřejné eventy a reaktivní upozornění na změny v kalendáři.

## 🔧 Shrnutí celkových funkcí (kompletní)

### 🧑‍🤝‍🧑 Uživatelé

- Přihlášení (JWT)
- Profil uživatele
- Sledování jiných uživatelů
- Přehled sledovaných událostí

### 📅 Události

- Tvorba/editace/mazání události
- Atributy: název, popis, čas, místo, kategorie (label), barva, sdílený link
- Připojení k privátním eventům pomoci tokenu eventu

### 🔔 Notifikace

- Když někdo, koho sleduji, vytvoří/smaže/urpaví událost
- **Tyden, den, hodinu a 10 minut před událostí**, dle nastavení uživatele

### 🌐 Sdílení

- Pozvánka přes event
- Přpojení přes token/přijmutí pozvánky

## 📁Struktura Projektu

```
EventHub/
├── Frontend/
│   ├── Dockerfile
│   └── (React projekt)
├── Backend/
│   ├── Dockerfile
│   └── (backend kód - Spring Boot)
├── PostgresqlDb/
│   └── create_db.sql
│	└── inserts.sql
├── docker-compose.yml
└── README.md
```

## Jak spustit aplikaci?

1. Vytvořte si soubor `docker-compose.yml` a vložte do něj tento kód:

```yaml
services:
  frontend:
    image: artemzach/eventhub:frontend-latest
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    image: artemzach/eventhub:backend-latest
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/eventhub
      SPRING_DATASOURCE_USERNAME: admin
      SPRING_DATASOURCE_PASSWORD: 123456Ab
    depends_on:
      - db

  db:
    image: artemzach/eventhub:db-latest
    restart: always
    environment:
      POSTGRES_DB: eventhub
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 123456Ab
    ports:
      - "5432:5432"
```

2. Ve složce se souborem `docker-compose.yml` otevřete příkazový řádek a spusťte příkaz `docker compose up -d`
3. Docker si automaticky stáhne a spustí moje image z DockerHubu
4. Aplikace se spustí a pak:

- Frontend na http://localhost:80 => toto otevřít v prohlížeči
- Backend na http://localhost:8080
- Databáze na localhost:5432

**Databázové napojení `application.properties`:**

```properties
spring.application.name=eventhub.restapi
spring.datasource.url=jdbc:postgresql://localhost:5432/EventHub
spring.datasource.username=admin
spring.datasource.password=123456Ab
spring.datasource.driver-class-name=org.postgresql.Driver
spring.security.user.name=artem
spring.security.user.password=secret1234!

spring.jpa.properties.hibernate.format_sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.show-sql=true
```

### 🛢️Databázové schéma:

<img width="832" height="774" alt="{E574B28B-76D9-4A96-BE7B-320D4D735387}" src="https://github.com/user-attachments/assets/276a5bd9-4ff2-40d5-9e1a-ede41acea497" />

### ✨Případné vylepšení v budoucnu (podle nálady):

- Přidat Redis pro cacheování nadcházejících eventů a přátel
- Spouštět připomínky i pro eventy s opakováním
- Přidat responzivitu
- Upload profilových fotek do Cloudu + ukládání URL do db
- Možnost upravit jednotlivé instance opakujících se eventů (ne všechny)
