--CREATE USERS
INSERT INTO users (username, password, nickname, profile_picture_url, proffesion, email, about)
VALUES 
  ('alice', 'hashed_password1', 'Alice', 'https://i.redd.it/guys-do-you-think-this-is-an-improvement-to-my-pfp-first-v0-cdsukhn39xef1.jpg?width=1700&format=pjpg&auto=webp&s=d141b6bca0bd278915501359476e95b2e129dd3f', 'scientis', 'alice@gmail.com', 'I love order and organizing my day.'),
  ('bob', 'hashed_password2', 'Bobby', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAATF5rUkFKY0Iqw0oNQxdZQmY3xRZ2Wss-g&s', 'plumber', 'bob@gmail.com','Runner and event enthusiast.'),
  ('carol', 'hashed_password3', 'Carol', 'https://i.pinimg.com/736x/a8/a0/cd/a8a0cd3cbb13ff96d5bfca73b011a07d.jpg', 'OnlyFans model', 'carol@gmail.com','Concert lover and social butterfly.'),
  ('dave', 'hashed_password4', 'Dave', 'https://unchainedcrypto.com/wp-content/uploads/2023/07/pfp-nft.png', 'Twitch Streamer', 'dave@gmail.com','Introvert who prefers quiet, well-planned days.');

--ADD FOLLOWERS
INSERT INTO followed_users (following_user_id, followed_user_id)
VALUES 
  (1, 2), -- Alice follows Bob
  (1, 3), -- Alice follows Carol
  (2, 1), -- Bob follows Alice
  (3, 2); -- Carol follows Bob

  --CREATE EVENTS
  INSERT INTO events (title, body, owner_id, start_time, end_time, place, category, color, public, recurrence)
VALUES 
  ('Morning Run in the Park', 'Meet at the main entrance of Stromovka.', 2,
   '2025-07-26 07:00:00', '2025-07-26 08:00:00', 'Stromovka Park, Prague', 'sports', '#00FF00', TRUE, 'weekly'),
  ('Cybersecurity Talk', 'An online session for everyone interested in IT security.', 1,
   '2025-07-27 18:00:00', '2025-07-27 19:30:00', 'Zoom', 'education', '#0000FF', TRUE, 'once'),
  ('The Beatflowers Concert', 'A famous indie band performing live.', 3,
   '2025-08-01 20:00:00', '2025-08-01 23:00:00', 'Lucerna Music Bar, Prague', 'music', '#FF00FF', TRUE, 'once');

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
  (3, 3, TRUE, TRUE);  -- Carol is participant of her own event

-- CREATE NOTIFICATIONS
INSERT INTO notifications (user_id, event_id, type, message)
VALUES
  (1, 1, 'invitation', 'You have been invited to: Morning Run in the Park'),
  (3, 1, 'invitation', 'You have been invited to: Morning Run in the Park'),

  (2, 2, 'reminder', 'Don’t forget the Cybersecurity Talk today!'),
  (3, 2, 'reminder', 'Cybersecurity Talk starts today at 6:00 PM!'),

  (1, 3, 'invitation', 'Carol invited you to The Beatflowers Concert'),
  (2, 3, 'invitation', 'Carol invited you to The Beatflowers Concert');
