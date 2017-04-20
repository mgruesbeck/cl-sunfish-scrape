# import module
from craigslist import CraigslistForSale

# create variable with parameters
cl_s = CraigslistForSale(site='sfbay', category='boa', filters={'query': 'sunfish'})

# loop thru results and print
for result in cl_s.get_results(sort_by='newest'):
    print result
