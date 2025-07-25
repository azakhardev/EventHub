--CREATE USERS
INSERT INTO users (username, password, nickname, about)
VALUES 
  ('alice', 'hashed_password1', 'Alice', 'I love order and organizing my day.'),
  ('bob', 'hashed_password2', 'Bobby', 'Runner and event enthusiast.'),
  ('carol', 'hashed_password3', 'Carol', 'Concert lover and social butterfly.'),
  ('dave', 'hashed_password4', 'Dave', 'Introvert who prefers quiet, well-planned days.');

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
INSERT INTO users_events (user_id, event_id, invitation)
VALUES 
  (1, 1, TRUE),  -- Alice is invited to Bob’s run
  (3, 1, TRUE),  -- Carol is invited too

  (2, 2, FALSE), -- Bob joins Alice’s cybersecurity talk
  (3, 2, FALSE), -- Carol joins too

  (1, 3, TRUE),  -- Alice is invited to the concert
  (2, 3, TRUE);  -- Bob is invited as well

-- CREATE NOTIFICATIONS
INSERT INTO notifications (user_id, event_id, type, message)
VALUES
  (1, 1, 'invitation', 'You have been invited to: Morning Run in the Park'),
  (3, 1, 'invitation', 'You have been invited to: Morning Run in the Park'),

  (2, 2, 'reminder', 'Don’t forget the Cybersecurity Talk today!'),
  (3, 2, 'reminder', 'Cybersecurity Talk starts today at 6:00 PM!'),

  (1, 3, 'invitation', 'Carol invited you to The Beatflowers Concert'),
  (2, 3, 'invitation', 'Carol invited you to The Beatflowers Concert');
