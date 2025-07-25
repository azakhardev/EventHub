# EventHub

## 🔧 Shrnutí celkových funkcí (kompletní)

### 🧑‍🤝‍🧑 Uživatelé

- Registrace / přihlášení (JWT)
- Profil uživatele
- Sledování jiných uživatelů
- Přehled sledovaných událostí

### 📅 Události

- Tvorba/editace/mazání události
- Atributy: název, popis, čas, místo, odkaz, kategorie (ikonka), sdílený link
- Automatické přidání události přes pozvánkový link
- (Volitelně) obrázek události

### 🔔 Notifikace

- Když někdo, koho sleduji, vytvoří novou událost
- **15 a 5 minut před událostí**
- Možno rozšířit o přehled "nadcházející události"

### 🌐 Sdílení

- Pozvánka přes URL
- Přidání do seznamu kliknutím

## 📁Struktura Projektu

```
EventHub/
├── FE/
│   ├── Dockerfile
│   └── (React projekt)
├── BE/
│   ├── Dockerfile
│   └── (backend kód - Spring, Node...)
├── DB/
│   ├── init/
│   │   └── 01-init.sql
├── docker-compose.yml
└── README.md
```

**Obsah `docker-compose.yml`**

```yaml
version: "3.9"

services:
  frontend:
    build: ./FE
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./BE
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=db
      - DB_PORT=5432
      - DB_USER=admin
      - DB_PASSWORD=secret
    depends_on:
      - db

  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_DB: eventhub
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret
    volumes:
      - ./DB/init:/docker-entrypoint-initdb.d/
    ports:
      - "5432:5432"
```

**Databázové napojení `application.yml`:**

```yml
spring:
  datasource:
    url: jdbc:postgresql://<host>:<port>/<dbname>
    username: <your_username>
    password: <your_password>
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```

### Databázové schéma:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nickname VARCHAR(255),
    profile_picture TEXT,
    follow_token UUID DEFAULT gen_random_uuid()
);

-- FOLLOWED USERS
CREATE TABLE followed_users (
    following_user_id INTEGER NOT NULL,
    followed_user_id INTEGER NOT NULL,
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
    place VARCHAR(255),
    category VARCHAR(100),
    color varchar(64),
    public boolean DEFAULT TRUE,
    link_token UUID DEFAULT gen_random_uuid(),
    recurrence recurrence_type DEFAULT 'once',
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

-- USERS_EVENTS (m:n relace)
CREATE TABLE users_events (
    user_id INTEGER NOT NULL,
    event_id INTEGER NOT NULL,
    invitation BOOLEAN DEFAULT FALSE,
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
    is_read BOOLEAN DEFAULT FALSE
);
```
