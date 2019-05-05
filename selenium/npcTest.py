import unittest
import time
from selenium import webdriver

class Testing(unittest.TestCase):
	def setUp(self):
		self.browser = webdriver.Chrome()
		self.addCleanup(self.browser.quit)

	def testNPCForm(self):
		self.browser.get('http://localhost:8000/splashHome.html')
		time.sleep(10)
		self.browser.find_element_by_id('button1').click()
		time.sleep(4)
		self.browser.find_element_by_id('npcOpen').click()
		time.sleep(2)
		self.browser.find_element_by_id('formButtonNPC').click()
		self.browser.find_element_by_id('npcName').send_keys('Shopkeep')
		self.browser.find_element_by_id('npcInitiative').send_keys('4')
		self.browser.find_element_by_id('npcHP').send_keys('35')
		self.browser.find_element_by_id('npcAC').send_keys('10')
		self.browser.find_element_by_id('npcPerception').send_keys('8')
		self.browser.find_element_by_id('npcStrength').send_keys('6')
		self.browser.find_element_by_id('npcDexterity').send_keys('6')
		self.browser.find_element_by_id('npcConstitution').send_keys('0')
		self.browser.find_element_by_id('npcIntelligence').send_keys('0')
		self.browser.find_element_by_id('npcWisdom').send_keys('0')
		self.browser.find_element_by_id('npcCharisma').send_keys('1')
		self.browser.find_element_by_id('npcStrength').send_keys('9')
		self.browser.find_element_by_id('npcDexterity').send_keys('10')
		self.browser.find_element_by_id('npcConstitution').send_keys('0')
		self.browser.find_element_by_id('npcIntelligence').send_keys('0')
		self.browser.find_element_by_id('npcWisdom').send_keys('0')
		self.browser.find_element_by_id('npcCharisma').send_keys('10')
		time.sleep(2)
		self.browser.find_element_by_id('doneNPC').click()
		time.sleep(3)

	def tearDown(self):
		self.browser.close()

if __name__ == '__main__':
    unittest.main(verbosity=2)
