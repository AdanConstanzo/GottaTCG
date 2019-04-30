from pokemontcgsdk import *
from pymongo import MongoClient
import os
import requests

from pokemontcgsdk import *
from pymongo import MongoClient

def stabalize_card(card):
  card_dic = card.__dict__
  card_dic["pokemonSet"] = card_dic["set"]
  card_dic["image_url"] = card_dic["image_url"].replace("https://images.pokemontcg.io/", "/images/cards/")
  return card_dic

class TCG_DB():
  def __init__(self, uri):
    self.client = MongoClient(uri)
  def set_sets_to_db(self):
    set = []
    Sets = Set.all()
    for x in range(len(Sets)):
      temp = Sets[x].__dict__
      temp["number"] = x
      set.append(temp)
    sets = self.client.gottatcg.sets
    sets.insert_many(set)

  def set_cards_to_db(self):
    card = []
    Cards = Card.all()
    for x in range(len(Cards)):
      temp = Cards[x].__dict__
      try:
        temp["price"] = None
        temp["number"] = int(temp["number"])
      except ValueError:
        print(temp["number"])
      card.append(temp)
    cards_db = self.client.gottatcg.cards
    cards_db.insert_many(card)


tcg_db = TCG_DB("mongodb://localhost:27017/")

# tcg_db.set_sets_to_db()
tcg_db.set_cards_to_db()
