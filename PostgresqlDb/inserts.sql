--TRUNCATE TABLES
TRUNCATE TABLE notifications RESTART IDENTITY CASCADE;
TRUNCATE TABLE events_participants RESTART IDENTITY CASCADE;
TRUNCATE TABLE events RESTART IDENTITY CASCADE;
TRUNCATE TABLE followed_users RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;

--CREATE USERS
INSERT INTO users (username, password, nickname, profile_picture_url, proffesion, email, about)
VALUES 
  ('alice', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Alice', 
   'https://i.redd.it/guys-do-you-think-this-is-an-improvement-to-my-pfp-first-v0-cdsukhn39xef1.jpg?width=1700&format=pjpg&auto=webp&s=d141b6bca0bd278915501359476e95b2e129dd3f', 
   'scientist', 'alice@gmail.com', 
   'Alice is a passionate scientist who thrives on curiosity and constant discovery. She enjoys structuring her day with precision and believes that every detail matters when it comes to research and personal life. Outside the lab, she loves organizing community meetups, attending intellectual talks, and sharing her knowledge with others in a way that inspires them. Her calm and focused personality makes her a reliable friend and colleague who always finds solutions to problems.'),
  
  ('bob', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Bobby', 
   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAATF5rUkFKY0Iqw0oNQxdZQmY3xRZ2Wss-g&s', 
   'plumber', 'bob@gmail.com',
   'Bob is a hardworking plumber with a big heart and an even bigger sense of humor. Known among his friends as Bobby, he brings positive energy to every situation. When he isn’t fixing pipes, he enjoys running in the park, meeting new people at local events, and cheering for his favorite football team. His practical mindset and hands-on skills make him the kind of person who can always be counted on in everyday life. He believes that hard work and laughter are the best combinations for a fulfilling life.'),

  ('carol', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Carol', 
   'https://i.pinimg.com/736x/a8/a0/cd/a8a0cd3cbb13ff96d5bfca73b011a07d.jpg', 
   'OnlyFans model', 'carol@gmail.com',
   'Carol is an outgoing and social personality who loves being in the spotlight. She has built a career as an online creator and model, sharing her confidence and creativity with a wide audience. Music festivals, concerts, and parties are her natural habitat, where she connects with people and spreads her vibrant energy. Carol balances her glamorous side with genuine friendships and meaningful conversations, proving that she’s more than just a pretty face—she’s a true social butterfly who knows how to light up any room.'),

  ('guest', '$2a$12$ERUZ3IHsyPuV/phmYnZU7e.6FmB0Is9RDqP5gcdceMo.3vj6zIDHO', 'Test user', 
   'https://unchainedcrypto.com/wp-content/uploads/2023/07/pfp-nft.png', 
   'Tester', 'guest@gmail.com',
   'This guest profile represents an introverted personality who values peace, order, and predictability in daily life. Unlike those who thrive in the spotlight, the guest prefers quiet evenings, reading, and carefully planned activities. They approach challenges with patience and precision, making them a dependable team member in projects that require accuracy. While they may not always seek social gatherings, they truly appreciate deep conversations and the comfort of a small, close-knit circle of friends.'),
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
  (1, 31), (1, 32), (1, 33), (1, 34); --Alice follows everyone

  --CREATE EVENTS
