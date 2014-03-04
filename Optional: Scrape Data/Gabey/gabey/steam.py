
#coding=utf-8

from gabey.game import Game
from gabey.player import Player
from gabey.player_game_stats import PlayerGameStats
import json

try:
  import urllib.request as urllib2
except:
  import urllib2

try:
  import xml.etree.cElementTree as ET
except ImportError:
  import xml.etree.ElementTree as ET

# TODO: Improve on error handling

class Steam:

  def __init__(self, key):
    self.__key = key
    self.STEAM_WEB_API = 'http://api.steampowered.com/'
    self.STEAM_STORE_API = 'http://store.steampowered.com/api/'

  def get_player_summaries(self, steam_id):
    url = '%sISteamUser/GetPlayerSummaries/v0002/?key=%s&steamids=%s&format=xml' % (self.STEAM_WEB_API, self.__key, steam_id)
    response = urllib2.urlopen(url).read()
    xml = ET.fromstring(response)
    if xml.find('./players/player'):
      country = xml.find('./players/player/loccountrycode').text
      avatar_url = xml.find('./players/player/avatarfull').text
      member_since = int(xml.find('./players/player/timecreated').text)
      player = Player(steam_id, country, member_since, avatar_url)
      return player
    else:
      return None

  def get_owned_games(self, steam_id):
    url = '%sIPlayerService/GetOwnedGames/v0001/?key=%s&steamid=%s&format=xml' % (self.STEAM_WEB_API, self.__key, steam_id)
    response = urllib2.urlopen(url).read()
    try:
      xml = ET.fromstring(response)
      owned_games = []
      for elem in xml.iterfind('games/message'):
        app_id = elem.find('./appid').text
        playtime_forever = int(elem.find('./playtime_forever').text)
        owned_games.append(PlayerGameStats(steam_id, app_id, playtime_forever))
      return owned_games
    except:
      return None

  def get_friends_id(self, steam_id):
    url = '%sISteamUser/GetFriendList/v0001/?key=%s&steamid=%s&relationship=friend&format=xml' % (self.STEAM_WEB_API, self.__key, steam_id)
    response = urllib2.urlopen(url).read()
    try:
      xml = ET.fromstring(response)
      friends = []
      for elem in xml.iterfind('friends/friend'):
        friends.append(elem.find('steamid').text)
      return friends
    except:
      return None

  def get_game_data(self, app_id):
    url = '%sappdetails/?appids=%s&cc=US&l=english&v=1' % (self.STEAM_STORE_API, app_id)
    response = urllib2.urlopen(url).read().decode('utf-8')
    data = json.loads(response)
    if data[app_id]['success']:
      name = data[app_id]['data']['name']
      price = data[app_id]['data']['price_overview']['final'] if "price_overview" in data[app_id]['data'] else "0"
      description = data[app_id]['data']['detailed_description']
      genres = []
      if 'genres' in data[app_id]['data']:
        for line in data[app_id]['data']['genres']:
          genres.append(line['description'])
      game = Game(app_id, name, price, genres, description)
      return game
    else:
      return None