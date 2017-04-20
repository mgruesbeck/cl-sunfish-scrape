# import module
from craigslist import CraigslistForSale

# create variable with parameters
cl_s = CraigslistForSale(site='sfbay', category='boa', filters={'query': 'sunfish'})

# loop thru results and print
for result in cl_s.get_results(sort_by='newest'):
    print result

'''
1. run twice a day
2. create an array of objects from query and write locally to data.json
3. create variable which stores latest post date as current date
4. if latest post date is newer than current date send email notification
'''