INSERT INTO events (title, body, owner_id, start_time, end_time, place, category, color, public, recurrence, recurrence_end_date)
VALUES
-- Alice Events
('Morning Run', 'Join us for a refreshing run in the park to start the day with energy.', 2, NOW() + INTERVAL '0 day' + INTERVAL '7 hour', NOW() + INTERVAL '0 day' + INTERVAL '9 hour', 'Central Park', 'sport', '#FF5733', true, 'monthly', NOW() + INTERVAL '180 day'),
('Tech Conference', 'A gathering of developers and tech enthusiasts to discuss the latest trends.', 1, NOW() + INTERVAL '1 day' + INTERVAL '10 hour', NOW() + INTERVAL '1 day' + INTERVAL '18 hour', 'Prague Congress Centre', 'tech', '#33C1FF', true, 'once', NULL),
('Music Festival', 'Live performances from popular bands and artists across multiple stages.', 1, NOW() + INTERVAL '2 day' + INTERVAL '14 hour', NOW() + INTERVAL '2 day' + INTERVAL '23 hour', 'Old Town Square', 'music', '#9B59B6', true, 'once', NULL),
('Startup Pitch Night', 'Watch entrepreneurs pitch their ideas to investors and industry experts.', 1, NOW() + INTERVAL '3 day' + INTERVAL '18 hour', NOW() + INTERVAL '3 day' + INTERVAL '22 hour', 'Impact Hub Prague', 'tech', '#27AE60', true, 'weekly', NOW() + INTERVAL '60 day'),
('Art Exhibition', 'A showcase of contemporary art from emerging local artists.', 1, NOW() + INTERVAL '4 day' + INTERVAL '11 hour', NOW() + INTERVAL '4 day' + INTERVAL '17 hour', 'DOX Centre for Contemporary Art', 'art', '#F1C40F', false, 'once', NULL),
('Cooking Workshop', 'Learn to cook delicious Italian dishes with a professional chef.', 1, NOW() + INTERVAL '5 day' + INTERVAL '16 hour', NOW() + INTERVAL '5 day' + INTERVAL '19 hour', 'Culinary Studio Praha', 'education', '#E67E22', true, 'once', NULL),
('Yoga in the Park', 'Outdoor yoga class to relax and recharge body and mind.', 1, NOW() + INTERVAL '6 day' + INTERVAL '8 hour', NOW() + INTERVAL '6 day' + INTERVAL '10 hour', 'Stromovka Park', 'sport', '#2ECC71', true, 'weekly', NOW() + INTERVAL '120 day'),
('Wine Tasting Evening', 'Experience fine wines with a professional sommelier.', 1, NOW() + INTERVAL '7 day' + INTERVAL '19 hour', NOW() + INTERVAL '7 day' + INTERVAL '22 hour', 'Wine Cellar Vinohrady', 'social', '#8E44AD', false, 'once', NULL),
('Photography Walk', 'Explore the city while learning street photography techniques.', 1, NOW() + INTERVAL '8 day' + INTERVAL '13 hour', NOW() + INTERVAL '8 day' + INTERVAL '16 hour', 'Charles Bridge', 'art', '#3498DB', true, 'once', NULL),
('Book Club Meeting', 'Discuss the monthly book with fellow literature enthusiasts.', 1, NOW() + INTERVAL '9 day' + INTERVAL '18 hour', NOW() + INTERVAL '9 day' + INTERVAL '21 hour', 'Municipal Library Prague', 'education', '#16A085', true, 'once', NULL),
('Marathon Training', 'Join our group for a long-distance run in preparation for the city marathon.', 1, NOW() + INTERVAL '10 day' + INTERVAL '7 hour', NOW() + INTERVAL '10 day' + INTERVAL '11 hour', 'Letná Park', 'sport', '#E74C3C', true, 'once', NULL),
('Board Game Night', 'Play modern board games with other enthusiasts.', 1, NOW() + INTERVAL '11 day' + INTERVAL '18 hour', NOW() + INTERVAL '11 day' + INTERVAL '23 hour', 'Board Game Café', 'social', '#34495E', false, 'weekly', NOW() + INTERVAL '60 day'),
('Film Screening', 'Watch a classic movie under the stars.', 1, NOW() + INTERVAL '12 day' + INTERVAL '20 hour', NOW() + INTERVAL '12 day' + INTERVAL '23 hour', 'Riegrovy Sady', 'art', '#1ABC9C', true, 'once', NULL),
('Charity Gala', 'Support a good cause at this formal evening event.', 1, NOW() + INTERVAL '13 day' + INTERVAL '19 hour', NOW() + INTERVAL '13 day' + INTERVAL '23 hour', 'Žofín Palace', 'social', '#C0392B', true, 'once', NULL),
('Hackathon Weekend', 'Develop innovative solutions in teams during a 48-hour hackathon.', 1, NOW() + INTERVAL '14 day' + INTERVAL '9 hour', NOW() + INTERVAL '16 day' + INTERVAL '9 hour', 'Czech Technical University', 'tech', '#2980B9', true, 'once', NULL),
('Stand-up Comedy Night', 'Enjoy performances from local comedians.', 1, NOW() + INTERVAL '15 day' + INTERVAL '20 hour', NOW() + INTERVAL '15 day' + INTERVAL '23 hour', 'Comedy Club Praha', 'art', '#F39C12', false, 'weekly', NOW() + INTERVAL '60 day'),
('Craft Fair', 'Discover handmade goods and meet local artisans.', 1, NOW() + INTERVAL '16 day' + INTERVAL '10 hour', NOW() + INTERVAL '16 day' + INTERVAL '17 hour', 'Náplavka', 'art', '#7D3C98', true, 'once', NULL),
('Jazz Concert', 'Live jazz music from top Czech and international performers.', 1, NOW() + INTERVAL '17 day' + INTERVAL '19 hour', NOW() + INTERVAL '17 day' + INTERVAL '22 hour', 'Jazz Dock', 'music', '#2C3E50', true, 'once', NULL),
('Startup Networking', 'Connect with entrepreneurs, investors and innovators.', 1, NOW() + INTERVAL '18 day' + INTERVAL '18 hour', NOW() + INTERVAL '18 day' + INTERVAL '21 hour', 'WeWork Prague', 'tech', '#D35400', true, 'once', NULL),
('Coding Bootcamp', 'Intensive one-day coding bootcamp for beginners.', 1, NOW() + INTERVAL '19 day' + INTERVAL '9 hour', NOW() + INTERVAL '19 day' + INTERVAL '17 hour', 'Campus Prague', 'education', '#BDC3C7', true, 'once', NULL),
('Street Food Festival', 'Taste food from around the world at this open-air festival.', 1, NOW() + INTERVAL '20 day' + INTERVAL '11 hour', NOW() + INTERVAL '20 day' + INTERVAL '20 hour', 'Holešovická tržnice', 'social', '#A93226', true, 'once', NULL),
('Career Fair', 'Meet employers and explore job opportunities.', 1, NOW() + INTERVAL '21 day' + INTERVAL '10 hour', NOW() + INTERVAL '21 day' + INTERVAL '15 hour', 'Prague Exhibition Grounds', 'education', '#229954', true, 'once', NULL),
('Meditation Retreat', 'A day of mindfulness, meditation, and relaxation.', 1, NOW() + INTERVAL '22 day' + INTERVAL '8 hour', NOW() + INTERVAL '22 day' + INTERVAL '18 hour', 'Monastery Gardens', 'sport', '#AF7AC5', false, 'once', NULL),
('Fashion Show', 'Experience the latest fashion trends from local designers.', 1, NOW() + INTERVAL '23 day' + INTERVAL '19 hour', NOW() + INTERVAL '23 day' + INTERVAL '22 hour', 'Fashion Hall', 'art', '#5DADE2', true, 'once', NULL),
('Science Fair', 'Engaging experiments and demonstrations for all ages.', 1, NOW() + INTERVAL '24 day' + INTERVAL '9 hour', NOW() + INTERVAL '24 day' + INTERVAL '16 hour', 'National Technical Museum', 'education', '#58D68D', true, 'once', NULL),
('Dance Workshop', 'Learn salsa and bachata with professional instructors.', 1, NOW() + INTERVAL '25 day' + INTERVAL '17 hour', NOW() + INTERVAL '25 day' + INTERVAL '20 hour', 'Dance Studio Praha', 'art', '#F1948A', false, 'weekly', NOW() + INTERVAL '60 day'),
('Football Match', 'Local teams compete in a thrilling football game.', 1, NOW() + INTERVAL '26 day' + INTERVAL '16 hour', NOW() + INTERVAL '26 day' + INTERVAL '18 hour', 'Eden Arena', 'sport', '#117A65', true, 'once', NULL),
('History Lecture', 'Educational talk on Czech medieval history.', 1, NOW() + INTERVAL '27 day' + INTERVAL '15 hour', NOW() + INTERVAL '27 day' + INTERVAL '17 hour', 'Charles University', 'education', '#2471A3', true, 'once', NULL),
('History Lecture 2', 'Educational talk on Czech medieval history.', 1, NOW() + INTERVAL '27 day' + INTERVAL '15 hour', NOW() + INTERVAL '27 day' + INTERVAL '17 hour', 'Charles University', 'education', '#2471A3', true, 'once', NULL),

