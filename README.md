# Edward's Big Data Cloud Computing Problem

## Introduction
As part of my SMU IS429 assignment, I am tasked to search for my own dataset and process it using available cloud resources.

## The Problem
Here are the problems I have identified for this assignment:
* On average, how much are players willing to spend on Steam?
* What are the most popular genre(s) of games?
* What are the type games that have high replay values?
* What are the type of games that players like to buy?

## Datasets
For this assignment, I have decided to scrape data from Steam's API. The scraping process produced 3 csv files:
* [players.csv](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/data/players/players.csv)
* [games.csv](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/data/games/games.csv)
* [game_stats.csv](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/data/game_stats/game_stats.csv)

### players.csv
This dataset consists of some player summaries that is available through Steam's Web API. There are 27,330 player records in this file. There are 3 fields in the file with each field being separated by a comma(,). The fields are: Steam ID, Country, Joined Date. A sample of the data is as shown:

    76561198116221765,Russian Federation,"November 29, 2013"
    76561197999942309, United States,"July 16, 2008"
    76561198111807975, Russian Federation,"October 22, 2013"
    76561198118157094,Russian Federation,"December 14, 2013"

### games.csv
This dataset consists of a subset of the games that is available on Steam through its Steam Big Picture API. There are 3,102 records in this dataset. Due to time constraints, I am unable to scrape the entire database of games on Steam. So what I managed to scrape is all the games that are owned by all the players in the players.csv file. This ensures that I am able to perform meaningful analysis in the later stages. There are 4 fields in the file with each field being separated by a comma(,). The fields are: App ID, Game Title, Price in USD & cents, Genres. A sample of the data is as shown:

    40,Team Fortress 2,0,"Action,Free to Play"
    500,Left 4 Dead,1999,Action
    55230,Saints Row: The Third,1999,Action
    4000,Garry's Mod,999,"Indie,Simulation"
    550,Left 4 Dead 2,1999,Action

### game_stats.csv
This dataset consists of all the player's game stats as of 01/03/2014. There are 1,836,985 records in this dataset. There are 5 fields in the file with each field being seperated by a comma(,). The fields are: Steam ID, App ID, Game Title, Hours Played, Game Stats URL. A sample of the data is as shown:

    "76561197988460793","202530","SONIC THE HEDGEHOG 4 Episode I","0.5","http://steamcommunity.com/profiles/76561197988460793/stats/202530"
    "76561197988460793","203650","SONIC THE HEDGEHOG 4 Episode II","0","http://steamcommunity.com/profiles/76561197988460793/stats/203650"
    "76561197988460793","99900","Spiral Knights","1.4","http://steamcommunity.com/profiles/76561197988460793/stats/SpiralKnights"
    "76561197988460793","17520","Synergy","14.5","http://steamcommunity.com/profiles/76561197988460793/stats/Synergy"
    "76561197988460793","20","Team Fortress Classic","0","http://steamcommunity.com/profiles/76561197988460793/stats/20"

## Tutorial
This tutorial shall walk you through the steps I had taken to complete this assignment. As I used Amazon Web Services exclusively for this assignment, please ensure that you have an account and is able to access Amazon Web Services before proceeding with the tutorial. Please download the entire repository as well and extract them to your work space.

### Setting up S3
1. Create a bucket in S3
2. Create the following folders in your new bucket:
..* bootstrap-actions
..* data
..* images
..* lib
..* logs
..* output
..* scripts
3. Create the following subfolders within your output folder:
..* most_owned_games
..* most_played_games
..* popular_genres
..* total_spent_by_players
4. Create the following subfolders within your data folder:
..* game_stats
..* games
..* players
7. Go to "Step 1: Prepare S3" folder and upload the files within the subfolders to the respective folders in S3
8. Download the 3 datasets and upload them to the respective subfolders within the "data" folder

### Setting up Elastic MapReduce (EMR) instance
1. Go to your AWS Management Console and select "Elastic MapReduce"
2. Create a new cluster
3. Fill in an appropriate name for your cluster: ![EMR Configuration 1](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration.png)
4. Under "Applications to be installed" section, remove "Pig" and select "HBase": ![EMR Configuration 2](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration2.png)
5. Click on the button to add a boostrap action
6. Specify the location of the boostrap action script (it should be in your new S3 bucket): ![EMR Configuration 3](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration3.png)
7. Click on the button to add a step
8. Specify the location of the Hive script, your data folder and your output folder: ![EMR Configuration 4](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration5.png)