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

**Obsah `docker-compose.yml`**

```yaml
version: "3.9"

services:
  frontend:
    build: ./Frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  backend:
    build: ./Backend
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/eventhub
      SPRING_DATASOURCE_USERNAME: admin
      SPRING_DATASOURCE_PASSWORD: 123456Ab
    depends_on:
      - db

  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: eventhub
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 123456Ab
    volumes:
      - ./PostgresqlDb:/docker-entrypoint-initdb.d/
    ports:
      - "5432:5432"
```

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

### Databázové schéma:

```sql
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	nickname VARCHAR(255),
    profile_picture_url varchar(1023),
    proffesion VARCHAR(255),
    email VARCHAR(255),
	about TEXT,
	follow_token UUID DEFAULT gen_random_uuid()
);

-- FOLLOWED USERS (m:n relation)
CREATE TABLE followed_users (
    following_user_id INTEGER NOT NULL,
    followed_user_id INTEGER NOT NULL,
    favorite boolean DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (following_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_user_id) REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (following_user_id, followed_user_id)
);  

-- RECURRENCE TYPE
CREATE TYPE recurrence_type AS ENUM ('once', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly');  

-- EVENTS
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body TEXT,
    owner_id INTEGER NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    place VARCHAR(511),
    category VARCHAR(100),
    color varchar(7),
    public boolean DEFAULT TRUE,
    link_token UUID DEFAULT gen_random_uuid(),
    recurrence recurrence_type DEFAULT 'once',
    recurrence_end_date DATE DEFAULT NULL,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- EVENTS_PARTICIPANTS (m:n relation)
CREATE TABLE events_participants (
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    accepted BOOLEAN DEFAULT TRUE,
    important BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id, event_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);  

-- NOTIFICATIONS
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    event_id INTEGER REFERENCES events(id),
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);
```