-- 5 Bobs Events
('Startup Demo Day', 'Startups present their products to the public and investors.', 2, NOW() + INTERVAL '28 day' + INTERVAL '13 hour', NOW() + INTERVAL '28 day' + INTERVAL '18 hour', 'CAMP Praha', 'tech', '#884EA0', true, 'once', NULL),
('Charity Run', 'Participate in a 5K charity run supporting local hospitals.', 2, NOW() + INTERVAL '29 day' + INTERVAL '9 hour', NOW() + INTERVAL '29 day' + INTERVAL '12 hour', 'Stromovka Park', 'sport', '#F5B041', true, 'once', NULL),
('Outdoor Theater', 'Watch a Shakespeare play performed in the open air.', 2, NOW() + INTERVAL '30 day' + INTERVAL '20 hour', NOW() + INTERVAL '30 day' + INTERVAL '23 hour', 'Vyšehrad', 'art', '#1F618D', false, 'once', NULL),
('Networking Breakfast', 'Morning networking session with coffee and croissants.', 2, NOW() + INTERVAL '31 day' + INTERVAL '8 hour', NOW() + INTERVAL '31 day' + INTERVAL '10 hour', 'Business Café Praha', 'social', '#52BE80', true, 'weekly', NOW() + INTERVAL '365 day'),
('New Year Celebration', 'Celebrate the New Year with music, food, and fireworks.', 2, NOW() + INTERVAL '35 day' + INTERVAL '21 hour', NOW() + INTERVAL '36 day' + INTERVAL '2 hour', 'Prague Castle', 'social', '#F39C12', true, 'once', NULL);


-- ADD USER EVENTS
INSERT INTO events_participants (user_id, event_id, accepted, important)
VALUES 
  (1, 1, FALSE, FALSE),  
  (1, 2, TRUE, TRUE),  
  (3, 1, FALSE, FALSE),
  (2, 2, TRUE, FALSE), 
  (2, 1, TRUE, TRUE),  
  (2, 4, TRUE, TRUE),  
  (3, 4, TRUE, TRUE),  
  (3, 2, TRUE, FALSE), 
  (1, 3, FALSE, FALSE),  
  (2, 3, FALSE, FALSE),  
  (3, 3, TRUE, FALSE),  
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
  (16, 2, TRUE, FALSE); -- There are 11 participants for Alice event

-- CREATE NOTIFICATIONS
INSERT INTO notifications (user_id, event_id, type, message)
VALUES
  (1, 1, 'DELETE', 'User Bob deleted event Midnight Party');
