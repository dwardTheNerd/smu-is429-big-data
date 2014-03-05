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

## The process
Here is a summary of the entire process of the work I did:
1. Scrape data on Steam
2. Set up S3 in preparation to run MapReduce on AWS EMR
3. Setup and launch AWS EMR cluster
4. Add a Hive step
5. Wait for results
6. Fetch results
7. Visualize

## Results
The summary of my analysis done using Hadoop and Hive can be found [here](http://ec2-54-254-255-84.ap-southeast-1.compute.amazonaws.com/steam/)


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
5. Download and extract the repository. Go to "Step 1: Prepare S3" folder
6. Go into "bootstrap-actions" and open "transfer-lib.sh" with a text editor of your choice. You should see something like this:
    ```
    #!/bin/sh

    hadoop fs -copyToLocal s3n://<your-s3-bucket>/lib/csv-serde-0.9.1.jar $HADOOP_HOME/lib/
    ```

7. Insert your S3 bucket name and save the file
8. Go back to "Step 1: Prepare S3" folder and upload the files within the subfolders to the respective folders in S3
9. Download the 3 datasets and upload them to the respective subfolders within the "data" folder

### Setting & running Elastic MapReduce (EMR) instance
1. Go to your AWS Management Console and select "Elastic MapReduce"
2. Create a new cluster
3. Fill in an appropriate name for your cluster: ![EMR Configuration 1](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration.png)
4. Under "Applications to be installed" section, remove "Pig" and select "HBase": ![EMR Configuration 2](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration2.png)
5. Click on the button to add a boostrap action
6. Specify the location of the boostrap action script (it should be in your new S3 bucket): ![EMR Configuration 3](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration3.png)
7. Click on the button to add a step
8. Specify the location of the Hive script, your data folder and your output folder: ![EMR Configuration 4](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/EMR_Cluster_Configuration5.png)
9. Click on the "Add" button when done and complete the entire instance creation process
10. Wait for the step to complete

### Setting up EC2
1. Go to your AWS Management Console and select "EC2"
2. Launch an instance
3. Select Amazon Linux AMI 32-bit and proceed
4. You can leave the rest of the settings as default except for the Security Group configuration
5. At the Configure Security Group page, click on "Add Rule", select "HTTP" from the dropdown box and proceed
6. Before completing the process, make sure to select an existing key-pair or create a new one. Remember to download and .pem file as we need it to ssh into the new instance
7. Once the new EC2instance is ready, select it in your "Instances" page and click on the "Connect" button. Follow the instructions to connect to your instance
8. Once you have ssh into your new instance, type the following command into your terminal:
    `sudo yum groupinstall -y "Web Server"`
9. Once finish installing Apache web server, type the following command into your terminal to start the server:
    ```
    sudo service httpd start
    sudo chkconfig httpd on
    ```

10. Enter your instance's public DNS into any browser and make sure that you are able to view the test page: ![Apache Test Page](https://s3-ap-southeast-1.amazonaws.com/smu-is429-steam/images/ec3.png)
11. If you are unable to view the test page, chances are you did not set open an inbound connection for port 80. You can do so in the "Security Groups" page
12. Now we need to set file permissions before we can upload files to the web server. Just type the following commands in order:
    ```
    sudo groupadd www
    sudo usermod -a -G www ec2-user
    ```

13. Now log out by typing: `exit`
14. Log back in again and type the following command `groups` and make sure you see the following: `ec2-user wheel www`
15. Now type the following commands:
    ```
    sudo chown -R root:www /var/www
    sudo chmod 2775 /var/www`
    find /var/www -type d -exec sudo chmod 2775 {} +
    find /var/www -type f -exec sudo chmod 0664 {} +
    ```

16. Now ec2_user and any future members in the www group can add, delete and edit files in the Apache document root. Type `exit` to logout of the session

### Preparing for visualization
1. Go to "Step 4: Visualization" folder
2. Open "fetch_results.py" with a text-editor of your choice
3. Insert your aws access key and aws secret key
4. To get your aws access key and secret key, go to your AWS Management Console, on the top-right hand corner, select your name and click on "Security Credentials". If you do not have any key, just create one and take note of the values
5. With "fetch_results.py" still open, insert the name of the S3 bucket you created for this tutorial
6. Now we need to transfer our html files over to our new Apache web server. Type the following command in your terminal:
    `scp -i yourpem.pem -r ./Step\ 4:\ Visualize/ ec2-user@<aws-instance-public-dns>:/var/www/html/`

   Make sure you specify your .pem file correctly and correctly point to the correct directory where the "Step 4: Visualize" folder is located. Also insert your instance's public dns
7. Once completing the transfer, connect (ssh) back to your instance from your terminal
8. We can check if the folder and its contents are transferred correctly by typing the following command:
    `ls /var/www/html/`

   You should be able to see "Step 4: Visualize" folder
9. Now we are going to rename the folder to something easier to remember. Type the following commands:
    `mv /var/www/html/Step\ 4:\ Visualize /var/www/html/steam`
10. Now we need to fetch the results from our Amazon EMR! Type the following commands:
    ```
    cd /var/www/html/steam
    python fetch_results.py
    ls results`
    ```

   You should be able to see some csv files in the output
11. Now we can check out our page! Open you browser, enter the following url:
    `<your-public-dns>/steam/`
12. You should be able to view something like [this](http://ec2-54-254-255-84.ap-southeast-1.compute.amazonaws.com/steam/)

## What I learnt
1. Writing my own python scraper
2. Developing a simple API wrapper
3. Learning how to create a python package using setuptools
4. Learning how to setup Apache Hadoop and Hive
5. Learning how to write a simple MapReduce script
6. Learning how to write HiveQL
7. Learning how to integrate different AWS products together
8. I need time to learn D3.js!!!!
9. Troubleshooting....A LOT of troubleshooting...