--TRUNCATE TABLES
TRUNCATE TABLE notifications RESTART IDENTITY CASCADE;
TRUNCATE TABLE events_participants RESTART IDENTITY CASCADE;
TRUNCATE TABLE events RESTART IDENTITY CASCADE;
TRUNCATE TABLE followed_users RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

--CREATE USERS
INSERT INTO users (username, password, nickname, profile_picture_url, proffesion, email, about)
VALUES 
  ('alice', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Alice', 'https://i.redd.it/guys-do-you-think-this-is-an-improvement-to-my-pfp-first-v0-cdsukhn39xef1.jpg?width=1700&format=pjpg&auto=webp&s=d141b6bca0bd278915501359476e95b2e129dd3f', 'scientis', 'alice@gmail.com', 'I love order and organizing my day.'),
  ('bob', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Bobby', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAATF5rUkFKY0Iqw0oNQxdZQmY3xRZ2Wss-g&s', 'plumber', 'bob@gmail.com','Runner and event enthusiast.'),
  ('carol', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Carol', 'https://i.pinimg.com/736x/a8/a0/cd/a8a0cd3cbb13ff96d5bfca73b011a07d.jpg', 'OnlyFans model', 'carol@gmail.com','Concert lover and social butterfly.'),
  ('guest', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Test user', 'https://unchainedcrypto.com/wp-content/uploads/2023/07/pfp-nft.png', 'Tester', 'guest@gmail.com','Introvert who prefers quiet, well-planned days.'),
  ('user5', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User5', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user5@example.com', 'Hello, I''m User5.'),
  ('user6', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User6', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user6@example.com', 'Hello, I''m User6.'),
  ('user7', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User7', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user7@example.com', 'Hello, I''m User7.'),
  ('user8', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User8', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user8@example.com', 'Hello, I''m User8.'),
  ('user9', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User9', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user9@example.com', 'Hello, I''m User9.'),
  ('user10', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User10', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user10@example.com', 'Hello, I''m User10.'),
  ('user11', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User11', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user11@example.com', 'Hello, I''m User11.'),
  ('user12', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User12', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user12@example.com', 'Hello, I''m User12.'),
  ('user13', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User13', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user13@example.com', 'Hello, I''m User13.'),
  ('user14', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User14', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user14@example.com', 'Hello, I''m User14.'),
  ('user15', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User15', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user15@example.com', 'Hello, I''m User15.'),
  ('user16', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User16', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user16@example.com', 'Hello, I''m User16.'),
  ('user17', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User17', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user17@example.com', 'Hello, I''m User17.'),
  ('user18', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User18', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user18@example.com', 'Hello, I''m User18.'),
  ('user19', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User19', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user19@example.com', 'Hello, I''m User19.'),
  ('user20', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User20', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user20@example.com', 'Hello, I''m User20.'),
  ('user21', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User21', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user21@example.com', 'Hello, I''m User21.'),
  ('user22', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User22', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user22@example.com', 'Hello, I''m User22.'),
  ('user23', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User23', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user23@example.com', 'Hello, I''m User23.'),
  ('user24', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User24', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user24@example.com', 'Hello, I''m User24.'),
  ('user25', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User25', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user25@example.com', 'Hello, I''m User25.'),
  ('user26', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User26', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user26@example.com', 'Hello, I''m User26.'),
  ('user27', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User27', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user27@example.com', 'Hello, I''m User27.'),
  ('user28', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User28', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user28@example.com', 'Hello, I''m User28.'),
  ('user29', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User29', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user29@example.com', 'Hello, I''m User29.'),
  ('user30', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User30', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user30@example.com', 'Hello, I''m User30.'),
  ('user31', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User31', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user31@example.com', 'Hello, I''m User31.'),
  ('user32', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User32', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user32@example.com', 'Hello, I''m User32.'),
  ('user33', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User33', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user33@example.com', 'Hello, I''m User33.'),
  ('user34', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'User34', 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 'developer', 'user34@example.com', 'Hello, I''m User34.');

--ADD FOLLOWERS
INSERT INTO followed_users (following_user_id, followed_user_id)
VALUES 
  (1, 2), -- Alice follows Bob
  (1, 3), -- Alice follows Carol
  (2, 1), -- Bob follows Alice
  (3, 2), -- Carol follows Bob
  (1, 4), (1, 5), (1, 6),
  (1, 7), (1, 8), (1, 9),
  (1, 10), (1, 11), (1, 12),
  (1, 13), (1, 14), (1, 15),
  (1, 16), (1, 17), (1, 18),
  (1, 19), (1, 20), (1, 21), 
  (1, 22),(1, 23), (1, 24), 
  (1, 25), (1, 26), (1, 27), 
  (1, 28), (1, 29), (1, 30),
  (1, 31), (1, 32), (1, 33), (1, 34); --Alice follows everybody

  --CREATE EVENTS
INSERT INTO events (title, body, owner_id, start_time, end_time, place, category, color, public, recurrence, recurrence_end_date)
VALUES 
-- Události různorodé, většinou user 1
('Morning Run in the Park', 'Meet at the main entrance of Stromovka.', 2,
 '2025-07-26 07:00:00', '2025-07-26 08:00:00', 'Stromovka Park, Prague', 'sports', '#00FF00', TRUE, 'weekly', '2026-07-26'),
('Cybersecurity Talk', 'An online session for everyone interested in IT security.', 1,
 '2025-07-27 18:00:00', '2025-07-27 19:30:00', 'Zoom', 'education', '#0000FF', TRUE, 'once', NULL),
('The Beatflowers Concert', 'A famous indie band performing live.', 1,
 '2025-08-01 20:00:00', '2025-08-01 23:00:00', 'Lucerna Music Bar, Prague', 'music', '#FF00FF', FALSE, 'once', NULL),
('Weekly Coding Meetup', 'Regular coding session with snacks.', 1,
 '2025-08-03 17:00:00', '2025-08-03 20:00:00', 'Campus Library, Prague', 'education', '#FFA500', TRUE, 'weekly', '2026-08-03'),
('Startup Pitch Night', 'Local startups pitch to investors.', 1,
 '2025-08-10 19:00:00', '2025-08-10 21:00:00', 'Impact Hub, Prague', 'business', '#FF6347', TRUE, 'once', NULL),
-- Community Meetups 6–29 (vše user 1)
('Community Meetup 6', 'Description for event 6.', 1, '2025-09-01 10:00:00', '2025-09-01 12:00:00', 'Brno', 'education', '#33FF57', TRUE, 'once', NULL),
('Community Meetup 7', 'Description for event 7.', 1, '2025-09-08 10:00:00', '2025-09-08 12:00:00', 'Brno', 'education', '#33CC33', FALSE, 'once', NULL),
('Community Meetup 8', 'Description for event 8.', 1, '2025-09-15 14:00:00', '2025-09-15 16:00:00', 'Ostrava', 'education', '#339933', TRUE, 'once', NULL),
('Community Meetup 9', 'Description for event 9.', 1, '2025-09-22 14:00:00', '2025-09-22 16:00:00', 'Ostrava', 'education', '#33FFAA', FALSE, 'once', NULL),
('Community Meetup 10', 'Description for event 10.', 1, '2025-09-29 14:00:00', '2025-09-29 16:00:00', 'Ostrava', 'education', '#33FFDD', TRUE, 'monthly', '2026-09-29'),
('Community Meetup 11', 'Description for event 11.', 1, '2025-10-06 10:00:00', '2025-10-06 12:00:00', 'Olomouc', 'education', '#77FF77', TRUE, 'once', NULL),
('Community Meetup 12', 'Description for event 12.', 1, '2025-10-13 10:00:00', '2025-10-13 12:00:00', 'Olomouc', 'education', '#55FF88', TRUE, 'once', NULL),
('Community Meetup 13', 'Description for event 13.', 1, '2025-10-20 10:00:00', '2025-10-20 12:00:00', 'Olomouc', 'education', '#44DD88', FALSE, 'once', NULL),
('Community Meetup 14', 'Description for event 14.', 1, '2025-10-27 10:00:00', '2025-10-27 12:00:00', 'Zlín', 'education', '#33AA88', TRUE, 'once', NULL),
('Community Meetup 15', 'Description for event 15.', 1, '2025-11-03 10:00:00', '2025-11-03 12:00:00', 'Zlín', 'education', '#33AA99', FALSE, 'once', NULL),
('Community Meetup 16', 'Description for event 16.', 1, '2025-11-10 10:00:00', '2025-11-10 12:00:00', 'Zlín', 'education', '#33AAAA', TRUE, 'once', NULL),
('Community Meetup 17', 'Description for event 17.', 1, '2025-11-17 10:00:00', '2025-11-17 12:00:00', 'Plzeň', 'education', '#33AABB', TRUE, 'once', NULL),
('Community Meetup 18', 'Description for event 18.', 1, '2025-11-24 10:00:00', '2025-11-24 12:00:00', 'Plzeň', 'education', '#33AACC', FALSE, 'once', NULL),
('Community Meetup 19', 'Description for event 19.', 1, '2025-12-01 10:00:00', '2025-12-01 12:00:00', 'Plzeň', 'education', '#33AADD', TRUE, 'once', NULL),
('Community Meetup 20', 'Description for event 20.', 1, '2025-12-08 10:00:00', '2025-12-08 12:00:00', 'Praha', 'education', '#33AAEE', TRUE, 'once', NULL),
('Community Meetup 21', 'Description for event 21.', 1, '2025-12-15 10:00:00', '2025-12-15 12:00:00', 'Praha', 'education', '#33AAFF', FALSE, 'once', NULL),
('Community Meetup 22', 'Description for event 22.', 1, '2025-12-22 10:00:00', '2025-12-22 12:00:00', 'Praha', 'education', '#3399FF', TRUE, 'once', NULL),
('Community Meetup 23', 'Description for event 23.', 1, '2025-12-29 10:00:00', '2025-12-29 12:00:00', 'Praha', 'education', '#3388FF', TRUE, 'once', NULL),
('Community Meetup 24', 'Description for event 24.', 1, '2026-01-05 10:00:00', '2026-01-05 12:00:00', 'Praha', 'education', '#3377FF', TRUE, 'once', NULL),
('Community Meetup 25', 'Description for event 25.', 1, '2026-01-12 10:00:00', '2026-01-12 12:00:00', 'Praha', 'education', '#3366FF', FALSE, 'once', NULL),
('Community Meetup 26', 'Description for event 26.', 1, '2026-01-19 10:00:00', '2026-01-19 12:00:00', 'Praha', 'education', '#3355FF', TRUE, 'once', NULL),
('Community Meetup 27', 'Description for event 27.', 1, '2026-01-26 10:00:00', '2026-01-26 12:00:00', 'Praha', 'education', '#3344FF', TRUE, 'once', NULL),
('Community Meetup 28', 'Description for event 28.', 1, '2026-02-02 10:00:00', '2026-02-02 12:00:00', 'Praha', 'education', '#3333FF', FALSE, 'once', NULL),
('Community Meetup 29', 'Description for event 29.', 1, '2026-02-09 10:00:00', '2026-02-09 12:00:00', 'Praha', 'education', '#3322FF', TRUE, 'once', NULL),
-- Posledních 5 pro user 2 (jak chceš)
('Community Meetup 30', 'Description for event 30.', 2, '2026-02-16 10:00:00', '2026-02-16 12:00:00', 'Brno', 'education', '#3311FF', TRUE, 'once', NULL),
('Community Meetup 31', 'Description for event 31.', 2, '2026-02-23 10:00:00', '2026-02-23 12:00:00', 'Brno', 'education', '#3300FF', FALSE, 'once', NULL),
('Community Meetup 32', 'Description for event 32.', 2, '2026-03-01 10:00:00', '2026-03-01 12:00:00', 'Brno', 'education', '#2299FF', TRUE, 'once', NULL),
('Community Meetup 33', 'Description for event 33.', 2, '2026-03-08 10:00:00', '2026-03-08 12:00:00', 'Brno', 'education', '#11AAFF', TRUE, 'weekly', '2026-06-08'),
('Community Meetup 34', 'Description for event 34.', 2, '2026-03-15 10:00:00', '2026-03-15 12:00:00', 'Brno', 'education', '#00BBFF', FALSE, 'once', NULL);

-- ADD USER EVENTS
INSERT INTO events_participants (user_id, event_id, accepted, important)
VALUES 
  (1, 1, FALSE, FALSE),  -- Alice is invited to Bob’s run
  (1, 2, TRUE, TRUE),  -- Alice is participant of her own event
  (3, 1, FALSE, FALSE),  -- Carol is invited too

  (2, 2, TRUE, FALSE), -- Bob joins Alice’s cybersecurity talk
  (2, 1, TRUE, TRUE),  -- Bob is participant of his own event
  (3, 2, TRUE, FALSE), -- Carol joins too

  (1, 3, FALSE, FALSE),  -- Alice is invited to the concert
  (2, 3, FALSE, FALSE),  -- Bob is invited as well
  (3, 3, TRUE, FALSE),  -- Carol is participant of her own event
  (1, 4, TRUE, TRUE),
  (1, 5, TRUE, FALSE),
  (1, 6, TRUE, FALSE),  
  (1, 7, TRUE, FALSE),
  (1, 8, TRUE, FALSE),
  (1, 9, TRUE, FALSE),
  (1, 10, TRUE, FALSE),
  (1, 11, TRUE, FALSE),
  (1, 12, TRUE, FALSE),
  (1, 13, TRUE, FALSE),
  (1, 14, TRUE, FALSE),
  (1, 15, TRUE, FALSE),
  (1, 16, TRUE, FALSE),
  (1, 17, TRUE, FALSE),
  (1, 18, TRUE, FALSE),
  (1, 19, TRUE, FALSE),
  (1, 20, TRUE, FALSE),
  (1, 21, TRUE, FALSE),
  (1, 22, TRUE, TRUE),
  (1, 23, TRUE, FALSE),
  (1, 24, TRUE, TRUE),
  (1, 25, TRUE, TRUE),
  (1, 26, TRUE, FALSE),
  (1, 27, TRUE, FALSE),
  (1, 28, TRUE, FALSE),
  (1, 29, TRUE, FALSE),
  (1, 30, TRUE, FALSE),
  (1, 31, TRUE, FALSE),
  (1, 32, TRUE, FALSE), --Alice has 30 events
  (6, 2, TRUE, FALSE),
  (7, 2, FALSE, TRUE),
  (8, 2, FALSE, TRUE),
  (9, 2, FALSE, TRUE),
  (10, 2, TRUE, TRUE),
  (11, 2, TRUE, FALSE),
  (12, 2, TRUE, FALSE),
  (13, 2, TRUE, FALSE),
  (14, 2, FALSE, TRUE),
  (15, 2, TRUE, FALSE),
  (16, 2, TRUE, FALSE); -- THere are 11 participants for Alice event

-- CREATE NOTIFICATIONS
INSERT INTO notifications (user_id, event_id, type, message)
VALUES
  (1, 1, 'invitation', 'You have been invited to: Morning Run in the Park'),
  (3, 1, 'invitation', 'You have been invited to: Morning Run in the Park'),

  (2, 2, 'reminder', 'Don’t forget the Cybersecurity Talk today!'),
  (3, 2, 'reminder', 'Cybersecurity Talk starts today at 6:00 PM!'),

  (1, 3, 'invitation', 'Carol invited you to The Beatflowers Concert'),
  (2, 3, 'invitation', 'Carol invited you to The Beatflowers Concert');
