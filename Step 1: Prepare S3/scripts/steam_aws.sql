ADD JAR s3://smu-is429-steam/lib/csv-serde-0.9.1.jar;

CREATE DATABASE IF NOT EXISTS steamDB;
USE steamDB;

-- Creating tables to insert data

CREATE EXTERNAL TABLE IF NOT EXISTS players (
  steamID STRING,
  country STRING,
  dateJoined STRING
)
ROW FORMAT SERDE 'com.bizo.hive.serde.csv.CSVSerde'
STORED AS TEXTFILE
LOCATION 's3://smu-is429-steam/data/players/';

CREATE EXTERNAL TABLE IF NOT EXISTS games (
  appID STRING,
  name STRING,
  price INT,
  genres STRING
)
ROW FORMAT SERDE 'com.bizo.hive.serde.csv.CSVSerde'
STORED AS TEXTFILE
LOCATION 's3://smu-is429-steam/data/games/';

CREATE EXTERNAL TABLE IF NOT EXISTS game_stats (
  steamID STRING,
  appID STRING,
  gameName STRING,
  hoursPlayed FLOAT,
  url STRING
)
ROW FORMAT SERDE 'com.bizo.hive.serde.csv.CSVSerde'
STORED AS TEXTFILE
LOCATION 's3://smu-is429-steam/data/game_stats/';

CREATE EXTERNAL TABLE IF NOT EXISTS total_spent_by_players (
  steamID STRING,
  totalAmt BIGINT
)
ROW FORMAT SERDE 'com.bizo.hive.serde.csv.CSVSerde'
STORED AS TEXTFILE
LOCATION 's3://smu-is429-steam/output/total_spent_by_players/';

CREATE EXTERNAL TABLE IF NOT EXISTS popular_genres (
  gameName STRING,
  average DOUBLE
)
ROW FORMAT SERDE 'com.bizo.hive.serde.csv.CSVSerde'
STORED AS TEXTFILE
LOCATION 's3://smu-is429-steam/output/popular_genres/';

CREATE EXTERNAL TABLE IF NOT EXISTS most_played_games (
  gameName STRING,
  average FLOAT
)
ROW FORMAT SERDE 'com.bizo.hive.serde.csv.CSVSerde'
STORED AS TEXTFILE
LOCATION 's3://smu-is429-steam/output/most_played_games/';

CREATE EXTERNAL TABLE IF NOT EXISTS most_owned_games (
  gameName STRING,
  total INT
)
ROW FORMAT SERDE 'com.bizo.hive.serde.csv.CSVSerde'
STORED AS TEXTFILE
LOCATION 's3://smu-is429-steam/output/most_owned_games/';



-- Run analytical queries and output them

INSERT OVERWRITE TABLE total_spent_by_players 
SELECT game_stats.steamID, SUM(games.price) AS total_amt
FROM game_stats
JOIN games ON game_stats.appID = games.appID
GROUP BY game_stats.steamID
ORDER BY total_amt DESC;

INSERT OVERWRITE TABLE popular_genres 
SELECT games.genres, AVG(game_stats.hoursPlayed) AS average
FROM games
JOIN game_stats on game_stats.appID = games.appID
GROUP BY games.genres
HAVING LENGTH(games.genres) > 0
ORDER BY average DESC;

INSERT OVERWRITE TABLE most_played_games 
SELECT games.name, AVG(game_stats.hoursPlayed) AS average
FROM game_stats
JOIN games ON game_stats.appID = games.appID
GROUP BY games.name
ORDER BY average DESC;

INSERT OVERWRITE TABLE most_owned_games 
SELECT games.name, COUNT(*) AS total
FROM game_stats
JOIN games ON game_stats.appID = games.appID
GROUP BY games.name, games.price
HAVING games.price > 0
ORDER BY total DESC;