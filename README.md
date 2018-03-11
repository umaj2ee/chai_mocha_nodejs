nodejs_mongodb_chai_mocha
installing mongodb:

1.Visit MongoDB official website and download the .tgz file from the community section of the website.

$ cd ~/Download
$ tar -zxvf mongodb-osx-ssl-x86_64-3.6.1.tgz
$ sudo mv mongodb-osx-ssl-x86_64-3.6.1 /usr/local/mongodb

2.MongoDB stores the data into the /data/db directory by default, so we need to create this directory and also assign proper permission using chown command.

$ sudo mkdir -p /data/db
$ whoami
codebind
$ sudo chown codebind /data/db

3.set the envirent variable for MongoDb. we need to add the mongodb/bin path to the ~/.bash_profile file.


$ cd
$ pwd
/Users/codebind
if .bash_profile is not present follow the step 
to create it otherwise skip the step below.
$ touch .bash_profile
$ open .bash_profile

4. .bash_profile file will open in a text editor. In this file add the following exports
export MONGO_PATH=/usr/local/mongodb
export PATH=$PATH:$MONGO_PATH/bin
Now restart your terminal and verify the mongodb version by following commands
$ mongo -version

5.Start Mongodb
start Mongo Demon 
$ mongod
in another terminal run the following commands
$ mongo
MongoDB shell version: 3.6.1
connecting to: test
> show dbs
local	(empty)
admin	(empty)


In Webstrome add Mongo Plugin.
and create the translation collection piratedb in Mongodb usingn mongoimport command.

mongoimport -d piratedb -c piratetranslations --type csv --file priate_translate.csv --headerline
to find an element in the collection use 
switch to the db
use piratedb
db.piratetranslations.find({phrase:"hello"})


