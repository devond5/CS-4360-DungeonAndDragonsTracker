import unittest
import time
from selenium import webdriver

class Testing(unittest.TestCase):
	def setUp(self):
		self.browser = webdriver.Chrome()
		self.addCleanup(self.browser.quit)

	def testMonsterForm(self):
		driver = self.browser
		driver.get('http://localhost:8000/splashHome.html')
		time.sleep(10)
		driver.find_element_by_id('button1').click()
		time.sleep(4)
		driver.find_element_by_id('monOpen').click()
		time.sleep(2)
		driver.find_element_by_id('formButtonMon').click()
		driver.find_element_by_id('monsterName').send_keys('Goblin')
		driver.find_element_by_id('monsterInitiative').send_keys('4')
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
		time.sleep(2)
		driver.find_element_by_id('doneMon').click()
		time.sleep(3)

	def tearDown(self):
		self.browser.close()


if __name__ == '__main__':
    unittest.main(verbosity=2)
