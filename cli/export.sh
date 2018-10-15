echo "Enter HostName:"
read host
echo "Enter DB Name:"
read dbname
echo "Enter Auth DB Name: (usually admin)"
read authdb
echo "Enter Username:"
read username
echo "Enter Password"
read password

echo "Credentials: Host: $host, DB:$dbname, AuthDB:$authdb, Username:$username, Password:$password"

while true; do
   echo "Enter Collection to export: "
   read collection
   echo "Exporting Collection: $collection"
   echo "Command: mongoexport --db $dbname --collection $collection --host $host --authenticationDatabase $authdb --username $username --password $password --out $collection"
   mongoexport --db $dbname --collection $collection --host $host --authenticationDatabase $authdb --username $username --password $password --out $collection.json
   echo "Export Done, Check $collection.json"
   echo "Export Another Collection? [y/n] :"
   read response
   if [ "$response" != "y" ]
   then
      break
   fi
done