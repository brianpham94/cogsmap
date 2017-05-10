# Team K5’s Milestone 9

**Description of what each team member has done on the project**

Thomas Loh: Ironed out all the bugs in the Yelp API and figured out how to populate the map with markers as well as reconfiguring the map with new searches. Figured out how to determine whether a business has a high amount of foot traffic and colored markers accordingly. Currently figuring out coloring of areas for areas with high foot traffic.

Lauren Gong: Worked on figuring out how to cluster markers placed on the map after the user searches a key term (ex. Boba, coffee, burgers) using the leaflet.markerclustergroup plugin. Markers are clustered based on proximity to one another and will be revealed as users zoom in further into the map. 

Hyungyun Kim: I created “current location” button outside the map, so users can track/see current location. From retrieving datas from Yelp, I made a table outside the map, so users can see all the list that they search using a search bar.

Brian Pham: Fixed some bugs with the autocomplete functionality and assigned it to the correct search bar. Added map functionality to allow the map to move to the location that the user searches in the search bar. Pins will now be listed at the user-inputted location search first before current user location.

**Description of features**

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md9_screen01.JPG)

Now, our app has “Current Location”, so users can move the location and see the hot places around there.

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md9_screen02.JPG)

We have two different searching functionalities, The first one is keyword search that will return markers based on categories such as “Coffee”, “Starbucks”, “Sushi”. The second one will move the map to wherever users want to search (ex. regions/addresses such as La Jolla).

![alt text](https://github.com/withyuns/cogsmap/blob/master/images/md9_screen03.JPG)

We are using “Yelp” data, so our app shows all the places on the map and lists below. If you zoom out the map, you can see a number of places instead of seeing markers. Clicking on each marker reveals a popup that contains the name and rating of each business. 
