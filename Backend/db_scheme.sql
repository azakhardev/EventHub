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
    recurrence recurrence_type DEFAULT 'once' ,
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