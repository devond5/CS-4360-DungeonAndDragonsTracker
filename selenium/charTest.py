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
		self.browser.find_element_by_id('charOpen').click()
		time.sleep(2)
		self.browser.find_element_by_id('formButtonChar').click()
		self.browser.find_element_by_id('characterName').send_keys('Haladar')
		self.browser.find_element_by_id('HP').send_keys('65')
		self.browser.find_element_by_id('AC').send_keys('15')
		self.browser.find_element_by_id('PP').send_keys('15')
		self.browser.find_element_by_id('Strength').send_keys('8')
		self.browser.find_element_by_id('Dexterity').send_keys('2')
		self.browser.find_element_by_id('Constitution').send_keys('6')
		self.browser.find_element_by_id('Intelligence').send_keys('1')
		self.browser.find_element_by_id('Wisdom').send_keys('1')
		self.browser.find_element_by_id('Charisma').send_keys('0')
		self.browser.find_element_by_id('PlayerName').send_keys('Max')
		self.browser.find_element_by_id('Background').send_keys('Made of cheese')
		self.browser.find_element_by_id('ClassAndLevel').send_keys('Cleric 10')
		self.browser.find_element_by_id('Experience').send_keys('55')
		self.browser.find_element_by_id('Alignment').send_keys('Chaotic Neutral')
		self.browser.find_element_by_id('Race').send_keys('Martian')
		time.sleep(2)
		self.browser.find_element_by_id('doneChar').click()
		time.sleep(3)


if __name__ == '__main__':
    unittest.main(verbosity=2)
