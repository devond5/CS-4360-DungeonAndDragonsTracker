import unittest
import time
from selenium import webdriver

class Testing(unittest.TestCase):
	def setUp(self):
		self.browser = webdriver.Chrome()

	def testCharForm(self):
		driver = self.browser
		driver.get('https://dm-combat-tracker-capstone.herokuapp.com/splashHome.html')
		time.sleep(9)
		driver.find_element_by_id('button1').click()
		time.sleep(1)
		driver.find_element_by_id('charOpen').click()
		time.sleep(1)
		driver.find_element_by_id('formButtonChar').click()
		time.sleep(1)
		driver.find_element_by_id('characterName').send_keys('Haladar')
		driver.find_element_by_id('HP').send_keys('65')
		driver.find_element_by_id('AC').send_keys('15')
		driver.find_element_by_id('PP').send_keys('15')
		driver.find_element_by_id('Strength').send_keys('8')
		driver.find_element_by_id('Dexterity').send_keys('2')
		driver.find_element_by_id('Constitution').send_keys('6')
		driver.find_element_by_id('Intelligence').send_keys('1')
		driver.find_element_by_id('Wisdom').send_keys('1')
		driver.find_element_by_id('Charisma').send_keys('0')
		driver.find_element_by_id('PlayerName').send_keys('Max')
		driver.find_element_by_id('Background').send_keys('Made of cheese')
		driver.find_element_by_id('ClassAndLevel').send_keys('Cleric 10')
		driver.find_element_by_id('Experience').send_keys('55')
		driver.find_element_by_id('Alignment').send_keys('Chaotic Neutral')
		driver.find_element_by_id('Race').send_keys('Martian')
		time.sleep(1)
		driver.find_element_by_id('doneChar').click()
		time.sleep(1)

	def testMonsterForm(self):
		driver = self.browser
		driver.get('https://dm-combat-tracker-capstone.herokuapp.com/splashHome.html')
		time.sleep(9)
		driver.find_element_by_id('button1').click()
		time.sleep(1)
		driver.find_element_by_id('monOpen').click()
		time.sleep(1)
		driver.find_element_by_id('formButtonMon').click()
		time.sleep(1)
		driver.find_element_by_id('monsterName').send_keys('Goblin')
		driver.find_element_by_id('monsterHP').send_keys('35')
		driver.find_element_by_id('monsterAC').send_keys('10')
		driver.find_element_by_id('monsterPP').send_keys('8')
		driver.find_element_by_id('monsterStrength').send_keys('6')
		driver.find_element_by_id('monsterDexterity').send_keys('6')
		driver.find_element_by_id('monsterConstitution').send_keys('0')
		driver.find_element_by_id('monsterIntelligence').send_keys('0')
		driver.find_element_by_id('monsterWisdom').send_keys('0')
		driver.find_element_by_id('monsterCharisma').send_keys('1')
		driver.find_element_by_id('monsterSavingStrength').send_keys('9')
		driver.find_element_by_id('monsterSavingDexterity').send_keys('10')
		driver.find_element_by_id('monsterSavingConstitution').send_keys('0')
		driver.find_element_by_id('monsterSavingIntelligence').send_keys('0')
		driver.find_element_by_id('monsterSavingWisdom').send_keys('0')
		driver.find_element_by_id('monsterSavingCharisma').send_keys('10')
		time.sleep(1)
		driver.find_element_by_id('doneMon').click()
		time.sleep(1)

	def testNPCForm(self):
		driver = self.browser
		driver.get('https://dm-combat-tracker-capstone.herokuapp.com/splashHome.html')
		time.sleep(9)
		driver.find_element_by_id('button1').click()
		time.sleep(1)
		driver.find_element_by_id('npcOpen').click()
		time.sleep(1)
		driver.find_element_by_id('formButtonNPC').click()
		time.sleep(1)
		driver.find_element_by_id('npcName').send_keys('Shopkeep')
		driver.find_element_by_id('npcHP').send_keys('35')
		driver.find_element_by_id('npcAC').send_keys('10')
		driver.find_element_by_id('npcPP').send_keys('8')
		driver.find_element_by_id('npcStrength').send_keys('6')
		driver.find_element_by_id('npcDexterity').send_keys('6')
		driver.find_element_by_id('npcConstitution').send_keys('0')
		driver.find_element_by_id('npcIntelligence').send_keys('0')
		driver.find_element_by_id('npcWisdom').send_keys('0')
		driver.find_element_by_id('npcCharisma').send_keys('1')
		driver.find_element_by_id('npcSavingStrength').send_keys('9')
		driver.find_element_by_id('npcSavingDexterity').send_keys('10')
		driver.find_element_by_id('npcSavingConstitution').send_keys('0')
		driver.find_element_by_id('npcSavingIntelligence').send_keys('0')
		driver.find_element_by_id('npcSavingWisdom').send_keys('0')
		driver.find_element_by_id('npcSavingCharisma').send_keys('10')
		time.sleep(1)
		driver.find_element_by_id('doneNPC').click()
		time.sleep(1)

	def tearDown(self):
		self.browser.close()


if __name__ == '__main__':
    unittest.main(verbosity=2)
