##

Configurations to get Gitpod and MongoDB to communicate

##

MONGODB
* Update access list to allow ALL IP addresses
** https://cloud.mongodb.com/v2/6576905cc040b63e70c05466#/security/network/accessList
*** We need to find a more permanent solution so we can use a more secure method

GITPOD
* Open backend port (5000) on ports tab by clicking the lock button - state should be open(public)
* On every page where axios.post is called, you will need to update the link to whatever the gitpod workstation is like this:
axios.post('https://5000-march33s3-servistry-xpectls7szm.ws-us115.gitpod.io/api/registration/add' | after .io/ is where we call the api endpoint
*** We need to find a more permanent solution for this as well so that we don't need to continuously update links.
That will end up being way too much work when we start adding the other Web commands
