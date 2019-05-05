import unittest
import time
from selenium import webdriver

class Testing(unittest.TestCase):
	def setUp(self):
		self.browser = webdriver.Chrome()
		self.addCleanup(self.browser.quit)

	def testPageTitle(self):
		self.browser.get('http://localhost:8000/splashHome.html')
		time.sleep(10)
		self.browser.find_element_by_id('button1').click()
		time.sleep(4)
		self.browser.find_element_by_id('monOpen').click()
		time.sleep(2)
		self.browser.find_element_by_id('formButtonMon').click()
		self.browser.find_element_by_id('monsterName').send_keys('Goblin')
		self.browser.find_element_by_id('monsterInitiative').send_keys('4')
		self.browser.find_element_by_id('monsterHP').send_keys('35')
		self.browser.find_element_by_id('monsterAC').send_keys('10')
		self.browser.find_element_by_id('monsterPP').send_keys('8')
		self.browser.find_element_by_id('monsterStrength').send_keys('6')
		self.browser.find_element_by_id('monsterDexterity').send_keys('6')
		self.browser.find_element_by_id('monsterConstitution').send_keys('0')
		self.browser.find_element_by_id('monsterIntelligence').send_keys('0')
		self.browser.find_element_by_id('monsterWisdom').send_keys('0')
		self.browser.find_element_by_id('monsterCharisma').send_keys('1')
		self.browser.find_element_by_id('monsterSavingStrength').send_keys('9')
		self.browser.find_element_by_id('monsterSavingDexterity').send_keys('10')
		self.browser.find_element_by_id('monsterSavingConstitution').send_keys('0')
		self.browser.find_element_by_id('monsterSavingIntelligence').send_keys('0')
		self.browser.find_element_by_id('monsterSavingWisdom').send_keys('0')
		self.browser.find_element_by_id('monsterSavingCharisma').send_keys('10')
		time.sleep(2)
		self.browser.find_element_by_id('doneMon').click()
		time.sleep(3)


if __name__ == '__main__':
    unittest.main(verbosity=2)
